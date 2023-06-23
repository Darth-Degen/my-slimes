import { motion } from "framer-motion";
import { FC } from "react";
import { midExitAnimation } from "@merch-constants";

interface Props {
  step: number;
}
const Footer: FC<Props> = (props: Props) => {
  const { step } = props;

  return (
    <motion.div
      className="flex items-center justify-between lg:h-[50px] text-center px-10 py-5 md:py-2"
      {...midExitAnimation}
    >
      {step === 0 && (
        <div className="text-red-500 font-neuebit-bold text-lg">
          NONE OF THESE ITEMS WILL BE MADE AGAIN. GET THEM NOW OR NEVER GET
          THEM.
        </div>
      )}
    </motion.div>
  );
};

export default Footer;
