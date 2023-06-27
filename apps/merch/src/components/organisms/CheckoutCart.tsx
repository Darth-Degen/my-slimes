import { motion } from "framer-motion";
import { Dispatch, FC, SetStateAction } from "react";
import { midExitAnimation } from "@merch-constants";
import { CheckoutCartItem } from "@merch-components";
import { Merch } from "@merch-types";

interface Props {
  cart: Merch[];
  updateCart: Dispatch<SetStateAction<Merch[]>>;
}
const CheckoutCart: FC<Props> = (props: Props) => {
  const { cart, updateCart } = props;

  return (
    <motion.div
      className="flex flex-col w-full lg:w-1/2 h-full bg-white p-6 gap-4 overflow-y-auto"
      {...midExitAnimation}
    >
      {!!cart ? (
        cart.map((item, index) => (
          <CheckoutCartItem
            key={index}
            item={item}
            index={index}
            updateCart={updateCart}
          />
        ))
      ) : (
        <div className="font-neuebit text-6xl tracking-wide">
          no items in cart
        </div>
      )}
    </motion.div>
  );
};

export default CheckoutCart;
