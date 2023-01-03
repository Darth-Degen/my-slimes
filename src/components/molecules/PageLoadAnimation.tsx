import { FC, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LogoText } from "@components";

interface Props {
  show: boolean;
}

const PageLoadAnimation: FC<Props> = (props: Props) => {
  return (
    <motion.div
      className="absolute inset-0 z-50"
      key="page-load-animation"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
    >
      <div className="absolute left-1/2 top-[28.8%] transform -translate-y-1/2 -translate-x-1/2">
        <LogoText />
      </div>
    </motion.div>
  );
};
export default PageLoadAnimation;
