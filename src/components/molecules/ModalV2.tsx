import { motion } from "framer-motion";
import { FC, ReactNode, useEffect, HTMLAttributes } from "react";
import {
  midExitAnimation,
  midClickAnimation,
  scaleExitAnimation,
} from "@constants";
import Image from "next/image";
interface Props extends HTMLAttributes<HTMLDivElement> {
  show: boolean;
  children: ReactNode;
  contentLoaded?: boolean;
}
const Modal: FC<Props> = (props: Props) => {
  const {
    show,
    children,
    contentLoaded = true,
    className,
    ...componentProps
  } = props;

  //stop page scroll when modal open
  useEffect(() => {
    console.log("hide body ", true);
    if (show) document.body.style.overflow = "hidden";
    // else document.body.style.overflow = "auto";
  }, [show]);

  return (
    <motion.div
      key="image-modal"
      className="fixed inset-0 backdrop-blur-sm bg-v2-dark bg-opacity-80 z-50 w-screen h-screen cursor-pointer"
      onClick={componentProps.onClick}
      {...midExitAnimation}
      // {...scaleExitAnimation}
    >
      <div
        className={` cursor-default md:bg-opacity-90 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-clip
        bg-main bg-cover rounded-3xl  w-[98%] h-[85%] md:h-[90%] lg:h-[70vh] lg:w-[100vh] xl:w-[130vh]  
        ${className}`}
        // onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </motion.div>
  );
};

export default Modal;
