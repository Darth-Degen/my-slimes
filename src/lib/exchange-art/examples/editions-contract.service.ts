//@ts-nocheck

/*
 * angular exchange art example
 * DONT USE CODE
 */ 

import { Inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import {
  AccountMeta,
  AddressLookupTableAccount,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  SYSVAR_INSTRUCTIONS_PUBKEY,
  TransactionInstruction,
  TransactionMessage,
  VersionedTransaction,
} from '@solana/web3.js';
import { WalletService } from '../wallet.service';
import {
  createAssociatedTokenAccountInstruction,
  createInitializeMintInstruction,
  createMintToInstruction,
  getAssociatedTokenAddress,
  MINT_SIZE,
} from '@solana/spl-token';
import { FindNftByMintOutput, Metaplex, Nft, NftOriginalEdition, toBigNumber } from '@metaplex-foundation/js';
import { WalletStore } from '@heavy-duty/wallet-adapter';
import { UiNotificationsService } from '@shared/ui/core';
import { EditionsProgramClientService, WalletAdapterService, WalletChecksService } from '@marketplace/core';
import { COMMITMENT, CONNECTION_RPC_ENV } from '@shared/entities';
import { EditionSaleContract } from '../types/contract.interfaces';
import { COIN_TYPES, ConnectionRpcEnvType } from '../types/interfaces';
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
} from '../utils';

@Injectable({
  providedIn: 'root',
})
export class EditionsContractService {
  constructor(
    private uinService: UiNotificationsService,
    private walletService: WalletService,
    private walletChecksService: WalletChecksService, //1.
    private walletAdapterService: WalletAdapterService, //2.
    private editionsProgramClientService: EditionsProgramClientService,//3.
    private walletStore: WalletStore,
    @Inject(CONNECTION_RPC_ENV) private connectionRpcEnv: ConnectionRpcEnvType,
  ) {}

  async buyFixedPriceEdition(editionSaleContract: EditionSaleContract): Promise<string> {
    try {
      //1. get connection and wallet
      const connection = await this.walletAdapterService.getConnection();
      const connectedWalletPubKey = await this.walletAdapterService.getConnectedWalletPubKey();
      //2. set master edition mintkey, price, and currency
      const masterEditionMintKey = new PublicKey(editionSaleContract.keys.mintKey);
      const price = editionSaleContract.data.price;
      const currency = editionSaleContract.data.currency || COIN_TYPES.SOL;
      //3. check if wall is connected and has enough funds
      const feeInLamports = 0.011 * LAMPORTS_PER_SOL;
      await this.walletChecksService.checkIfWalletIsConnected();
      await this.walletChecksService.checkIfWalletHasEnoughFunds({
        additionalFeeInLamports: feeInLamports,
        [currency]: price,
      });
      // *** create program client 
      const editionsProgramClient = this.editionsProgramClientService.getClient(connection);
      //4. ~ determine if wallet minting cap is exceeded
      let walletMintingStatePDA: PublicKey | null = null;
      const walletMintingCap = editionSaleContract.data.walletMintingCap!;
      const WALLET_MINT_CAP_ERROR_MESSAGE = `You can only mint ${walletMintingCap} editions per wallet.`;
      walletMintingStatePDA = getWalletMintingStatePDA(connectedWalletPubKey, masterEditionMintKey);
      try {
        const walletMintingStateAccount = await editionsProgramClient.account['walletMintingState'].fetch(
          walletMintingStatePDA,
        );

        // @ts-ignore
        if (walletMintingStateAccount['numMinted'] >= walletMintingCap) {
          throw new Error(WALLET_MINT_CAP_ERROR_MESSAGE);
        }
      } catch (error) {
        if ((error as any)?.message?.includes(WALLET_MINT_CAP_ERROR_MESSAGE)) {
          throw error;
        }
      }
      //5. create royaltyProtection boolean instruction variables 
      const isRoyaltyProtected = editionSaleContract.data.royaltyProtection;
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
        fromPubkey: connectedWalletPubKey,
        newAccountPubkey: editionMintKey.publicKey,
        lamports: await this.walletService.getExemptionRent(connection as Connection, MINT_SIZE),
        space: MINT_SIZE,
        programId: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'),
      });

      const createInitializeMintIx = createInitializeMintInstruction(
        editionMintKey.publicKey,
        0,
        connectedWalletPubKey,
        connectedWalletPubKey,
      );

      const createAssociatedTokenAccountIx = createAssociatedTokenAccountInstruction(
        connectedWalletPubKey,
        newEditionDepositTokenAccount,
        newEditionDepositAuthority,
        editionMintKey.publicKey,
      );

      const createMintToInstructionIx = createMintToInstruction(
        editionMintKey.publicKey,
        newEditionDepositTokenAccount,
        connectedWalletPubKey,
        1,
      );

      instructions.push(
        createEditionMintIx,
        createInitializeMintIx,
        createAssociatedTokenAccountIx,
        createMintToInstructionIx,
      );
      //8. fetch nft data from metaplex and create variables needed for mint
      const metaplex = new Metaplex(connection!);
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
      // 'mainnet' | 'devnet'
      const settlementMintPubKey = getSettlementMint(currency, this.connectionRpcEnv);
      const connectWalletTokenAccountForSettlementMintPubKey = await getAssociatedTokenAddress(
        settlementMintPubKey,
        connectedWalletPubKey,
      );

      const buyerNewEditionDepositAccount = await getAssociatedTokenAddress(
        editionMintKey.publicKey,
        connectedWalletPubKey,
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

      const creatorsPubKeys = await getCreatorsPubKeysForNft(connection, masterEditionMintKey);
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
      const whitelistingState = getWhitelistingStatePDA(connectedWalletPubKey, saleStateAccount);

      const mintFixedPriceEditionIx = await editionsProgramClient.methods['mintFixedPriceEdition']({
        price: toBigNumber(price),
        royaltyProtected: isRoyaltyProtected,
        splTokenSettlement: currency !== COIN_TYPES.SOL,
      })
        .accounts({
          buyer: connectedWalletPubKey,
          payer: connectedWalletPubKey,
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
        fromPubkey: connectedWalletPubKey,
        toPubkey: new PublicKey('CaDAUgEtYu5v28B6jp2RUp5kDQdiCZrdEcQN77nCxECV'),
        lamports: feeInLamports,
      });
      instructions.push(exchangeFeeMintingIx, mintFixedPriceEditionIx);

      const lookupTableAccount = await connection
        .getAddressLookupTable(new PublicKey(editionSaleContract.keys.addressLookupTable))
        .then((res) => res.value);

      const mintingTxSignature = await this.finaliseVersionTx(
        connection,
        connectedWalletPubKey,
        instructions,
        [editionMintKey],
        [lookupTableAccount!],
      );

      let parsedTx;
      try {
        parsedTx = await connection.getParsedTransaction(mintingTxSignature!, {
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
        this.uinService.showError({ message: parsedErrorMessage });
        throw new Error(parsedErrorMessage);
      }

      return editionMintKey.publicKey.toString();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

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

    const transactionSignature = await firstValueFrom(
      this.walletStore.sendTransaction(transactionV0 as any, connection, { skipPreflight: true }),
    );
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
      this.uinService.showError({
        message: 'Could not confirm transaction. Please try again.',
        title: `Transaction failed`,
      });
      throw new Error('Could not confirm transaction. Please try again.');
    }

    if (status?.err) {
      const errors = await this.getErrorForTransaction(connection, transactionSignature);
      this.uinService.showError({ message: errors.join(','), title: `Transaction failed` });

      throw new Error(`Raw transaction ${transactionSignature} failed (${JSON.stringify(status)})`);
    }

    console.log('versioned transactionSignature>>', transactionSignature);
    return transactionSignature;
  }
}
