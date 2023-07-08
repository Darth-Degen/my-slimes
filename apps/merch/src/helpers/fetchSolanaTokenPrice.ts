import axios from "axios";

interface CoinGeckoTokenPrice {
  solana: {
    usd: number;
  };
}

export const fetchSolanaTokenPrice = async():Promise<number> => {
  try {
    const response = await axios.get<CoinGeckoTokenPrice>(
      "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd"
    );
    
    const { usd } = response.data.solana;
    return usd;
  } catch (error) {
    console.error("Error fetching Solana token price:", error);
    throw error;
  }
}

// export const fetchSolanaTokenPrice = async():Promise<string> => {
//   try {
//     const response = await axios.get<{
//       data: { value: { info: { tokenAmount: { uiAmount: string } } } };
//     }>(
//       "https://api.solscan.io/account/So11111111111111111111111111111111111111112" // Replace with the Solana token address
//     );

//     const latestPrice =
//       response.data?.data?.value?.info?.tokenAmount?.uiAmount || "N/A";
//     console.log("Latest Solana token price:", latestPrice);
//     return latestPrice;
//   } catch (error) {
//     console.error("Error fetching Solana token price:", error);
//     return "N/A";
//   }
// }
