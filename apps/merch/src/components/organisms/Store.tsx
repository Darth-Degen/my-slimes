import { motion } from "framer-motion";
import { Dispatch, FC, SetStateAction } from "react";
import { midExitAnimation, merch } from "@merch-constants";
import { StoreItem, Header, Footer } from "@merch-components";
import { Merch, Quantities } from "@merch-types";

interface Props {
  step: number;
  nfts: number;
  cart: Merch[];
  quantities: Quantities;
  handleCartClick: () => void;
  addToCart: (item: Merch) => void;
  setStep: Dispatch<SetStateAction<number>>;
  handleImageClick: (item: Merch) => void;
}
const Store: FC<Props> = (props: Props) => {
  const {
    step,
    nfts,
    cart,
    quantities,
    handleCartClick,
    addToCart,
    setStep,
    handleImageClick,
  } = props;

  return (
    <motion.div
      className="flex flex-col items-center justify-between lg:justify-around h-full w-full"
      {...midExitAnimation}
    >
      {/* header */}
      <Header
        step={step}
        nfts={nfts}
        cart={cart}
        handleCartClick={handleCartClick}
        setStep={setStep}
      />
      {/* body */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 xl:gap-20 2xl:gap-x-36 px-10 py-10 md:py-0">
        {merch.map((item: Merch, index) => (
          <StoreItem
            item={item}
            key={index}
            addToCart={addToCart}
            quantity={quantities[item.id].quantity}
            handleImageClick={handleImageClick}
          />
        ))}
      </div>
      {/* footer  */}
      <Footer step={step} />
    </motion.div>
  );
};

export default Store;
