import { Dispatch, FC, SetStateAction } from "react";
import { Merch } from "@merch-types";
import { AnimatePresence, motion } from "framer-motion";
import { fastExitAnimation } from "@merch-constants";

interface Props {
  step: number;
  storeItem: Merch | undefined;
  setStep: Dispatch<SetStateAction<number>>;
}
const Breadcrumbs: FC<Props> = (props: Props) => {
  const { step, storeItem, setStep } = props;

  return (
    <div className="flex gap-1.5 tracking-wide text-base md:text-xl text-m-black font-neuebit-bold uppercase">
      <motion.div
        className="cursor-pointer"
        onClick={() => {
          setStep(0);
        }}
        {...fastExitAnimation}
      >
        all in time
      </motion.div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div className="cursor-pointer" {...fastExitAnimation}>
            {">"}
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            className="cursor-pointer"
            onClick={() => {
              setStep(1);
            }}
            {...fastExitAnimation}
          >
            {storeItem?.name ?? "merch item"}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Breadcrumbs;
