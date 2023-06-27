import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, FC, SetStateAction } from "react";
import { CartActions, CheckoutCart } from "@merch-components";
import { Merch } from "@merch-types";

interface Props {
  cart: Merch[];
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  updateCart: Dispatch<SetStateAction<Merch[]>>;
}
//step 2 = cart, step 3 = shipping info, step 4 = review
const Checkout: FC<Props> = (props: Props) => {
  const { cart, step, setStep, updateCart } = props;

  return (
    <div className="flex flex-col gap-3 h-full lg:h-[76%] w-full px-12 py-5 justify-self-start">
      {/* title */}
      <div className="flex flex-col gap-1 text-m-mid-gray">
        <h3 className="font-neuebit-bold uppercase text-4xl">
          cart - {cart.length} items
        </h3>
      </div>
      {/* row */}
      <div className="w-full h-full flex flex-col lg:flex-row items-center lg:items-start justify-start gap-10  overflow-y-auto">
        {/* left side */}
        <CheckoutCart cart={cart} updateCart={updateCart} />
        {/* step 2 = cart */}
        <AnimatePresence mode="wait">
          {step === 2 && <CartActions setStep={setStep} />}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Checkout;
