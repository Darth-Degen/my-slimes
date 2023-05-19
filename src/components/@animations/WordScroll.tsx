import React, {
  Dispatch,
  FC,
  HTMLAttributes,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { midExitAnimation } from "src/constants";

interface Props extends HTMLAttributes<HTMLDivElement> {
  word: string;
  setIsFixed: Dispatch<SetStateAction<boolean>>;
  isFixed: boolean;
}

const WordScroll: FC<Props> = (props: Props) => {
  const { word, setIsFixed, isFixed, className } = props;
  const [start, setStart] = useState<number>();
  const [end, setEnd] = useState<number>();
  const [isHeaderFixed, setIsHeaderFixed] = useState<boolean>(false);

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
    //set start + end values
    if (!initRef.current) {
      setStart(latest);
      setEnd(latest + 1500);
      initRef.current = true;
    }
    if (end && latest >= end) {
      setIsFixed(true);
    } else setIsFixed(false);
  });
  console.log("wordLetters ", wordLetters, wordLetters.length);
  return (
    <div className="z-10 sticky top-[8%] lg:top-[5%] flex justify-center items-center">
      <div className="flex flex-col ">
        {start && end && (
          <div ref={containerRef} className={`flex flex-wrap ${className}`}>
            {wordLetters.map((letter, index) => {
              console.log("letter ", letter);
              return (
                <WordScrollItem
                  letter={letter}
                  index={index}
                  key={index}
                  start={start}
                  end={end}
                />
              );
            })}
          </div>
        )}
        <AnimatePresence mode="wait">
          {isFixed && (
            <motion.div
              className="hidden md:flex justify-between w-full pb-4 px-4 sm:px-6"
              key="we-eatin"
              {...midExitAnimation}
            >
              <div className="w-1/3 uppercase">the whole squad here</div>
              <div className="w-1/3 uppercase flex justify-center">and</div>
              <div className="w-1/3 uppercase flex justify-end">
                everybody eats
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
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

  // console.log("start ", start);
  // console.log("end ", end);
  const { scrollY } = useScroll();
  const translateY = useTransform(
    scrollY,
    [start, end],
    [-200 * (index + 1), 0]
  );
  // const opacity = useTransform(scrollY, [start, end], [0.5, 1]);
  console.log("space ", letter === " ");
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
      {letter === " " ? <span> &nbsp;</span> : letter}
    </motion.span>
  );
};

export default WordScroll;
