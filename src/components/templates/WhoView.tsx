import {
  Dispatch,
  FC,
  HTMLAttributes,
  ReactNode,
  SetStateAction,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { collections, midExitAnimation } from "@constants";
import { Gallery, WordScroll } from "@components";
interface Props {
  setAssets?: Dispatch<SetStateAction<boolean[]>>;
}
const WhoView: FC<Props> = (props: Props) => {
  const { setAssets } = props;
  const [isFixed, setIsFixed] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative w-full min-h-screen bg-custom-primary py-10 lg:py-20 "
      id="who"
      ref={ref}
    >
      <AnimatePresence mode="wait">
        {isFixed && (
          <WordScroll
            word="MEET THE SLIMES"
            className="text-center font-black px-2 text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 3xl:text-[12rem] 4xl:text-[16rem]"
          />
          //  <motion.h3
          //       className="z-10 sticky top-[8%] md:top-[5%] text-center font-black px-2 w-full
          //       text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 3xl:text-[12rem] 4xl:text-[16rem] "
          //       {...midExitAnimation}
          //     >
          //       MEET THE SLIMES
          //     </motion.h3>
        )}
      </AnimatePresence>

      <Gallery
        collections={collections}
        parentRef={ref}
        setIsFixed={setIsFixed}
        isFixed={isFixed}
      />
      <div className="pb-[6000px]" />
    </div>
  );
};

interface sProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}
const VerticalTextScrollAnimation: FC<sProps> = (props: sProps) => {
  const { children, className, ...componentProps } = props;
  return (
    <motion.div className="" key="vtsa" {...midExitAnimation}>
      {children}
    </motion.div>
  );
};

export default WhoView;
