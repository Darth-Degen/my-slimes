import { motion } from "framer-motion";
import { FC, ReactNode, useEffect, HTMLAttributes } from "react";
import {
  midExitAnimation,
  midClickAnimation,
  scaleExitAnimation,
} from "@merch-constants";

interface Props extends HTMLAttributes<HTMLDivElement> {
  show: boolean;
  children: ReactNode;
}

const Modal: FC<Props> = (props: Props) => {
  const { show, children, className, ...componentProps } = props;

  //stop page scroll when modal open
  useEffect(() => {
    if (show) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [show]);

  return (
    <motion.div
      key="image-modal"
      className="fixed relativeinset-0 backdrop-blur-sm bg-[#232B33] bg-opacity-50 z-50 w-screen h-screen cursor-pointer flex items-center justify-center"
      onClick={componentProps.onClick}
      {...midExitAnimation}
    >
      <motion.div
        // className={`cursor-default md:bg-opacity-90 relative left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-clip
        // bg-main bg-cover rounded-3xl  w-[98%] h-[85%] md:h-[90%] lg:h-[70vh] lg:w-[100vh] xl:w-[130vh]
        className={`cursor-default relative bg-m-light-gray 
        ${className}`}
        {...scaleExitAnimation}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default Modal;
