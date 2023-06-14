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
import { fastExitAnimation, sfc, slideUp, opacity } from "@constants";
import { useScrollDirection, useWindowSize } from "@hooks";

interface Props {}
const SFCGallery: FC<Props> = (props: Props) => {
  const {} = props;
  //state
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [gallery, setGallery] = useState<SFC[]>(sfc);
  const [scrollValue, setScrollValue] = useState<number>(0);
  //refs
  const ref = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const didAnimateRef = useRef<boolean>();
  //hooks
  const isInView = useInView(ref);
  const headerIsInView = useInView(headerRef);
  const galleryIsInView = useInView(galleryRef);
  const [winWidth, winHeight] = useWindowSize();
  const scrollDirection = useScrollDirection();

  //returns width of closed image in GalleryItem
  const imageWidth = (): number => {
    if (winWidth > 3000) return 300 + 20; //image width + gap
    else if (winWidth > 2000) return 300 + 20;
    return 300 + 20;
  };

  //scrolls x images per click
  const scrollDistance: number = imageWidth() * -2;
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

  useEffect(() => {
    if (headerIsInView) didAnimateRef.current = true;
  }, [headerIsInView]);

  // useEffect(() => {
  //   console.log("scrollDirection down", scrollDirection === "down");
  // }, [scrollDirection]);

  return (
    <div
      className="sticky top-[12%] w-full h-screen flex flex-col items-center gap-6"
      ref={ref}
      id="friends"
    >
      <motion.h3
        className="font-primary text-7xl 2xl:text-8xl max-w-[500px] 2xl:max-w-[600px] text-center"
        ref={headerRef}
        // {...opacity(
        //   headerIsInView && scrollDirection === "down",
        //   scrollDirection === "down" ? 0 : 1,
        //   1
        // )}
      >
        Slimes Family Collection
      </motion.h3>
      <motion.div
        className="w-screen flex justify-between items-center z-20"
        key="gallery"
        ref={ref}
        {...opacity(
          headerIsInView && scrollDirection === "down", //(!didAnimateRef.current),
          didAnimateRef.current ? 1 : 0,
          1
        )}
      >
        <GalleryArrowButton
          direction="left"
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="z-10 w-16 hidden md:flex"
        />
        <div className="flex items-center overflow-x-hidden overflow-y-hidden">
          <motion.div
            className="relative flex gap-5 py-10 px-4 md:px-0"
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
      <div className="pb-[2400px] 3xl:pb-[900px]" />
    </div>
  );
};

export default SFCGallery;
