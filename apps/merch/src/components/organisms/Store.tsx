import { motion } from "framer-motion";
import { Dispatch, FC, SetStateAction } from "react";
import { midExitAnimation, merch } from "@merch-constants";
import { StoreItem, Header, Footer } from "@merch-components";
import { Merch } from "@merch-types";

interface Props {
  step: number;
  checkoutStep: number;
  nfts: number;
  cart: Merch[];
  handleCartClick: () => void;
  addToCart: (item: Merch) => void;
  setStep: Dispatch<SetStateAction<number>>;
  setCheckoutStep: Dispatch<SetStateAction<number>>;
}
const Store: FC<Props> = (props: Props) => {
  const {
    step,
    checkoutStep,
    nfts,
    cart,
    handleCartClick,
    addToCart,
    setStep,
    setCheckoutStep,
  } = props;

  return (
    <motion.div
      className="flex flex-col items-center justify-between lg:justify-around h-full w-full"
      {...midExitAnimation}
    >
      {/* header */}
      <Header
        step={step}
        checkoutStep={checkoutStep}
        nfts={nfts}
        cart={cart}
        handleCartClick={handleCartClick}
        setStep={setStep}
        setCheckoutStep={setCheckoutStep}
      />
      {/* body */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 xl:gap-20 2xl:gap-x-36 px-10 py-10 md:py-0">
        {merch.map((item: Merch, index) => (
          <StoreItem item={item} key={index} addToCart={addToCart} />
        ))}
      </div>
      {/* footer  */}
      <Footer step={step} checkoutStep={checkoutStep} />
    </motion.div>
  );
};

export default Store;
