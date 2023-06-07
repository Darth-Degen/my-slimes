import {
  useScroll,
  MotionValue,
  useTransform,
  motion,
  useMotionValueEvent,
} from "framer-motion";
import {
  HTMLAttributes,
  FC,
  forwardRef,
  useState,
  useEffect,
  useRef,
} from "react";
import { WhatViewContent } from "@types";
import { useWindowSize } from "src/hooks";

interface TextProps extends HTMLAttributes<HTMLDivElement> {
  content: WhatViewContent;
  topPosition: number;
  divRef: React.RefObject<HTMLDivElement>;
  index: number;
}
const TextScroll: FC<TextProps> = forwardRef<HTMLDivElement, TextProps>(
  function Child(props: TextProps, ref) {
    const { content, topPosition, divRef, index } = props;
    const [isSticky, setIsSticky] = useState(true);

    const [winWidth, winHeight] = useWindowSize();
    // const divRef = useRef(null);

    const is3XL = winWidth >= 2160;

    const { scrollYProgress, scrollY } = useScroll({
      target: divRef,
    });

    const opacity: MotionValue<number> = useTransform(
      scrollYProgress,
      [1, 0.3, 0],
      [0, 1, 1]
    );
    // const y: MotionValue<number> = useTransform(
    //   scrollY,
    //   [startY - winHeight, startY + winHeight + index * winHeight],
    //   [startY, topPosition]
    // );

    const startY = winHeight * 2;

    const y: MotionValue<number> = useTransform(
      scrollY,
      [
        startY - (is3XL ? winHeight * 2 : winHeight),
        startY + winHeight + index * (is3XL ? winHeight * 0.5 : winHeight),
      ],
      [startY, topPosition]
    );

    // const y: MotionValue<number> = useTransform(
    //   scrollY,
    //   [startY - winHeight, startY + winHeight + index * winHeight],
    //   [startY, topPosition]
    // );

    // useMotionValueEvent(scrollY, "change", (latest) => {
    //   if (content.title === "culture")
    //     console.log("TextScroll ", latest, startY);
    // });

    return (
      <motion.div
        className={`flex flex-col gap-4 items-center lg:items-start ${
          isSticky ? "sticky top-[5%] xl:top-[10%] " : ""
        }`}
        style={{
          // opacity,
          y,
        }}
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
