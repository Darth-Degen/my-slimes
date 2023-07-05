import { AnimatePresence, motion } from "framer-motion";
import { FC } from "react";
import { fastExitAnimation, midExitAnimation } from "@merch-constants";
import Image from "next/image";

import logo from "../../../images/collab-logo.png";
interface Props {
  step: number;
}
const Footer: FC<Props> = (props: Props) => {
  const { step } = props;

  return (
    <motion.div
      className={`flex flex-col lg:flex-row items-center w-full lg:h-[70px] gap-3 lg:gap-0 text-center px-10 py-5 md:py-2 uppercase ${
        step === 0 ? "justify-center " : "justify-between "
      }`}
      {...midExitAnimation}
    >
      <AnimatePresence mode="wait">
        {step > 0 && (
          <motion.div
            key="racks"
            className="lg:w-1/4 flex font-neuebit-bold text-m-mid-gray text-base"
            {...fastExitAnimation}
          >
            racks = .5 sol ea.
          </motion.div>
        )}
      </AnimatePresence>
      <div className="lg:w-1/2 text-red-500 font-neuebit-bold text-lg sm:whitespace-nowrap lg:pt-10 xl:pt-0">
        NONE OF THESE ITEMS WILL BE MADE AGAIN. GET THEM NOW OR NEVER GET THEM.
      </div>
      <AnimatePresence mode="wait">
        {step > 0 && (
          <motion.div
            className="lg:w-1/4 flex justify-end"
            key="logo"
            {...fastExitAnimation}
          >
            <Image
              src={logo}
              width={1052 / 8}
              height={268 / 8}
              alt="Slimes X All in Time"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Footer;
