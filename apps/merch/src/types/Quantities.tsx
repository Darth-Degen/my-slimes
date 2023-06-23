export interface QuantityItem {
  id: string;
  quantity: number;
}

export interface Quantities {
  [key: string]: QuantityItem;
}
