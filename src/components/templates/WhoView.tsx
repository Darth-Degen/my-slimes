import {
  Dispatch,
  FC,
  HTMLAttributes,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
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
  const isInView = useInView(ref);

  useEffect(() => {
    console.log("isInView ", isInView);
  }, [isInView]);

  return (
    <div
      className="relative w-full min-h-screen bg-custom-primary py-10 lg:py-20 "
      id="who"
      ref={ref}
    >
      {/* <motion.div
             key="who"
             {...midExitAnimation}
             className="sticky top-0 md:top-[8%] lg:top-[14%] "
           > */}
      <AnimatePresence mode="wait">
        {isGalleryFixed && isInView && (
          <WordScroll
            word="MEET THE SLIMES"
            className="text-center font-black px-2 text-[2.5rem] sm:text-6xl md:text-[5rem] lg:text-[7rem] xl:text-[9rem] 2xl:text-[10rem] 3xl:text-[12rem] 4xl:text-[16rem]"
            setIsFixed={setIsHeaderFixed}
            isFixed={isHeaderFixed}
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {isInView && (
          <Gallery
            collections={collections}
            parentRef={ref}
            setIsFixed={setIsGalleryFixed}
            isFixed={isGalleryFixed && isHeaderFixed}
          />
        )}
        {/* </motion.div> */}
      </AnimatePresence>

      <div className="pb-[2000px]" />
    </div>
  );
};

export default WhoView;
