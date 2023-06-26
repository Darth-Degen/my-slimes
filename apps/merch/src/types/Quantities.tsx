import { QuantitiesBySize } from "@merch-types";

export interface Quantity {
  productid: string;
  name: string;
  updated_at?: Date;
  cost: number;
  sizes: QuantitiesBySize[];
  // id: string;
  // quantity: number;
}

// export interface Quantities {
//   [key: string]: QuantityItem;
// }
