import * as anchor from "@coral-xyz/anchor";
import { EditionsProgram } from "./idl/editions_program_solana";
import { EditionSaleContract } from './types/contract.interfaces';
import { COIN_TYPES } from './types/interfaces';
import { WalletStore } from '@heavy-duty/wallet-adapter';
import {
  FindNftByMintOutput,
  Metaplex,
  Nft,
  NftOriginalEdition,
  toBigNumber
} from '@metaplex-foundation/js';
import {
  AccountMeta,
  AddressLookupTableAccount,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  SYSVAR_INSTRUCTIONS_PUBKEY,
  Transaction,
  TransactionInstruction,
  TransactionMessage,
  TransactionSignature,
  VersionedTransaction,
} from '@solana/web3.js';
import {
  CARDINAL_TOKEN_MANAGER_ADDRESS,
  getCardinalMintCounterPDA,
  getCardinalTokenManagerPDA,
  getCreatorsPubKeysForNft,
  getCreatorsTokenAccountsForSettlementMints,
  getEditionMarkPda,
  getEditionPDA,
  getExchangeDepositAuthority,
  getExchgEditionsDepositAuthorityPda,
  getRoyaltyProtectionMarkerPDA,
  getSettlementMint,
  getTokenMetadataAccount,
  getWalletMintingStatePDA,
  getWhitelistingStatePDA,
} from './utils';
import {
  createAssociatedTokenAccountInstruction,
  createInitializeMintInstruction,
  createMintToInstruction,
  getAssociatedTokenAddress,
  MINT_SIZE,
} from '@solana/spl-token';
import { WalletContextState } from "@solana/wallet-adapter-react";

const COMMITMENT = "finalized";
const CONNECTION_ENV = "devnet"; // 'mainnet' | 'devnet'

type SolanaWallet = WalletContextState & {
  publicKey: PublicKey;
  signTransaction(tx: Transaction): Promise<Transaction>;
  signAllTransactions(txs: Transaction[]): Promise<Transaction[]>;
};

type BuyFixedPriceEditionResult = {
  instructions: Array<TransactionInstruction>;
  editionMintKeys: Array<any>;
  editionMintKey: Keypair;
};

/*
  How to use this lib?
  
  1. Instantiate a new version of the class
  
  ```js
  const editionProgram = new EditionsContractService(
    wallet as any,
    connection,
    editionProgramIdlJSON as anchor.Idl,
    EDITION_PROGRAM_ID
  );
  ```


  2. Enjoy

  ```js 
  const editionMintKey = await editionProgram.buyFixedPriceEdition(
    editionSaleContract
  );
  ```
*/

export class EditionsContractService {
  wallet: WalletContextState;
  connection: Connection;
  provider!: anchor.Provider;
  editionsProgram!: anchor.Program<EditionsProgram>;

  constructor(
    wallet: WalletContextState,
    connection: Connection,
    idl?: anchor.Idl,
    programId?: PublicKey
  ) {
    this.wallet = wallet;
    this.connection = connection;
    this.setProvider();
    this.setEditionsProgram(idl, programId);
  }

  setProvider() {
    this.provider = new anchor.AnchorProvider(
      this.connection,
      this.wallet as SolanaWallet,
      anchor.AnchorProvider.defaultOptions()
    );
    anchor.setProvider(this.provider);
  }

  setEditionsProgram(idl?: anchor.Idl, programId?: PublicKey) {
    if (idl && programId) {
      // Prod
      this.editionsProgram = new anchor.Program<EditionsProgram>(
        idl as any,
        programId,
        this.provider
      );
    } else {
      // Tests
      // this.editionsProgram = anchor.workspace.EditionsProgram as anchor.Program<EditionsProgram>;
    }
  }

  async buyMultipleEditions(
    editionSaleContract: EditionSaleContract,
    amountToMint?: number
  ): Promise<Keypair[]> {

    const lookupTableAccount = await this.connection
      .getAddressLookupTable(new PublicKey(editionSaleContract.keys.addressLookupTable))
      .then((res) => res.value);

    const editionMints = await Promise.all([...Array(amountToMint)].map(async () =>
      await this.buyFixedPriceEdition(editionSaleContract)
    ));

    // Prepare versionedtx
    const editionMintsInstructions = await Promise.all(editionMints.map(async (editionMint) =>
      await this.prepareVersionTx(
        this.connection,
        this.wallet.publicKey!,
        editionMint.instructions,
        editionMint.editionMintKeys,
        [lookupTableAccount!]
      )
    ));

    // Sign All
    const signedTransactionsv0 = await this.signAllVersionTx(editionMintsInstructions);

    // Send Versioned Treansactions to network
    const mintingTxSignatures: TransactionSignature[] = [];
    await signedTransactionsv0.reduce(async (previous, current) => {
      await previous;
      const mintingTxSignature = await this.sendSignedTransactions(current);
      mintingTxSignatures.push(mintingTxSignature);
    }, Promise.resolve());

    // Verify all transactions
    await mintingTxSignatures.reduce(async (prev, curr) => {
      await prev;
      await this.verifyTransaction(curr);
    }, Promise.resolve());

    // TODO use toast
    // toast('All done 🎉');

    return editionMints.map(edition => edition.editionMintKey);
  }

  async prepareVersionTx(
    connection: Connection,
    payerKey: PublicKey,
    instructions: TransactionInstruction[],
    additionalSigners: Keypair[] = [],
    lookupTableAccounts: AddressLookupTableAccount[] = [],
  ): Promise<VersionedTransaction> {
    const versionedTransactionBlockhash = await connection.getLatestBlockhash();
    const messageV0 = new TransactionMessage({
      payerKey,
      recentBlockhash: versionedTransactionBlockhash.blockhash,
      instructions,
    }).compileToV0Message(lookupTableAccounts);

    const transactionV0 = new VersionedTransaction(messageV0);
    if (additionalSigners.length > 0) {
      transactionV0.sign(additionalSigners);
    }

    return transactionV0;
  }

  async signAllVersionTx(transactionsV0: VersionedTransaction[]): Promise<VersionedTransaction[]> {
    if (!this.wallet.signAllTransactions) {
      throw new Error('Cannot sign tx')
    }
    const signedTransactionsv0 = await this.wallet.signAllTransactions(transactionsV0);

    return signedTransactionsv0;
  }

  async sendSignedTransactions(signedTransactionv0: VersionedTransaction) {
    const transactionSignature = await this.connection.sendRawTransaction(
      signedTransactionv0.serialize(),
      { maxRetries: 5 }
    );

    console.log('finaliseVersionTx --> transactionSignature>>', transactionSignature);

    let status;
    const latestBlockHash = await this.connection.getLatestBlockhash();
    try {
      status = (
        await this.connection.confirmTransaction(
          {
            signature: transactionSignature,
            blockhash: latestBlockHash.blockhash,
            lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
          },
          COMMITMENT,
        )
      ).value;
    } catch (error) {

      // TODO use toast service
      // -----
      // this.uinService.showError({
      //   message: 'Could not confirm transaction. Please try again.',
      //   title: `Transaction failed`,
      // });

      throw new Error('Could not confirm transaction. Please try again.');
    }

    if (status?.err) {

      // TODO toast
      // ------
      // const errors = await this.getErrorForTransaction(connection, transactionSignature);
      // this.uinService.showError({ message: errors.join(','), title: `Transaction failed` });

      throw new Error(`Raw transaction ${transactionSignature} failed (${JSON.stringify(status)})`);
    }

    console.log('versioned transactionSignature >> ', transactionSignature);
    return transactionSignature;
  }

  async verifyTransaction(transactionsSignatures: string) {
    let parsedTx;
    try {
      parsedTx = await this.connection.getParsedTransaction(transactionsSignatures!, {
        maxSupportedTransactionVersion: 0,
      });
    } catch (error) {
      throw new Error('Could not retrieve transaction details. Please check your wallet activity.');
    }

    const logMessages = parsedTx?.meta?.logMessages || [];
    const botTrafficMessage = logMessages.find((message: string | string[]) =>
      message.includes('bot traffic is taxed'),
    );

    if (botTrafficMessage) {
      const errorMessage = botTrafficMessage.split(',')?.[0] || '';
      const parsedErrorMessage = `Suspicious activity recorded. ${errorMessage.replace('Program log:', '').trim()}.`;

      // TODO replace with toast service
      // -----
      // this.uinService.showError({ message: parsedErrorMessage });

      throw new Error(parsedErrorMessage);
    }
  }

  async buyFixedPriceEdition(editionSaleContract: EditionSaleContract): Promise<BuyFixedPriceEditionResult> {
    try {
      if (!this.wallet.publicKey) {
        throw new Error('Cannot identify wallet.');
      }
      //1. get connection and wallet
      // No.

      //2. set master edition mintkey, price, and currency
      const masterEditionMintKey = new PublicKey(editionSaleContract.keys.mintKey);
      const price = editionSaleContract.data.price;
      const currency = editionSaleContract.data.currency || COIN_TYPES.SOL;

      //3. check if wallet is connected and has enough funds
      const feeInLamports = 0.011 * LAMPORTS_PER_SOL;

      // TODO check if wallet has enough funds
      // ------
      // await this.walletChecksService.checkIfWalletIsConnected();
      // await this.walletChecksService.checkIfWalletHasEnoughFunds({
      //   additionalFeeInLamports: feeInLamports,
      //   [currency]: price,
      // });

      // *** create program client 
      const editionsProgramClient = this.editionsProgram;

      //4. ~ determine if wallet minting cap is exceeded
      let walletMintingStatePDA: PublicKey | null = null;
      const walletMintingCap = editionSaleContract.data.walletMintingCap!;
      const WALLET_MINT_CAP_ERROR_MESSAGE = `You can only mint ${walletMintingCap} editions per wallet.`;
      walletMintingStatePDA = getWalletMintingStatePDA(this.wallet.publicKey, masterEditionMintKey);
      try {
        const walletMintingStateAccount = await editionsProgramClient.account['WalletMintingState'].fetch(
          walletMintingStatePDA,
        );

        if (walletMintingStateAccount['numMinted'] >= walletMintingCap) {
          throw new Error(WALLET_MINT_CAP_ERROR_MESSAGE);
        }
      } catch (error) {
        if ((error as any)?.message?.includes(WALLET_MINT_CAP_ERROR_MESSAGE)) {
          throw error;
        }
      }

      //5. create royaltyProtection boolean instruction variables 
      const isRoyaltyProtected = editionSaleContract.data.royaltyProtection || false;

      //6. get address of the associated token account for the mint and owner
      const editionMintKey = Keypair.generate();

      const { authority: newEditionDepositAuthority } = getExchangeDepositAuthority(editionMintKey.publicKey);

      const newEditionDepositTokenAccount = await getAssociatedTokenAddress(
        editionMintKey.publicKey,
        newEditionDepositAuthority,
        true,
      );

      //7. create instruction variables 
      const instructions = [];

      const createEditionMintIx = SystemProgram.createAccount({
        fromPubkey: this.wallet.publicKey,
        newAccountPubkey: editionMintKey.publicKey,
        lamports: await this.connection.getMinimumBalanceForRentExemption(MINT_SIZE),
        space: MINT_SIZE,
        programId: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'),
      });

      const createInitializeMintIx = createInitializeMintInstruction(
        editionMintKey.publicKey,
        0,
        this.wallet.publicKey,
        this.wallet.publicKey,
      );

      const createAssociatedTokenAccountIx = createAssociatedTokenAccountInstruction(
        this.wallet.publicKey,
        newEditionDepositTokenAccount,
        newEditionDepositAuthority,
        editionMintKey.publicKey,
      );

      const createMintToInstructionIx = createMintToInstruction(
        editionMintKey.publicKey,
        newEditionDepositTokenAccount,
        this.wallet.publicKey,
        1,
      );

      instructions.push(
        createEditionMintIx,
        createInitializeMintIx,
        createAssociatedTokenAccountIx,
        createMintToInstructionIx,
      );

      //8. fetch nft data from metaplex and create variables needed for mint
      const metaplex = new Metaplex(this.connection!);
      let nft: FindNftByMintOutput | null;
      try {
        nft = await metaplex.nfts().findByMint({ mintAddress: masterEditionMintKey });
      } catch (error) {
        console.log(error);
        throw error;
      }

      const editionNumber = Number(((nft as Nft).edition as NftOriginalEdition)!.supply!.toString()) + 1;
      const editionMarkPda = getEditionMarkPda(masterEditionMintKey, editionNumber);
      const exchgMasterEditionDepositAuthority = getExchgEditionsDepositAuthorityPda(masterEditionMintKey);

      const masterEditionPda = getEditionPDA(masterEditionMintKey);
      const masterMetadataPda = await getTokenMetadataAccount(masterEditionMintKey);

      //9. creating variables continued 
      const settlementMintPubKey = getSettlementMint(currency, CONNECTION_ENV); // 'mainnet' | 'devnet'
      const connectWalletTokenAccountForSettlementMintPubKey = await getAssociatedTokenAddress(
        settlementMintPubKey,
        this.wallet.publicKey,
      );

      const buyerNewEditionDepositAccount = await getAssociatedTokenAddress(
        editionMintKey.publicKey,
        this.wallet.publicKey,
      );
      const seller = new PublicKey(editionSaleContract.keys.initializer);

      const exchangeFeeRecipientSettlementMintReceiveAccount = await getAssociatedTokenAddress(
        settlementMintPubKey,
        new PublicKey('6482e33zrerYfhKAjPR2ncMSrH2tbTy5LDjdhB5PXzxd'),
      );

      const newEditionPda = getEditionPDA(editionMintKey.publicKey);
      const newEditionMetadataPda = await getTokenMetadataAccount(editionMintKey.publicKey);
      const newEditionRoyaltyProtectionMarker = getRoyaltyProtectionMarkerPDA(editionMintKey.publicKey);

      const cardinalManager = getCardinalTokenManagerPDA(editionMintKey.publicKey);
      const cardinalMintCounter = getCardinalMintCounterPDA(editionMintKey.publicKey);

      const cardinalManagerTokenAccount = await getAssociatedTokenAddress(
        editionMintKey.publicKey,
        cardinalManager,
        true,
      );

      const creatorsPubKeys = await getCreatorsPubKeysForNft(this.connection, masterEditionMintKey);
      const creatorsSettlementPubKeys = await getCreatorsTokenAccountsForSettlementMints(
        creatorsPubKeys,
        settlementMintPubKey,
      );
      const remainingAccounts: AccountMeta[] = [];
      creatorsPubKeys.forEach((creatorPubKey, index) => {
        remainingAccounts.push({ pubkey: creatorPubKey, isSigner: false, isWritable: true });

        if (currency !== COIN_TYPES.SOL) {
          remainingAccounts.push({ pubkey: creatorsSettlementPubKeys[index], isSigner: false, isWritable: true });
        }
      });

      const saleStateAccount = new PublicKey(editionSaleContract.keys.saleAccount);
      const whitelistingState = getWhitelistingStatePDA(this.wallet.publicKey, saleStateAccount);

      const mintFixedPriceEditionIx = await editionsProgramClient.methods['mintFixedPriceEdition']({
        price: toBigNumber(price),
        royaltyProtected: isRoyaltyProtected,
        splTokenSettlement: currency !== COIN_TYPES.SOL,
      })
        .accounts({
          buyer: this.wallet.publicKey,
          payer: this.wallet.publicKey,
          payerSettlementMintPaymentAccount: connectWalletTokenAccountForSettlementMintPubKey,
          buyerNewEditionDepositAccount,
          seller,
          exchangeFeeRecipient: new PublicKey('6482e33zrerYfhKAjPR2ncMSrH2tbTy5LDjdhB5PXzxd'),
          exchangeFeeRecipientSettlementMintReceiveAccount,
          settlementMint: settlementMintPubKey,

          saleStateAccount,
          walletMintingState: walletMintingStatePDA,
          whitelistingState,

          masterMintKey: masterEditionMintKey,
          masterEditionPda,
          masterMetadataPda,
          exchgMasterEditionDepositAccount: new PublicKey(editionSaleContract.keys.depositAccount),
          exchgMasterEditionDepositAuthority,

          newEditionMintKey: editionMintKey.publicKey,
          newEditionPda,
          newEditionMetadataPda,
          exchgNewEditionDepositAccount: newEditionDepositTokenAccount,
          exchgNewEditionDepositAuthority: newEditionDepositAuthority,
          editionMarkPda,
          newEditionRoyaltyProtectionMarker,

          cardinalManager,
          cardinalMintCounter,
          cardinalManagerTokenAccount,

          cardinalTokenManagerProgram: CARDINAL_TOKEN_MANAGER_ADDRESS,
          tokenMetadataProgram: new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'),
          instructions: SYSVAR_INSTRUCTIONS_PUBKEY,
        })
        .remainingAccounts(remainingAccounts)
        .instruction();

      const exchangeFeeMintingIx = SystemProgram.transfer({
        fromPubkey: this.wallet.publicKey,
        toPubkey: new PublicKey('CaDAUgEtYu5v28B6jp2RUp5kDQdiCZrdEcQN77nCxECV'),
        lamports: feeInLamports,
      });
      instructions.push(exchangeFeeMintingIx, mintFixedPriceEditionIx);

      const lookupTableAccount = await this.connection
        .getAddressLookupTable(new PublicKey(editionSaleContract.keys.addressLookupTable))
        .then((res) => res.value);

      return {
        instructions,
        editionMintKeys: [editionMintKey],
        editionMintKey
      };

      // const mintingTxSignature = await this.finaliseVersionTx(
      //   this.connection,
      //   this.wallet.publicKey,
      //   instructions,
      //   [editionMintKey],
      //   [lookupTableAccount!],
      // );

    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Legacy, not used anymore
  async finaliseVersionTx(
    connection: Connection,
    payerKey: PublicKey,
    instructions: TransactionInstruction[],
    additionalSigners: Keypair[] = [],
    lookupTableAccounts: AddressLookupTableAccount[] = [],
  ): Promise<string> {
    const versionedTransactionBlockhash = await connection.getLatestBlockhash();
    const messageV0 = new TransactionMessage({
      payerKey,
      recentBlockhash: versionedTransactionBlockhash.blockhash,
      instructions,
    }).compileToV0Message(lookupTableAccounts);

    const transactionV0 = new VersionedTransaction(messageV0);
    if (additionalSigners.length > 0) {
      transactionV0.sign(additionalSigners);
    }

    if (!this.wallet.signTransaction) {
      throw new Error('Cannot sign tx')
    }
    const signedTransactionv0 = await this.wallet.signTransaction(transactionV0);

    // const txSize = signedTransactionv0.serialize().length + (signedTransactionv0.signatures.length * 64);
    // console.log('txSize: ', txSize);

    const transactionSignature = await connection.sendRawTransaction(signedTransactionv0.serialize(), { maxRetries: 5 });
    console.log('finaliseVersionTx --> transactionSignature>>', transactionSignature);

    let status;
    const latestBlockHash = await connection.getLatestBlockhash();
    try {
      status = (
        await connection.confirmTransaction(
          {
            signature: transactionSignature,
            blockhash: latestBlockHash.blockhash,
            lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
          },
          COMMITMENT,
        )
      ).value;
    } catch (error) {

      // TODO use toast service
      // -----
      // this.uinService.showError({
      //   message: 'Could not confirm transaction. Please try again.',
      //   title: `Transaction failed`,
      // });

      throw new Error('Could not confirm transaction. Please try again.');
    }

    if (status?.err) {

      // TODO toast
      // ------
      // const errors = await this.getErrorForTransaction(connection, transactionSignature);
      // this.uinService.showError({ message: errors.join(','), title: `Transaction failed` });

      throw new Error(`Raw transaction ${transactionSignature} failed (${JSON.stringify(status)})`);
    }

    console.log('versioned transactionSignature >> ', transactionSignature);
    return transactionSignature;
  }
}