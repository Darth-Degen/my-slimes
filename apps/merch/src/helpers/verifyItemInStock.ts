import { Merch } from "@merch-types";

export const verifyItemInStock = (item: Merch): boolean => {
  const stock = item.sizes.reduce(
    (accumulator, size) => accumulator + size.quantity,
    0
  );
  return stock > 0;
};