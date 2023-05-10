import { useScroll, MotionValue, useTransform, motion } from "framer-motion";
import { HTMLAttributes, FC, forwardRef, useState } from "react";

interface TextProps extends HTMLAttributes<HTMLDivElement> {
  content: WhatViewContent;
  topPosition: number;
  divRef: React.RefObject<HTMLDivElement>;
}
const TextScroll: FC<TextProps> = forwardRef<HTMLDivElement, TextProps>(
  function Child(props: TextProps, ref) {
    const { content, topPosition, divRef } = props;
    const [isSticky, setIsSticky] = useState(true);
    // const divRef = useRef(null);

    const { scrollYProgress, scrollY } = useScroll({
      target: divRef,
    });
    const opacity: MotionValue<number> = useTransform(
      scrollYProgress,
      [1, 0.3, 0],
      [0, 1, 1]
    );
    const y: MotionValue<number> = useTransform(
      scrollY,
      [0, 600],
      [800, topPosition]
    );

    // useMotionValueEvent(scrollYProgress, "change", (latest) => {
    //   console.log("scrollYProgress ", latest, topPosition);
    // });

    return (
      <motion.div
        className={`flex flex-col gap-4 items-center lg:items-start ${
          isSticky ? "sticky top-[5%] xl:top-[10%] " : ""
        }`}
        style={{ opacity, y }}
        ref={divRef}
      >
        <p className="text-xl sm:text-3xl lg:text-9xl 3xl:text-[10rem] 4xl:text-[12rem] font-black uppercase">
          {content.title}
        </p>
        <div className="text-sm sm:text-base flex flex-col md:flex-row items-center gap-4 lg:gap-10 lg:ml-14 2xl:ml-20">
          <p className="w-64">{content.textOne}</p>
          <p className="w-64">{content.textTwo}</p>
        </div>
      </motion.div>
    );
  }
);

export default TextScroll;
