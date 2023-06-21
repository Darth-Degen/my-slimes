import { motion } from "framer-motion";
import { FC } from "react";
import { midExitAnimation } from "@merch-constants";
import Image from "next/image";

import logo from "../../../images/collab-logo.png";
interface Props {
  step: number;
}
const Footer: FC<Props> = (props: Props) => {
  const { step } = props;

  return (
    <motion.div
      className="flex items-center justify-between w-full lg:h-[60px] text-center px-10 py-5 md:py-2 uppercase"
      {...midExitAnimation}
    >
      {step > 0 && (
        <div className="w-1/4 flex font-neuebit-bold text-m-mid-gray text-base">
          racks = .5 sol ea.
        </div>
      )}
      <div className="w-1/2 text-red-500 font-neuebit-bold text-lg">
        NONE OF THESE ITEMS WILL BE MADE AGAIN. GET THEM NOW OR NEVER GET THEM.
      </div>
      {step > 0 && (
        <div className="w-1/4 flex justify-end">
          <Image
            src={logo}
            width={1052 / 6}
            height={268 / 6}
            alt="Slimes X All in Time"
          />{" "}
        </div>
      )}
    </motion.div>
  );
};

export default Footer;
