import { motion } from "framer-motion";
import { FC } from "react";
import { midExitAnimation } from "@merch-constants";

interface Props {
  step: number;
  checkoutStep: number;
}
const Footer: FC<Props> = (props: Props) => {
  const { step, checkoutStep } = props;

  return (
    <motion.div
      className="flex items-center justify-between h-[50px] text-center px-5"
      {...midExitAnimation}
    >
      {step === 1 && checkoutStep === 0 && (
        <div className="text-red-500 font-neuebit-bold text-lg">
          NONE OF THESE ITEMS WILL BE MADE AGAIN. GET THEM NOW OR NEVER GET
          THEM.
        </div>
      )}
    </motion.div>
  );
};

export default Footer;
