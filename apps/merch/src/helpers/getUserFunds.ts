import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

type ReturnedFundsBalances = {
  usdc: number;
  sol: number;
}

const USDC_MINT_MAINNET = new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v");

export const getUserFunds = async (
  connection: Connection,
  publicKey: PublicKey | null
): Promise<ReturnedFundsBalances | string | undefined> => {
  if (!publicKey) return;

  try { 
    const funds: ReturnedFundsBalances = {
      usdc: 0,
      sol: 0
    };

    // Get USDC balance
    // const usdcAccountAddress = await getAssociatedTokenAddressSync(USDC_MINT_MAINNET, publicKey);
    // let usdcAccountData = await getAccount(connection, usdcAccountAddress, "confirmed");
    // funds.usdc = Number(usdcAccountData.amount) / (10 ** 6); // 6 decimals
    // console.log('funds.usdc: ', funds.usdc);

    // Get SOL balance
    const solAccountBalance = await connection.getBalance(publicKey);
    funds.sol = Number(solAccountBalance) / LAMPORTS_PER_SOL;
    console.log('funds.sol: ', funds.sol);

    return funds;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unable to load tokens"
    console.error("getUserFunds ", message);
    return message;
  }
};  