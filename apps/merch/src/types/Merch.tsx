export interface QuantitiesBySize {
  color?: string;
  size: string;
  quantity: number;
}

export interface Merch {
  id: string;
  name: string;
  description: string;
  maxSupply: number;
  cost: number;
  sizeChart: string[];
  colors: string[];
  images: string[];
  size?: string;
  color?: string;
  sizes: QuantitiesBySize[];
}
