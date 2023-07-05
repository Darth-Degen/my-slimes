import { motion } from "framer-motion";
import { Dispatch, FC, SetStateAction } from "react";
import { midExitAnimation } from "@merch-constants";
import { Breadcrumbs, NftIndicator, CartIndicator } from "@merch-components";
import { Merch } from "@merch-types";

interface Props {
  step: number;
  nfts: number;
  cart: Merch[];
  storeItem: Merch | undefined;
  handleCartClick: () => void;
  setStep: (value: number) => void;
}
const Header: FC<Props> = (props: Props) => {
  const { step, nfts, cart, storeItem, handleCartClick, setStep } = props;

  return (
    <motion.div
      className="flex flex-col md:flex-row items-center justify-between gap-3 lg:gap-5 w-full px-10 py-5 lg:pt-3"
      {...midExitAnimation}
    >
      <Breadcrumbs step={step} setStep={setStep} storeItem={storeItem} />
      <div className="flex gap-2">
        <NftIndicator count={nfts} step={step} />
        <CartIndicator cart={cart} handleCartClick={handleCartClick} />
      </div>
    </motion.div>
  );
};

export default Header;
