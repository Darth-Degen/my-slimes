import { AnimatePresence, motion } from "framer-motion";
import { FC } from "react";
import { fastExitAnimation } from "@merch-constants";

interface Props {
  count: number;
  step: number;
}
const NftIndicator: FC<Props> = (props: Props) => {
  const { count, step } = props;

  return (
    <div className="relative flex items-center justify-center uppercase font-neuebit-bold">
      <p className="text-xl text-m-black">
        racks in your wallet -
        <motion.span
          className="text-xl text-m-black pl-1"
          {...fastExitAnimation}
        >
          {count}
        </motion.span>
      </p>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.p
            className="absolute -bottom-4 left-[1px] text-m-mid-gray text-base"
            {...fastExitAnimation}
          >
            racks = .5 sol ea.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NftIndicator;
