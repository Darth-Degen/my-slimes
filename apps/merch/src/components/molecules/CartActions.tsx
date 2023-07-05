import { motion } from "framer-motion";
import { Dispatch, FC, SetStateAction } from "react";
import { midExitAnimation } from "@merch-constants";

interface Props {
  setStep: (value: number) => void;
  handleCheckout: () => void;
}
//step 2 = cart, step 3 = shipping info, step 4 = review
const CartActions: FC<Props> = (props: Props) => {
  const { setStep, handleCheckout } = props;

  return (
    <motion.div
      className="flex flex-col items-center xl:items-start gap-3"
      key="cart"
      {...midExitAnimation}
    >
      <button
        className="h-12 w-60 bg-m-green rounded-full text-white uppercase font-neuebit-bold text-xl pt-0.5 tracking-wide"
        onClick={() => {
          handleCheckout();
        }}
      >
        checkout
      </button>
      <button
        className="h-12 w-60 bg-m-mid-gray rounded-full text-white uppercase font-neuebit-bold text-xl pt-0.5 tracking-wide"
        onClick={() => {
          setStep(0);
        }}
      >
        keep shopping
      </button>
    </motion.div>
  );
};

export default CartActions;
