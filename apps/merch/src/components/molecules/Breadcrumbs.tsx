import { Dispatch, FC, SetStateAction } from "react";
import { Merch } from "@merch-types";
import { AnimatePresence, motion } from "framer-motion";
import { fastExitAnimation } from "@merch-constants";

interface Props {
  step: number;
  storeItem: Merch | undefined;
  setStep: (value: number) => void;
}
const Breadcrumbs: FC<Props> = (props: Props) => {
  const { step, storeItem, setStep } = props;

  return (
    <div className="flex flex-wrap gap-1.5 tracking-wide text-base md:text-xl text-m-black font-neuebit-bold uppercase">
      {/* main */}
      <motion.div
        className="cursor-pointer"
        onClick={() => {
          setStep(0);
        }}
        {...fastExitAnimation}
      >
        all in time
      </motion.div>

      {/* detail view */}
      <Carrot step={step} index={0} secondCondition={!!storeItem} />
      <AnimatePresence mode="wait">
        {step > 0 && storeItem && (
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

      {/* checkout - cart */}
      <Carrot step={step} index={1} />
      <AnimatePresence mode="wait">
        {step > 1 && (
          <motion.div
            className="cursor-pointer"
            onClick={() => {
              setStep(2);
            }}
            {...fastExitAnimation}
          >
            shopping cart
          </motion.div>
        )}
      </AnimatePresence>

      {/* checkout - shipping */}
      <Carrot step={step} index={2} />
      <AnimatePresence mode="wait">
        {step > 2 && (
          <motion.div
            className="cursor-pointer"
            onClick={() => {
              setStep(3);
            }}
            {...fastExitAnimation}
          >
            shipping
          </motion.div>
        )}
      </AnimatePresence>

      {/* checkout - shipping */}
      <Carrot step={step} index={3} />
      <AnimatePresence mode="wait">
        {step > 3 && (
          <motion.div
            className="cursor-pointer"
            onClick={() => {
              setStep(4);
            }}
            {...fastExitAnimation}
          >
            place order
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface CarrotProps {
  step: number;
  index: number;
  secondCondition?: boolean;
}
const Carrot: FC<CarrotProps> = (props: CarrotProps) => {
  const { step, index, secondCondition = true } = props;
  return (
    <AnimatePresence mode="wait">
      {step > index && secondCondition && (
        <motion.div className="cursor-pointer" {...fastExitAnimation}>
          {">"}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Breadcrumbs;
