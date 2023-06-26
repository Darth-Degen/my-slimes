import { Merch } from "@merch-types";

export const verifyItemInStock = (item: Merch, size?:string, color?: string): boolean => {
  console.log("verify ", size, color, item)
  let check = 0;
  const stock = item.sizes.reduce(
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
        console.log("size ", item, item.quantity);
        return total + item.quantity;
      } 
      else if (size) {
        console.log("size ", item, 0);
        return total;
      }
     

      return total + item.quantity;
    },
    0
  );
  console.log("stock ", stock)
  return stock > 0;
};