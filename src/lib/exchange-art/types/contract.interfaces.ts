import { COIN_TYPES } from './interfaces';

export enum EditionSaleContractPricingType {
  Fixed = 'Fixed',
  PercentageIncrement = 'PercentageIncrement',
  FixedIncrement = 'FixedIncrement',
}

export type EditionSaleContract = {
  data: {
    blockTime: number;
    start: number;
    price: number;
    pricingType: EditionSaleContractPricingType;
    currency: COIN_TYPES;
    increment: number;
    saleType: string;
    editionsMintedSoFar: number;
    walletMintingCap?: number;
    version?: number;
    preSaleWindow?: number;
    royaltyProtection?: boolean;
  };
  keys: {
    initializer: string;
    mintKey: string;
    depositAccount: string;
    saleAccount: string;
    addressLookupTable: string;
  };
  type?: string;
  whitelisted?: string[];
};
