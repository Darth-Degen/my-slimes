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
import { motion, useInView, useScroll } from "framer-motion";
import { useScrollDirection, useWindowSize } from "@hooks";

interface GProps {
  collections: Collection[];
  parentRef: React.RefObject<HTMLDivElement>;
  isFixed: boolean;
  setIsFixed: Dispatch<SetStateAction<boolean>>;
  isParentInView: boolean;
  animateRefValue: number;
}
const Gallery: FC<GProps> = (props: GProps) => {
  const {
    collections,
    parentRef,
    isFixed,
    setIsFixed,
    isParentInView,
    animateRefValue,
  } = props;

  const [gallery, setGallery] = useState<Collection[]>(collections);

  const [scrollValue, setScrollValue] = useState<number>(0);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFirstInView, setIsFirstInView] = useState<boolean>(false);
  const [isLastInView, setIsLastInView] = useState<boolean>(false);
  const [didChildHover, setDidChildHover] = useState<boolean>(false);
  const [startY, setStartY] = useState<number>();
  const [renderChildren, setRenderChildren] = useState(false);

  const delayTimeoutRef = useRef<NodeJS.Timeout>();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(parentRef);
  const isSelfInView = useInView(ref);
  const scrollDirection = useScrollDirection();

  const [winWidth, winHeight] = useWindowSize();

  const { scrollY } = useScroll({
    target: ref,
  });

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

  useEffect(() => {
    if (isInView) setStartY(scrollY.get());
    // else if (isInView && scrollDirection === "up") setStartY(0);
  }, [isInView, scrollY]);

  // Delay rendering of children until the component is mounted
  useEffect(() => {
    // console.log("isSelfInView", isSelfInView);
    // console.log("animateRefValue", animateRefValue);
    if (isSelfInView) {
      delayTimeoutRef.current = setTimeout(() => {
        setRenderChildren(true);
      }, 1000); // Adjust the delay as needed
    }

    return () => {
      // Clear the timeout when the component is unmounted or open changes
      setRenderChildren(false);
      if (delayTimeoutRef.current) {
        clearTimeout(delayTimeoutRef.current);
      }
    };
  }, [isSelfInView]);

  const containerVariants = {
    hidden: {
      opacity: animateRefValue < 1 ? 0 : 1,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.4,
        staggerChildren: 0.15,
        when: "beforeChildren", // Ensure children wait for parent's delay
      },
    },
  };
  const childVariants = {
    hidden: {
      opacity: animateRefValue < 1 ? 0 : 1,
      x: 0,
    }, // Starting position outside the container
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5, // Duration of the animation
      },
    },
  };
  return (
    <motion.div
      className="sticky top-0 md:top-[8%] lg:top-[20%] 4xl:top-1/4 flex items-center z-10"
      key="gallery"
    >
      <GalleryArrowButton
        direction="left"
        onClick={handlePrev}
        disabled={!isFixed || currentIndex === 0}
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
            className="relative flex gap-3 3xl:gap-5  pt-0 pb-20  px-4 md:px-0"
            variants={containerVariants}
            initial="hidden"
            animate={renderChildren ? "visible" : "hidden"}
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
                  setDidHover={setDidChildHover}
                  startY={startY}
                  scrollDirection={scrollDirection}
                  animateRefValue={animateRefValue}
                  //@ts-ignore
                  variant={childVariants}
                />
              ))}
          </motion.div>
        </motion.div>
      </div>
      <GalleryArrowButton
        direction="right"
        onClick={handleNext}
        disabled={!isFixed}
        className="z-10 w-16 hidden md:flex"
      />
    </motion.div>
  );
};

export default Gallery;
