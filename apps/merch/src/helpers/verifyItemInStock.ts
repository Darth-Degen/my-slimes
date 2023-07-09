import { Merch, Quantity } from "@merch-types";

export const verifyItemInStock = (
  item: Merch, 
  quantities: Quantity[], 
  size?:string, 
  color?: string
): boolean => {

  // console.log(item, quantities);
  //get index of "item" in quantities array
  const index = quantities.findIndex(quantity => quantity.productid === item.id)

  //calculate total quantity
    const stock = quantities[index]?.sizes.reduce(
    (total, item) => {
       //has size and color param
       if (size && size === item?.size && color && color === item?.color) {
        // console.log("verifyItemInStock 1")
        return total + item.quantity
      } 
      else if (size && color) {
        // console.log("verifyItemInStock 2")
        return total
      }
      // has size param
      if (size && size === item?.size) {
        // console.log("verifyItemInStock 3")
        return total + item.quantity;
      } 
      else if (size) {
        // console.log("verifyItemInStock 4")
        return total;
      }
     
      return total + item.quantity;
    },
    0
  );
  // console.log("stock ", stock)
  return stock > 0;
};