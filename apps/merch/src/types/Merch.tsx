export interface Merch {
  id: string;
  name: string;
  description: string;
  maxSupply: number; //or number[]
  cost: number;
  sizes: string[];
  colors: string[];
  images: string[];
}
