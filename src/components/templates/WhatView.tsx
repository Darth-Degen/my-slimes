import {
  Dispatch,
  FC,
  MutableRefObject,
  SetStateAction,
  useRef,
  useState,
  forwardRef,
  HTMLAttributes,
  ReactNode,
} from "react";
import {
  MotionValue,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { TextScroll } from "@components";
import Image from "next/image";
import { useWindowSize } from "@hooks";
import { whatContent } from "@constants";
interface Props {
  setAssets?: Dispatch<SetStateAction<boolean[]>>;
}
const WhatView: FC<Props> = (props: Props) => {
  const { setAssets } = props;

  const [isSticky, setIsSticky] = useState(false);

  const [winWidth, winHeight] = useWindowSize();

  const height = 2805 / 4; //701.25
  const width = 1826 / 4; //456.5

  const ref = useRef(null);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const imgRef1 = useRef(null);
  const imgRef2 = useRef(null);
  const imgRef3 = useRef(null);

  const { scrollYProgress, scrollY } = useScroll({
    target: ref,
  });
  const stickyPosition = useTransform(scrollY, (value) =>
    value >= winHeight ? "sticky" : ""
  );

  useMotionValueEvent(stickyPosition, "change", (latest) => {
    if (latest === "sticky") {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  });

  const getRef = (index: number): MutableRefObject<null> => {
    return index === 0 ? ref1 : index === 1 ? ref2 : ref3;
  };

  const getImgRef = (index: number): MutableRefObject<null> => {
    return index === 0 ? imgRef1 : index === 1 ? imgRef2 : imgRef3;
  };

  const getTopPosition = (index: number): number => {
    let _base = 200;
    if (winHeight > 900) _base = 260;
    else if (winHeight > 600 && winWidth >= 1024) _base = 210;
    else if (winHeight > 600) _base = 190;
    // console.log("base ", _base, winHeight);
    return index * _base;
  };

  return (
    <div
      className="relative flex flex-col lg:flex-row items-center lg:items-start lg:justify-center gap-10 2xl:gap-20 w-full p-8 pt-14 lg:p-10"
      id="what"
      ref={ref}
    >
      <div className="relative">
        {/* <div
          className="hidden absolute lg:block top-0 bottom-0 left-0 right-0 bg-red-600 overflow-hidden"
          style={{ zIndex: 1, top: height }}
        >
          <div
            className="bg-red-500 sticky top-[6%] xl:top-[10%] z-20"
            style={{ height, width }}
          ></div>
        </div> */}
        <div className="hidden lg:block h-full bg-custom-primary z-0 ">
          {whatContent.map((item, index) => {
            return (
              <ImageAnimation
                imgRef={getImgRef(index)}
                topPosition={0}
                key={index}
                startTopPosition={index * 200}
                index={index}
              >
                <Image
                  src={`/images/landing/${item.src}`}
                  height={height}
                  width={width}
                  alt={item.title}
                  key={index}
                />
              </ImageAnimation>
            );
          })}
          <div className="pb-[600px]" />
        </div>
      </div>
      <div className="sticky flex flex-col justify-around items-start gap-32">
        {whatContent.map((item, index) => (
          <TextScroll
            content={item}
            key={item.title}
            topPosition={getTopPosition(index)}
            divRef={getRef(index)}
          />
        ))}
        <div className="pb-[600px] lg:pb-[1100px]" />
      </div>
    </div>
  );
};

interface ImageProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  imgRef: React.RefObject<HTMLDivElement>;
  topPosition: number;
  startTopPosition: number;
  index: number;
}
const ImageAnimation: FC<ImageProps> = forwardRef<HTMLDivElement, ImageProps>(
  function Child(props: ImageProps, ref) {
    const {
      children,
      imgRef,
      topPosition,
      startTopPosition,
      index,
      className,
    } = props;

    const { scrollYProgress, scrollY } = useScroll({
      target: imgRef,
    });

    const y: MotionValue<number> = useTransform(
      scrollY,
      [startTopPosition, 600],
      [800, topPosition]
    );
    const opacity: MotionValue<number> = useTransform(
      scrollYProgress,
      [1, 0],
      [index === 0 ? 1 : 0, 1]
    );
    const imageScale = useTransform(scrollYProgress, [0.5, 1], [1, 0]);
    const imageClip = useTransform(
      scrollYProgress,
      [0, 0.5, 1],
      ["0%, 100%", "0%, 50%", "0%, 0%"]
    );
    const clipPath = useTransform(
      scrollY,
      [0, 400],
      [
        "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%)",
      ]
    );

    // useMotionValueEvent(scrollYProgress, "change", (latest) => {
    //   console.log("scrollYProgress ", latest);
    // });

    return (
      <motion.div
        className={`sticky top-[6%] xl:top-[10%] ${className} `}
        style={{
          y,
          // opacity,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          position: "sticky",
          // scale: imageScale,
          clipPath,
        }}
        ref={imgRef}
      >
        {children}
      </motion.div>
    );
  }
);

export default WhatView;
