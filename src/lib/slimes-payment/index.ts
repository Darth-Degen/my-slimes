import { Metaplex, Nft, NftWithToken, Sft, SftWithToken, token, transferNftBuilder } from "@metaplex-foundation/js";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { Connection, LAMPORTS_PER_SOL, PublicKey, SystemProgram, TransactionInstruction, VersionedTransaction } from "@solana/web3.js";
import { prepareVersionTx, sendSignedTransactions, signAllVersionTx } from "./transactions";
import { createTransferInstruction, getOrCreateAssociatedTokenAccount } from "@solana/spl-token";

const GRAVEYARD_DOON_DOON = new PublicKey("CuhAmoz94KQBhVPeLH1topju9WEhW4RCzM8S1pcEx4S6");
const USDC_MINT_MAINNET = new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v");
const USDC_MINT_DEVNET = new PublicKey("3rczAdopemKxscq7sG9rk6UxgfHNh87Etekqi32ZYDo8");
const USDC_DECIMALS_MAINNET = 6;
const USDC_DECIMALS_DEVNET = 9;

export async function pay(
  connection: Connection,
  wallet: WalletContextState,
  nfts: (Sft | SftWithToken | Nft | NftWithToken)[],
  solAmount: number, /* Enter the "human readable" amount. Eg. 1.2 or 0.5 */
  usdcAmount: number /* Enter the "human readable" amount. Eg. 1.2 or 0.5 */
) {
  const metaplex = new Metaplex(connection);
  const transactions: VersionedTransaction[] = [];
  const isDevnet = connection.rpcEndpoint.startsWith("https://devnet.");

  const USDC_DECIMALS = isDevnet ? USDC_DECIMALS_DEVNET : USDC_DECIMALS_MAINNET;

  // 1. Build tx to send NFTs
  if (nfts.length) {
    for await (let nft of nfts) {
      const transferInstruction = transferNftBuilder(metaplex, {
        nftOrSft: nft,
        // @ts-ignore
        authority: wallet,
        fromOwner: wallet.publicKey!,
        toOwner: GRAVEYARD_DOON_DOON,
        amount: token(1),
      }, {
        // @ts-ignore
        payer: wallet
      });
      const nftTransferTx = await prepareVersionTx(
        connection,
        wallet.publicKey!,
        transferInstruction.getInstructions()
      );
      transactions.push(nftTransferTx);
    };
  }

  // 2. Add sol payment
  if (solAmount) {
    var solTransferTx: TransactionInstruction = SystemProgram.transfer({
      fromPubkey: wallet.publicKey!,
      toPubkey: GRAVEYARD_DOON_DOON,
      lamports: solAmount * LAMPORTS_PER_SOL,
    });

    transactions.push(await prepareVersionTx(connection, wallet.publicKey!, [solTransferTx]));
  }

  // 3. Add USDC payment
  if (usdcAmount) {
    const fromUSDCTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      // @ts-ignore
      wallet,
      isDevnet ? USDC_MINT_DEVNET : USDC_MINT_MAINNET,
      wallet.publicKey
    );
    const toUSDCTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      // @ts-ignore
      wallet,
      isDevnet ? USDC_MINT_DEVNET : USDC_MINT_MAINNET,
      wallet.publicKey
    );

    const USDCTransferTx = await createTransferInstruction(
      fromUSDCTokenAccount.address,
      toUSDCTokenAccount.address,
      wallet.publicKey!,
      Math.floor(usdcAmount * (10 ** USDC_DECIMALS))
    );

    transactions.push(await prepareVersionTx(connection, wallet.publicKey!, [USDCTransferTx]));
  }

  // 4. Sign all
  const signedTransactions = await signAllVersionTx(transactions, wallet);

  // 5. Send and confirm all
  await Promise.all(signedTransactions.map((tx, index) => sendSignedTransactions(
    tx,
    index,
    connection
  )));
}