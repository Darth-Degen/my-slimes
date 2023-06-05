import {
  Dispatch,
  SetStateAction,
  FC,
  useState,
  useRef,
  useEffect,
} from "react";
import { GalleryItem, GalleryArrowButton } from "@components";
import { Collection } from "@types";
import { motion } from "framer-motion";
import { fastExitAnimation } from "@constants";
import { useWindowSize } from "@hooks";

interface GProps {
  collections: Collection[];
  parentRef: React.RefObject<HTMLDivElement>;
  isFixed: boolean;
  setIsFixed: Dispatch<SetStateAction<boolean>>;
}
const Gallery: FC<GProps> = (props: GProps) => {
  const { collections, parentRef, isFixed, setIsFixed } = props;

  const [scrollValue, setScrollValue] = useState<number>(0);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFirstInView, setIsFirstInView] = useState<boolean>(false);
  const [isLastInView, setIsLastInView] = useState<boolean>(false);
  const [didChildHover, setDidChildHover] = useState<boolean>(false);

  const [winWidth, winHeight] = useWindowSize();
  const ref = useRef<HTMLDivElement>(null);

  //back clicked
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
    setScrollValue;
  };

  //next clicked
  const handleNext = () => {
    if (currentIndex < collections.length - 1 && !isLastInView) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  //first or last child enters view
  const handleIsInView = (index: number) => {
    //TODO: fix logic to show when track pad scrolls
    if (index === 0) setIsFirstInView(true);
    else setIsFirstInView(false);

    if (index === collections.length - 1) setIsLastInView(true);
    else setIsLastInView(false);
  };

  //set scroll distance on click
  useEffect(() => {
    const scrollDisance = -335;
    setScrollValue(currentIndex * scrollDisance);
  }, [collections.length, currentIndex, scrollValue, winWidth]);

  useEffect(() => {
    console.log("isFirstInView ", isFirstInView);
  }, [isFirstInView]);

  return (
    <motion.div
      className="sticky top-0 md:top-[8%] lg:top-[14%] flex items-center"
      key="gallery"
      {...fastExitAnimation}
    >
      <GalleryArrowButton
        direction="left"
        onClick={handlePrev}
        disabled={(!isFixed || currentIndex === 0) && !isFirstInView}
        className="z-10 w-16 hidden md:flex"
      />
      {/* <div className="flex overflow-x-scroll gap-3 3xl:gap-5 py-44 4xl:pb-[200px] px-5 min-w-full ml-[2300px] sm:ml-[2100px] md:ml-[1900px] lg:ml-[1600px] xl:ml-[1400px] 2xl:ml-[800px] 3xl:ml-[1100px] 4xl:ml-[600px]"> */}
      {/* <div className="flex overflow-x-auto gap-3 3xl:gap-5 py-44 4xl:pb-[200px]"> */}
      <div className="flex items-center overflow-x-scroll">
        <motion.div
          className="relative flex gap-3 3xl:gap-5 py-44 4xl:pb-[200px] px-4 md:px-0"
          initial={{ x: 0 }}
          animate={{ x: scrollValue }}
          transition={{ duration: 0.5 }}
          ref={ref}
          // onScroll={(e: React.UIEvent<HTMLDivElement>) => handleScroll(e)}
          // drag="x"
          // dragControls={controls}
          // dragConstraints={{ left: 0, right: -(totalWidth - imageWidth) }}
        >
          {collections.map((slime, index) => (
            <GalleryItem
              item={slime}
              key={slime.name}
              parentRef={parentRef}
              index={index}
              setIsFixed={setIsFixed}
              isFixed={isFixed}
              handleIsInView={handleIsInView}
              // didChildHover={didChildHover}
              setDidHover={setDidChildHover}
            />
          ))}
        </motion.div>
      </div>
      <GalleryArrowButton
        direction="right"
        onClick={handleNext}
        disabled={!isFixed || isLastInView}
        className="z-10 w-16 hidden md:flex"
      />
    </motion.div>
  );
};

export default Gallery;
