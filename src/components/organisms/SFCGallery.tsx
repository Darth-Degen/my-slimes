import {
  Dispatch,
  SetStateAction,
  FC,
  useState,
  useRef,
  useEffect,
} from "react";
import { SFCGalleryItem, GalleryArrowButton } from "@components";
import { SFC } from "@types";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { fastExitAnimation, sfc } from "@constants";
import { useScrollDirection, useWindowSize } from "@hooks";

interface Props {}
const SFCGallery: FC<Props> = (props: Props) => {
  const {} = props;

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [gallery, setGallery] = useState<SFC[]>(sfc);
  const [scrollValue, setScrollValue] = useState<number>(0);

  const [winWidth, winHeight] = useWindowSize();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);
  const scrollDirection = useScrollDirection();

  // useEffect(() => {
  //   console.log("isInView ", isInView);
  // }, [isInView]);

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
    if (currentIndex < gallery.length - 1) {
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
  }, [currentIndex, scrollDistance, winWidth]);

  return (
    <div className="w-full h-screen flex flex-col items-center" ref={ref}>
      <h3 className="sticky top-[8%] lg:top-[5%] font-primary text-7xl 2xl:text-8xl max-w-[500px] 2xl:max-w-[600px] text-center">
        Slimes Family Collection
      </h3>
      <motion.div
        className="sticky top-[8%] lg:top-[20%] 4xl:top-1/4 flex items-center z-10"
        key="gallery"
        {...fastExitAnimation}
      >
        <GalleryArrowButton
          direction="left"
          onClick={handlePrev}
          disabled={currentIndex === 0}
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
            {gallery.map((sfc, index) => (
              <SFCGalleryItem
                item={sfc}
                key={sfc.name + index}
                parentRef={ref}
                index={index}
                scrollDirection={scrollDirection}
                // setIsFixed={setIsFixed}
                // isFixed={isFixed}
                // setDidHover={setDidChildHover}
                // startY={startY}
              />
            ))}
          </motion.div>
        </div>
        <GalleryArrowButton
          direction="right"
          onClick={handleNext}
          // disabled={!isFixed}
          className="z-10 w-16 hidden md:flex"
        />
      </motion.div>
    </div>
  );
};

export default SFCGallery;
