import { motion } from "framer-motion";
import { FC } from "react";
import { fastExitAnimation, midExitAnimation } from "@merch-constants";

interface Props {
  count: number;
}
const NftIndicator: FC<Props> = (props: Props) => {
  const { count } = props;

  return (
    <div className="relative flex items-center justify-center uppercase font-neuebit-bold">
      <p className="text-xl text-m-black">
        racks in your wallet -
        <motion.span
          className="text-lg text-m-black pl-1"
          {...fastExitAnimation}
        >
          {count}
        </motion.span>
      </p>
      <p className="absolute -bottom-4 left-[1px] text-m-mid-gray text-base">
        racks = .5 sol ea.
      </p>
    </div>
  );
};

export default NftIndicator;
