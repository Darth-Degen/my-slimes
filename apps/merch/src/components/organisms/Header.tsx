import { motion } from "framer-motion";
import { Dispatch, FC, SetStateAction } from "react";
import { midExitAnimation } from "@merch-constants";
import { Breadcrumbs } from "@merch-components";

interface Props {
  step: number;
  checkoutStep: number;
  setStep: Dispatch<SetStateAction<number>>;
  setCheckoutStep: Dispatch<SetStateAction<number>>;
}
const Header: FC<Props> = (props: Props) => {
  const { step, checkoutStep, setStep, setCheckoutStep } = props;

  return (
    <motion.div
      className="flex items-center justify-between w-full h-[50px] px-10"
      {...midExitAnimation}
    >
      <Breadcrumbs
        step={step}
        checkoutStep={checkoutStep}
        setStep={setStep}
        setCheckoutStep={setCheckoutStep}
      />
    </motion.div>
  );
};

export default Header;
