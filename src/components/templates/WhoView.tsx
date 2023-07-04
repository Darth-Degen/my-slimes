import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  collection as collections,
  fastExitAnimation,
  slideRight,
} from "@constants";
import { Gallery, WordFall } from "@components";
import { useWindowSize } from "@merch-hooks";
interface Props {
  setAssets?: Dispatch<SetStateAction<boolean[]>>;
  id: string;
  setCurrentPage: Dispatch<SetStateAction<string>>;
}
const WhoView: FC<Props> = (props: Props) => {
  const { setAssets, id, setCurrentPage } = props;
  //state
  const [isGalleryFixed, setIsGalleryFixed] = useState<boolean>(false);
  const [isHeaderFixed, setIsHeaderFixed] = useState<boolean>(false);
  //hooks
  const [winWidth, winHeight] = useWindowSize();
  //refs
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);

  //one time animation
  const animateRef = useRef<number>(0);
  useEffect(() => {
    if (isInView) animateRef.current += 1;
  }, [isInView]);
  //animations
  const text = "MEET THE SLIMES";
  const containerVariants = {
    hidden: {
      opacity: animateRef.current < 1 ? 0 : 1,
      // x: -150
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        staggerChildren: 0.12, // Delay between staggered children
        duration: 1,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: animateRef.current < 1 ? 0 : 1, x: -150 }, // Starting position outside the container
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5, // Duration of the animation
      },
    },
  };

  //auto scroll
  useEffect(() => {
    if (isInView) setCurrentPage(id);
  }, [id, isInView, setCurrentPage]);

  return (
    <div
      className="relative w-full min-h-screen mt-32 bg-custom-primary"
      id="who"
      ref={ref}
    >
      <motion.div
        className="sticky top-[8%] lg:top-[4%]"
        // {...slideRight(isInView, -1000, 1.5, 0.25)}
      >
        <motion.div className="flex justify-center items-center">
          <div className="flex flex-col ">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="font-black px-2 responsive-text whitespace-nowrap"
            >
              {text.split("").map((letter, index) => (
                <motion.span key={index} variants={letterVariants}>
                  {letter}
                </motion.span>
              ))}
            </motion.div>
            <AnimatePresence mode="wait">
              {isInView && (
                <motion.div
                  className="hidden md:flex justify-between w-full pb-4 px-7 xl:-mt-14"
                  key="we-eatin"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, ease: "easeInOut", delay: 1.5 }}
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
        <Gallery
          collections={collections}
          parentRef={ref}
          setIsFixed={setIsGalleryFixed}
          isFixed={true}
          isParentInView={isInView}
          animateRefValue={animateRef.current}
        />
      </motion.div>
      <div className="pb-[400px] 3xl:pb-[900px]" />
    </div>
  );
};

export default WhoView;
