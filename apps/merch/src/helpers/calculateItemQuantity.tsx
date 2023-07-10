import { Quantity } from "@merch-types";

export const calculateItemQuantity = (
  productid: string,
  items: Quantity[]
): number => {
  const item = items.find((item) => item.productid === productid);

  if (item) {
    const totalQuantity = item.sizes.reduce(
      (sum, size) => sum + size.quantity,
      0
    );
    return totalQuantity;
  } else {
    return 0;
  }
};
