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
import { useScrollDirection, useWindowSize } from "@hooks";

interface GProps {
  collections: Collection[];
  parentRef: React.RefObject<HTMLDivElement>;
  isFixed: boolean;
  setIsFixed: Dispatch<SetStateAction<boolean>>;
}
const Gallery: FC<GProps> = (props: GProps) => {
  const { collections, parentRef, isFixed, setIsFixed } = props;

  const [gallery, setGallery] = useState<Collection[]>(collections);

  const [scrollValue, setScrollValue] = useState<number>(0);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFirstInView, setIsFirstInView] = useState<boolean>(false);
  const [isLastInView, setIsLastInView] = useState<boolean>(false);
  const [didChildHover, setDidChildHover] = useState<boolean>(false);
  const [startY, setStartY] = useState<number>();

  const isInView = useInView(parentRef);
  const scrollDirection = useScrollDirection();

  const [winWidth, winHeight] = useWindowSize();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll({
    target: ref,
  });

  //scroll direction
  // const [scrollDirection, setScrollDirection] = useState("down");
  // const prevScrollY = useRef<number>(0);
  // useEffect(() => {
  //   if (isInView) {
  //     setScrollDirection(scrollY.get() > prevScrollY.current ? "down" : "up");
  //   }
  //   prevScrollY.current = scrollY.get();
  // }, [isInView, scrollY]);

  //returns width of closed image in GalleryItem
  const imageWidth = (): number => {
    if (winWidth > 3000) return 160 + 20; //image width + gap
    else if (winWidth > 2000) return 130 + 20;
    return 100 + 12;
  };
  //scrolls x images per click
  const scrollDistance: number = imageWidth() * -4;
  const imagesPerScroll = Math.abs(scrollDistance / imageWidth());
  const scope = currentIndex * imagesPerScroll;

  //back clicked
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  //next clicked
  const handleNext = () => {
    if (currentIndex < gallery.length - 1 && !isLastInView) {
      setCurrentIndex(currentIndex + 1);
      setGallery((prevState) => [
        ...prevState,
        ...prevState.slice(scope, scope + imagesPerScroll),
      ]);
    }
  };
  //set scroll distance on click
  useEffect(() => {
    setScrollValue(currentIndex * scrollDistance);
  }, [collections.length, currentIndex, scrollDistance, winWidth]);

  // const paginatedCollection = (): Collection[] => {
  //   return collections;
  // };

  // const scrollXRef = useRef<number>(0);
  // const inViewRef = useRef<number[]>([]);
  // const [inViewState, setInViewState] = useState<number[]>([]);
  //first or last child enters view
  // const handleIsInView = (index: number) => {
  //   // console.log("handleIsInView ", index);
  //   //list of all indexes in view
  //   //1. add index if in view
  //   // setInViewState((prevState) => [...prevState, index]);
  //   // console.log("inViewState ", inViewState);
  //   // inViewRef.current.push(index);
  //   // console.log("inViewRef ", inViewRef.current);
  //   //2. get length
  //   //3. remove opposite index if exceeds length
  //   // //scrolling right
  //   // if (index > scrollXRef.current) setGallery((prevState => [...prevState, galler ]))
  //   // scrollXRef.current = index
  //   // //TODO: fix logic to show when track pad scrolls
  //   // if (index === 0) setIsFirstInView(true);
  //   // else setIsFirstInView(false);
  //   // if (index === collections.length - 1) setIsLastInView(true);
  //   // else setIsLastInView(false);
  // };

  useEffect(() => {
    if (isInView) setStartY(scrollY.get());
    // else if (isInView && scrollDirection === "up") setStartY(0);
  }, [isInView, scrollY]);

  return (
    <motion.div
      className="sticky top-0 md:top-[8%] lg:top-[20%] 4xl:top-1/4 flex items-center z-10"
      key="gallery"
      {...fastExitAnimation}
    >
      <GalleryArrowButton
        direction="left"
        onClick={handlePrev}
        // disabled={currentIndex === 0}
        disabled={!isFixed || currentIndex === 0}
        // disabled={(!isFixed || currentIndex === 0) && !isFirstInView}
        className="z-10 w-16 hidden md:flex"
      />
      {/* <div className="flex items-center overflow-x-scroll overflow-y-hidden"> */}
      <div className="flex items-center overflow-x-hidden overflow-y-hidden">
        <motion.div
          className="relative flex gap-3 3xl:gap-5 pt-32 pb-20  px-4 md:px-0"
          initial={{ x: 0 }}
          animate={{ x: scrollValue }}
          transition={{ duration: 0.5 }}
          ref={ref}
        >
          {startY &&
            gallery.map((slime, index) => (
              <GalleryItem
                item={slime}
                key={slime.name + index}
                parentRef={parentRef}
                index={index}
                setIsFixed={setIsFixed}
                isFixed={isFixed}
                // handleIsInView={handleIsInView}
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
        // disabled={!isFixed || isLastInView}
        disabled={!isFixed}
        className="z-10 w-16 hidden md:flex"
      />
    </motion.div>
  );
};

export default Gallery;
