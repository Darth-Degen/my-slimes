import { AnimatePresence, motion } from "framer-motion";
import { SetStateAction, Dispatch, FC, ReactNode, useEffect } from "react";
import { exitAnimation } from "@constants";

interface Props {
  show: boolean;
  close: Dispatch<SetStateAction<string>>;
  children: ReactNode;
}
const Modal: FC<Props> = (props: Props) => {
  const { show, close, children } = props;

  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          key="image-modal"
          className="fixed inset-0 backdrop-blur-xl z-50"
          onClick={() => close("")}
          {...exitAnimation}
        >
          <div
            className={`h-screen w-screen md:w-4/5 md:h-4/5 bg-opacity-50 md:bg-opacity-90
              md:rounded-lg absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-stone-200 opacity-100 `}
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              className="cursor-pointer absolute top-2 right-2 md:-top-5 md:-right-5 z-50 border border-custom-dark rounded-full h-14 w-14 
              text-3xl bg-stone-100 flex items-center justify-center pb-1 transition-colors duration-300 hover:bg-white"
              onClick={() => close("")}
              whileTap={{ scale: 0.96 }}
            >
              x
            </motion.div>
            <div className="rounded-3xl">{children}</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
