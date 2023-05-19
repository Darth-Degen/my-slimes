import React, { FC, HTMLAttributes, useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { midExitAnimation } from "src/constants";

interface Props extends HTMLAttributes<HTMLDivElement> {
  word: string;
}

const WordScroll: FC<Props> = (props: Props) => {
  const { word, className } = props;
  const [start, setStart] = useState<number>();
  const [end, setEnd] = useState<number>();

  const { scrollY } = useScroll();
  const containerRef = useRef<HTMLDivElement>(null);
  const initRef = useRef<boolean>(false);

  useEffect(() => {
    if (containerRef.current) {
      const containerHeight = containerRef.current.offsetHeight;
      // console.log("containerHeight ", containerHeight);
      document.body.style.height = `${containerHeight}px`;
    }
  }, []);

  const wordLetters = word.split("");

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (!initRef.current) {
      setStart(latest);
      setEnd(latest + 1500);
      console.log("scrollY ", latest);
      initRef.current = true;
    }
  });

  return (
    <motion.div
      className="z-10 sticky top-[8%] md:top-[5%] flex justify-center items-center"
      {...midExitAnimation}
    >
      {start && end && (
        <div ref={containerRef} className={`flex flex-wrap ${className}`}>
          {wordLetters.map((letter, index) => (
            <WordScrollItem
              letter={letter}
              index={index}
              key={index}
              start={start}
              end={end}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

interface ItemProps extends HTMLAttributes<HTMLDivElement> {
  letter: string;
  index: number;
  start: number;
  end: number;
}

const WordScrollItem: FC<ItemProps> = (props: ItemProps) => {
  const { letter, index, start, end } = props;
  const ref = useRef<HTMLDivElement>(null);

  console.log("start ", start);
  console.log("end ", end);
  const { scrollY } = useScroll();
  const translateY = useTransform(
    scrollY,
    [start, end],
    [-300 * (index + 1), 0]
  );
  const opacity = useTransform(scrollY, [start, end], [0.5, 1]);

  return (
    <motion.span
      ref={ref}
      key={index}
      className=""
      style={{
        translateY,
        // opacity,
      }}
    >
      {letter}
    </motion.span>
  );
};

export default WordScroll;
