import { motion } from "framer-motion";
import { FC, ReactNode, useEffect, HTMLAttributes } from "react";
import {
  midExitAnimation,
  midClickAnimation,
  scaleExitAnimation,
} from "apps/merch/src/constants";

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
      className="fixed inset-0 backdrop-blur-sm bg-[#232B33] bg-opacity-50 z-50 w-screen h-screen cursor-pointer flex items-center justify-center"
      onClick={componentProps.onClick}
      {...midExitAnimation}
    >
      <motion.div
        className={`cursor-default relative bg-m-light-gray overflow-y-auto
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
