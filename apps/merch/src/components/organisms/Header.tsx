import { motion } from "framer-motion";
import { Dispatch, FC, SetStateAction } from "react";
import { midExitAnimation } from "@merch-constants";
import { Breadcrumbs, NftIndicator, CartIndicator } from "@merch-components";
import { Merch } from "@merch-types";

interface Props {
  step: number;
  nfts: number;
  cart: Merch[];
  handleCartClick: () => void;
  setStep: Dispatch<SetStateAction<number>>;
}
const Header: FC<Props> = (props: Props) => {
  const { step, nfts, cart, handleCartClick, setStep } = props;

  return (
    <motion.div
      className="flex flex-col md:flex-row items-center justify-between gap-5 w-full lg:h-[75px] px-10 py-5 lg:py-2"
      {...midExitAnimation}
    >
      <Breadcrumbs step={step} setStep={setStep} />
      <div className="flex gap-2">
        <NftIndicator count={nfts} />
        <CartIndicator cart={cart} handleCartClick={handleCartClick} />
      </div>
    </motion.div>
  );
};

export default Header;
