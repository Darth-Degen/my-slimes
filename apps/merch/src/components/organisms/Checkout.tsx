import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, FC, SetStateAction } from "react";
import { CartActions } from "@merch-components";
import { midExitAnimation } from "@merch-constants";
import { Merch } from "@merch-types";

interface Props {
  cart: Merch[];
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
}
//step 2 = cart, step 3 = shipping info, step 4 = review
const Checkout: FC<Props> = (props: Props) => {
  const { cart, step, setStep } = props;

  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start justify-start gap-12 xl:gap-16 h-full w-full px-12 py-5">
      <motion.div className="flex flex-col" {...midExitAnimation}>
        {!!cart ? (
          cart.map((item, index) => <div key={index}>{item.name}</div>)
        ) : (
          <div className="font-neuebit text-6xl tracking-wide">
            no items in cart
          </div>
        )}
      </motion.div>
      {/* step 2 = cart */}

      <AnimatePresence mode="wait">
        {step === 2 && <CartActions setStep={setStep} />}
      </AnimatePresence>
    </div>
  );
};

export default Checkout;
