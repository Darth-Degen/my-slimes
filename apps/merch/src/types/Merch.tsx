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
  sizes: string[];
  colors: string[];
  images: string[];
  size?: string;
  color?: string;
  quantities: QuantitiesBySize[];
}

// const _quantsities: QuantitiesBySize[] = [
//   {
//     size: "s",
//     quantity: 0,
//   },
//   {
//     size: "tee",
//     quantity: 1,
//   },
//   {
//     size: "hat",
//     quantity: 10,
//   },
//   {
//     size: "pack",
//     quantity: 0,
//   },
// ];

// export interface Merch {
//   id: string;
//   name: string;
//   description: string;
//   maxSupply: number;
//   cost: number;
//   sizes: string[];
//   colors: string[];
//   images: string[];
//   size?: string;
//   color?: string;
//   quantities: Quantities[];
// }
