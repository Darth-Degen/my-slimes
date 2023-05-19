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
  const [isGalleryFixed, setIsGalleryFixed] = useState<boolean>(false);
  const [isHeaderFixed, setIsHeaderFixed] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  console.log("isHeaderFixed ", isHeaderFixed);

  return (
    <div
      className="relative w-full min-h-screen bg-custom-primary py-10 lg:py-20 "
      id="who"
      ref={ref}
    >
      <AnimatePresence mode="wait">
        {isGalleryFixed && (
          <WordScroll
            word="MEET THE SLIMES"
            className="text-center font-black px-2 text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 3xl:text-[12rem] 4xl:text-[16rem]"
            setIsFixed={setIsHeaderFixed}
            isFixed={isHeaderFixed}
          />
        )}
      </AnimatePresence>

      <Gallery
        collections={collections}
        parentRef={ref}
        setIsFixed={setIsGalleryFixed}
        isFixed={isGalleryFixed && isHeaderFixed}
      />
      <div className="pb-[4000px]" />
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
