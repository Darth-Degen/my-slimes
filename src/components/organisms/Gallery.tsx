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
import { motion, useInView, useScroll, useTransform } from "framer-motion";
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
  const [startY, setStartY] = useState<number>();

  const isInView = useInView(parentRef);

  const [winWidth, winHeight] = useWindowSize();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll({
    target: ref,
  });

  //scroll direction
  const [scrollDirection, setScrollDirection] = useState("down");
  const prevScrollY = useRef<number>(0);
  useEffect(() => {
    if (isInView) {
      setScrollDirection(scrollY.get() > prevScrollY.current ? "down" : "up");
    }
    prevScrollY.current = scrollY.get();
  }, [isInView, scrollY]);
  // useTransform(scrollY, (value) => {
  //   // const currentValue = value.get();

  // });

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
    console.log("scrollDirection ", scrollDirection);
  }, [scrollDirection]);

  useEffect(() => {
    if (isInView) setStartY(scrollY.get());
    // else if (isInView && scrollDirection === "up") setStartY(0);
  }, [isInView, scrollY]);

  return (
    <motion.div
      className="sticky top-0 md:top-[8%] lg:top-[20%] flex items-center z-20"
      key="gallery"
      {...fastExitAnimation}
    >
      <GalleryArrowButton
        direction="left"
        onClick={handlePrev}
        disabled={(!isFixed || currentIndex === 0) && !isFirstInView}
        className="z-10 w-16 hidden md:flex"
      />
      <div className="flex items-center overflow-x-scroll overflow-y-hidden">
        <motion.div
          className="relative flex gap-3 3xl:gap-5 pt-32 pb-64 4xl:pb-[200px] px-4 md:px-0"
          initial={{ x: 0 }}
          animate={{ x: scrollValue }}
          transition={{ duration: 0.5 }}
          ref={ref}
        >
          {startY &&
            collections.map((slime, index) => (
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
                startY={startY}
                scrollDirection={scrollDirection}
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
