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
  useEffect,
} from "react";
import {
  MotionValue,
  motion,
  useInView,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { TextScroll } from "@components";
import Image from "next/image";
import { useWindowSize } from "@hooks";
import { slideUp, whatContent } from "@constants";
interface Props {
  setAssets?: Dispatch<SetStateAction<boolean[]>>;
  id: string;
  setCurrentPage: Dispatch<SetStateAction<string>>;
}
const WhatView: FC<Props> = (props: Props) => {
  const { setAssets, id, setCurrentPage } = props;

  // const [isSticky, setIsSticky] = useState(false);

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

  const isInView = useInView(ref);
  //auto scroll
  useEffect(() => {
    if (isInView) setCurrentPage(id);
  }, [id, isInView, setCurrentPage]);

  // const { scrollYProgress, scrollY } = useScroll({
  //   target: ref,
  // });
  // const stickyPosition = useTransform(scrollY, (value) =>
  //   value >= winHeight ? "sticky" : ""
  // );

  // useMotionValueEvent(stickyPosition, "change", (latest) => {
  //   if (latest === "sticky") {
  //     setIsSticky(true);
  //   } else {
  //     setIsSticky(false);
  //   }
  // });

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

    return index * _base;
  };

  // const animate = () => {
  //   return slideUp(isInView, 200, 0.5);
  // };

  return (
    <div
      className="relative flex flex-col lg:flex-row items-center lg:items-start lg:justify-center bg-custom-primary gap-10 2xl:gap-20 w-full p-8 pt-14 lg:p-10"
      id={id}
      ref={ref}
    >
      <motion.div
        className="relative"
        // {...animate()}
      >
        <div className="hidden lg:block h-full  z-0 ">
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
                  priority
                  onLoadingComplete={() => {
                    // console.log(`- what ${index + 1}`);
                    setAssets &&
                      setAssets((prevState) => [
                        ...prevState.slice(0, index),
                        true,
                        ...prevState.slice(index + 1),
                      ]);
                  }}
                />
              </ImageAnimation>
            );
          })}
          <div className="pb-[2100px] 3xl:pb-[2500px]" />
        </div>
      </motion.div>

      <motion.div
        className="sticky flex flex-col justify-around items-start gap-32"
        // {...animate()}
      >
        {whatContent.map((item, index) => (
          <TextScroll
            content={item}
            key={item.title}
            topPosition={getTopPosition(index)}
            divRef={getRef(index)}
            index={index}
          />
        ))}
        <div className="pb-[2700px] 3xl:pb-[3000px]" />
      </motion.div>
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

    // const y: MotionValue<number> = useTransform(
    //   scrollY,
    //   [startTopPosition, 3000],
    //   [1000, topPosition]
    // );

    const [winWidth, winHeight] = useWindowSize();
    const is3XL = winWidth >= 2160;
    const startY = winHeight * 2;
    const y: MotionValue<number> = useTransform(
      scrollY,
      [
        startY - (is3XL ? winHeight * 2 : winHeight),
        startY +
          winHeight +
          index * (is3XL ? winHeight * 0.5 : winHeight) +
          index * 500,
      ],
      [startY, topPosition]
    );

    // const opacity: MotionValue<number> = useTransform(
    //   scrollYProgress,
    //   [1, 0],
    //   [index === 0 ? 1 : 0, 1]
    // );
    // const imageScale = useTransform(scrollYProgress, [0.5, 1], [1, 0]);
    // const imageClip = useTransform(
    //   scrollYProgress,
    //   [0, 0.5, 1],
    //   ["0%, 100%", "0%, 50%", "0%, 0%"]
    // );
    // const clipPath = useTransform(
    //   scrollY,
    //   [0, 400],
    //   [
    //     "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    //     "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%)",
    //   ]
    // );

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
          // clipPath,
        }}
        ref={imgRef}
      >
        {children}
      </motion.div>
    );
  }
);

export default WhatView;
