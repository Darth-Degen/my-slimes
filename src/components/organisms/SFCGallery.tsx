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
import {
  AnimatePresence,
  motion,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  fastExitAnimation,
  sfc,
  slideUp,
  opacity,
  midExitAnimation,
} from "@constants";
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

  //one time animation
  const animateRef = useRef<number>(0);
  useEffect(() => {
    // console.log("isInView ", isInView, animateRef.current);
    if (isInView) animateRef.current += 1;
  }, [isInView]);

  const text = "Meet the family";
  const containerVariants = {
    hidden: {
      opacity: animateRef.current < 1 ? 0 : 1,
      // opacity: 0,
      // x: -150
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        staggerChildren: 0.1, // Delay between staggered children
        duration: 1,
      },
    },
  };

  const letterVariants = {
    hidden: {
      opacity: animateRef.current < 1 ? 0 : 1,
      // opacity: 0,
      // x: -150,
    }, // Starting position outside the container
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5, // Duration of the animation
      },
    },
  };
  const galleryVariants = {
    hidden: {
      opacity: animateRef.current < 2 ? 0 : 1,
      // opacity: 0,
      // x: -150
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        staggerChildren: 0.35, // Delay between staggered children
        duration: 1,
      },
    },
  };
  const imageVariants = {
    hidden: {
      opacity: animateRef.current < 2 ? 0 : 1,
      // opacity: 0,
      // x: -150,
    }, // Starting position outside the container
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5, // Duration of the animation
      },
    },
  };

  return (
    <motion.div
      className="sticky top-[8%] w-full h-screen flex flex-col items-center gap-0"
      ref={ref}
      key="sfcgall"
      {...midExitAnimation}
    >
      <motion.div className="flex justify-center items-center">
        <div className="flex flex-col ">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="font-black px-2 responsive-text-2 whitespace-nowrap uppercase"
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
                transition={{ duration: 1, ease: "easeInOut", delay: 0.9 }}
              >
                <div className="w-1/3 uppercase">slimes</div>
                <div className="w-1/3 uppercase flex justify-center">
                  family
                </div>
                <div className="w-1/3 uppercase flex justify-end">
                  collection
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
      <motion.div
        className="w-screen flex justify-between items-center z-20"
        key="gallery"
        ref={ref}
        // {...opacity(
        //   headerIsInView && scrollDirection === "down", //(!didAnimateRef.current),
        //   didAnimateRef.current ? 1 : 0,
        //   1
        // )}
      >
        <GalleryArrowButton
          direction="left"
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="z-10 w-16 hidden md:flex"
        />
        <div className="flex items-center overflow-x-hidden overflow-y-hidden">
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: scrollValue }}
            transition={{ duration: 0.5 }}
            ref={ref}
          >
            <motion.div
              className="relative flex gap-5 pb-4 px-4 md:px-0"
              variants={galleryVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {gallery.map((sfc, index) => (
                <SFCGalleryItem
                  item={sfc}
                  key={sfc.name + index}
                  parentRef={ref}
                  index={index}
                  scrollDirection={scrollDirection}
                  //@ts-ignore
                  variant={imageVariants}
                />
              ))}
            </motion.div>
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
    </motion.div>
  );
};

export default SFCGallery;
