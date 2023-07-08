import { WalletContextState } from "@solana/wallet-adapter-react";
import { AddressLookupTableAccount, Connection, Keypair, PublicKey, TransactionInstruction, TransactionMessage, VersionedTransaction } from "@solana/web3.js";
import { toast } from "react-hot-toast";

export async function prepareVersionTx(
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

export async function signAllVersionTx(
  transactionsV0: VersionedTransaction[],
  wallet: WalletContextState
): Promise<VersionedTransaction[]> {
  if (!wallet.signAllTransactions) {
    throw new Error('Cannot sign tx')
  }
  const signedTransactionsv0 = await wallet.signAllTransactions(transactionsV0);

  return signedTransactionsv0;
}

export async function sendSignedTransactions(
  signedTransactionv0: VersionedTransaction,
  transactionNumber: number,
  connection: Connection
): Promise<string> {

  // TODO @darth need to update the toasts text 🤝 (this wont impact the rest of the app)
  // const toastId = toast.loading(`Rack #${transactionNumber + 1}  minting...`);

  const transactionSignature = await connection.sendRawTransaction(
    signedTransactionv0.serialize(),
    { maxRetries: 5 }
  );

  // console.log('finaliseVersionTx --> transactionSignature>>', transactionSignature);

  let status;
  try {
    const latestBlockHash = await connection.getLatestBlockhash();

    status = (
      await connection.confirmTransaction(
        {
          signature: transactionSignature,
          blockhash: latestBlockHash.blockhash,
          lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
        },
        "confirmed",
      )
    ).value;
  } catch (error) {
    // -----
    // this.uinService.showError({
    //   message: 'Could not confirm transaction. Please try again.',
    //   title: `Transaction failed`,
    // });

    // toast.error(`Rack #${transactionNumber + 1} failed.`, { id: toastId })
    console.error(` failed.`);
  }

  if (status?.err) {
    // const errors = await this.getErrorForTransaction(connection, transactionSignature);
    // this.uinService.showError({ message: errors.join(','), title: `Transaction failed` });

    // throw new Error(`Raw transaction ${transactionSignature} failed (${JSON.stringify(status)})`);
    // toast.error(`Rack #${transactionNumber + 1} failed.`, { id: toastId })
    console.error(`failed.`);
  }

  // console.log('versioned transactionSignature >> ', transactionSignature);
  // toast.success(`Rack #${transactionNumber + 1} success.`, { id: toastId })
  console.log(`success.`);
  return transactionSignature;
}