
import { Connection, PublicKey } from '@solana/web3.js';
import { getAssociatedTokenAddress, NATIVE_MINT } from '@solana/spl-token';
import { COIN_TYPES, ConnectionRpcEnvType } from './types/interfaces';
import { FindNftByMintOutput, Metaplex } from '@metaplex-foundation/js';

export const CARDINAL_TOKEN_MANAGER_ADDRESS = new PublicKey('mgr99QFMYByTqGPWmNqunV7vBLmWWXdSrHUfV8Jf3JM');
export const EDITIONS_PROGRAM_ID = new PublicKey('EXBuYPNgBUXMTsjCbezENRUtFQzjUNZxvPGTd11Pznk5');

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const getWalletMintingStatePDA = (buyer: PublicKey, masterEditionMintKey: PublicKey): PublicKey => {
  return PublicKey.findProgramAddressSync(
    [Buffer.from('exchgeditions'), buyer.toBuffer(), masterEditionMintKey.toBuffer(), EDITIONS_PROGRAM_ID.toBuffer()],
    EDITIONS_PROGRAM_ID,
  )[0];
};

export const getExchangeDepositAuthority = (mintKey: PublicKey): { authority: PublicKey; bump: number } => {
  const result = PublicKey.findProgramAddressSync(
    [Buffer.from('exchg-mint-deposit'), mintKey.toBuffer(), EDITIONS_PROGRAM_ID.toBuffer()],
    EDITIONS_PROGRAM_ID,
  );

  return {
    authority: result[0],
    bump: result[1],
  };
};

export function getEditionMarkPda(mint: PublicKey, edition: number): PublicKey {
  const editionNumber = Math.floor(edition / 248);
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from('metadata'),
      new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s').toBuffer(),
      mint.toBuffer(),
      Buffer.from('edition'),
      Buffer.from(editionNumber.toString()),
    ],
    new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'),
  )[0];
}

export function getEditionPDA(mint: PublicKey): PublicKey {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from('metadata'),
      new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s').toBuffer(),
      mint.toBuffer(),
      Buffer.from('edition'),
    ],
    new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'),
  )[0];
}

export function getExchgEditionsDepositAuthorityPda(tokenMint: PublicKey): PublicKey {
  return PublicKey.findProgramAddressSync(
    [Buffer.from('exchgeditions'), tokenMint.toBuffer(), EDITIONS_PROGRAM_ID.toBuffer()],
    EDITIONS_PROGRAM_ID,
  )[0];
}

export async function getTokenMetadataAccount(tokenMint: PublicKey): Promise<PublicKey> {
  return (
    await PublicKey.findProgramAddress(
      [
        Buffer.from('metadata'),
        new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s').toBuffer(),
        tokenMint.toBuffer(),
      ],
      new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'),
    )
  )[0];
}

export const getSettlementMint = (currency: COIN_TYPES, connectionRpcEnv: ConnectionRpcEnvType): PublicKey => {
  switch (currency) {
    case COIN_TYPES.BONK:
      return new PublicKey('DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263');
    case COIN_TYPES.USDC:
      return connectionRpcEnv === 'devnet'
        ? new PublicKey('4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU')
        : new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v');
    default:
      return NATIVE_MINT;
  }
};

export const getRoyaltyProtectionMarkerPDA = (mintKey: PublicKey): PublicKey => {
  return PublicKey.findProgramAddressSync(
    [Buffer.from('royalty-protection-marker'), mintKey.toBuffer(), EDITIONS_PROGRAM_ID.toBuffer()],
    EDITIONS_PROGRAM_ID,
  )[0];
};

export const getCardinalTokenManagerPDA = (mint: PublicKey): PublicKey => {
  return PublicKey.findProgramAddressSync(
    [Buffer.from('token-manager'), mint.toBuffer()],
    CARDINAL_TOKEN_MANAGER_ADDRESS,
  )[0];
};

export const getCardinalMintCounterPDA = (mint: PublicKey): PublicKey => {
  return PublicKey.findProgramAddressSync(
    [Buffer.from('mint-counter'), mint.toBuffer()],
    CARDINAL_TOKEN_MANAGER_ADDRESS,
  )[0];
};

export const getCreatorsPubKeysForNft = async (
  connection: Connection,
  nftMintKeyAsPublicKey: PublicKey,
): Promise<PublicKey[]> => {
  const metaplex = new Metaplex(connection!);
  let nft: FindNftByMintOutput | null;
  try {
    nft = await metaplex.nfts().findByMint({ mintAddress: nftMintKeyAsPublicKey });
  } catch (error) {
    console.log(error);
    throw error;
    return [];
  }

  return (nft?.creators || []).map((creator) => creator.address);
};

export const getCreatorsTokenAccountsForSettlementMints = async (
  creatorPubKeys: PublicKey[],
  settlementMint: PublicKey,
): Promise<PublicKey[]> => {
  return await Promise.all(
    creatorPubKeys.map((creatorPubKey) => getAssociatedTokenAddress(settlementMint, creatorPubKey, true)),
  );
};

export const getWhitelistingStatePDA = (buyer: PublicKey, saleStateAccount: PublicKey): PublicKey => {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from('edition_whitelisting'),
      buyer.toBuffer(),
      saleStateAccount.toBuffer(),
      EDITIONS_PROGRAM_ID.toBuffer(),
    ],
    EDITIONS_PROGRAM_ID,
  )[0];
};
