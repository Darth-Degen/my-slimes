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

const WordFall: FC<Props> = (props: Props) => {
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
      document.body.style.height = `${containerHeight}px`;
    }
  }, []);

  const wordLetters = word.split("");

  useMotionValueEvent(scrollY, "change", (latest) => {
    //set start + end values
    if (!initRef.current) {
      setStart(latest);
      setEnd(latest + 350);
      initRef.current = true;
    }
    if (end && latest >= end) {
      setIsFixed(true);
    } else setIsFixed(false);
  });

  return (
    <motion.div
      className="z-10 sticky top-[8%] lg:top-[5%] flex justify-center items-center"
      {...midExitAnimation}
    >
      <div className="flex flex-col ">
        {start && end && (
          <div ref={containerRef} className={`flex flex-wrap ${className}`}>
            {wordLetters.map((letter, index) => (
              <WordFallItem
                letter={letter}
                index={index}
                key={index}
                start={start}
                end={end}
              />
            ))}
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
    </motion.div>
  );
};

interface ItemProps extends HTMLAttributes<HTMLDivElement> {
  letter: string;
  index: number;
  start: number;
  end: number;
}

const WordFallItem: FC<ItemProps> = (props: ItemProps) => {
  const { letter, index, start, end } = props;
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.span
      ref={ref}
      key={index}
      initial={{ opacity: 0, translateY: index * -200 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0, translateY: index * -200 }}
    >
      {letter === " " ? <span> &nbsp;</span> : letter}
    </motion.span>
  );
};

export default WordFall;
