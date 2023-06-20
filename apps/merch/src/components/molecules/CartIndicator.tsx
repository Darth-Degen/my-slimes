import { AnimatePresence, motion } from "framer-motion";
import { FC } from "react";
import { fastExitAnimation } from "@merch-constants";
import { Merch } from "@merch-types";
import Image from "next/image";

import cartIcon from "../../../images/icons/cart.svg";

interface Props {
  cart: Merch[];
  handleCartClick: () => void;
}
const CartIndicator: FC<Props> = (props: Props) => {
  const { cart, handleCartClick } = props;

  return (
    <div
      className="relative flex justify-end w-16 mt-0 cursor-pointer"
      onClick={() => handleCartClick()}
    >
      <Image src={cartIcon} alt="esc" width={45} height={45} />
      <AnimatePresence mode="wait">
        {cart.length > 0 && (
          <motion.div
            id="cartbubble"
            className="flex items-center justify-center absolute -top-3 right-1.5 bg-red-500 text-lg text-white h-7 w-7 rounded-full"
            {...fastExitAnimation}
          >
            {cart.length}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CartIndicator;
