import { Merch, Quantity } from "@merch-types";

export const verifyItemInStock = (
  item: Merch, 
  quantities: Quantity[], 
  size?:string, 
  color?: string
): boolean => {

  //get index of "item" in quantities array
  const index = quantities.findIndex(quantity => quantity.productid === item.id)

  //calculate total quantity
    const stock = quantities[index]?.sizes.reduce(
    (total, item) => {
       //has size and color param
       if (size && size === item?.size && color && color === item?.color) {
        return total + item.quantity
      } 
      else if (size && color) {
        return total
      }
      // has size param
      if (size && size === item?.size) {
        return total + item.quantity;
      } 
      else if (size) {
        return total;
      }
     
      return total + item.quantity;
    },
    0
  );

  return stock > 0;
};