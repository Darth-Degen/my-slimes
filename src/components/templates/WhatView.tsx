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
import { useWindowSize, useScrollDirection } from "@hooks";
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

  const height = 2805 / 3.69; //701.25
  const width = 1826 / 3.69; //456.5

  const ref = useRef(null);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const imgRef1 = useRef(null);
  const imgRef2 = useRef(null);
  const imgRef3 = useRef(null);

  const scrollDirection = useScrollDirection();
  const isInView = useInView(ref);
  // const didViewRef = useRef<boolean>(false);
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

  const animate = () => {
    // return slideUp(isInView && scrollDirection === "down", 500, 1, 0.5);
    return slideUp(isInView, 1000, 1.25, 0.5);
  };

  // useEffect(() => {
  //   if (isInView) didViewRef.current = true;
  // }, [isInView]);

  //one time animation
  const animateRef = useRef<number>(0);
  useEffect(() => {
    if (isInView) animateRef.current += 1;
  }, [isInView]);

  return (
    <div
      className="relative flex flex-col lg:flex-row items-center lg:items-start lg:justify-center bg-custom-primary gap-10 2xl:gap-20 w-full p-8 pt-14 lg:p-10"
      id={id}
      ref={ref}
    >
      {animateRef.current > 1 ? (
        <div className="top-[5%] 2xl:top-[10%] flex flex-col lg:flex-row items-center lg:items-start lg:justify-center bg-custom-primary gap-10 2xl:gap-20 w-full p-8 pt-14">
          <div className="hidden lg:block h-full z-0 top-[4%] 2xl:top-[10%]">
            <Image
              src={`${process.env.NEXT_PUBLIC_CDN_URL}/images/landing/${whatContent[2].src}`}
              height={height}
              width={width}
              alt={whatContent[2].title}
              priority
            />
          </div>
          <div className="flex flex-col justify-around items-start gap-6 xl:gap-10 top-[5%] 2xl:top-[10%] pt-20 2xl:pt-0">
            {whatContent.map((item, index) => (
              <div
                key={index}
                className={`flex flex-col gap-4 items-center lg:items-start `}
              >
                <p className="text-xl sm:text-3xl lg:text-6xl 2xl:text-9xl 3xl:text-[10rem] 4xl:text-[12rem] font-black uppercase">
                  {item.title}
                </p>
                <div className="text-xs xl:text-sm flex flex-col md:flex-row items-center gap-4 lg:gap-10 lg:ml-6 pt-2">
                  <p className="w-auto max-w-[800px]">{item.textOne}</p>
                </div>
              </div>
            ))}
          </div>
          {/* <div className="pb-[1000px]" /> */}
        </div>
      ) : (
        <>
          <motion.div className="relative" {...animate()}>
            <div className="hidden lg:block h-full z-0 ">
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
                      src={`${process.env.NEXT_PUBLIC_CDN_URL}/images/landing/${item.src}`}
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
              {/* <div className="pb-[2950px] 3xl:pb-[3900px]" /> */}
              <div className="pb-[1000px]" />
            </div>
          </motion.div>

          <motion.div
            className="sticky flex flex-col justify-around items-start gap-32"
            {...animate()}
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
            {/* <div className="pb-[3500px] 3xl:pb-[4400px]" /> */}
            <div className="pb-[1600px]" />
          </motion.div>
        </>
      )}
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

    const { scrollY } = useScroll({
      target: imgRef,
    });

    // const y: MotionValue<number> = useTransform(
    //   scrollY,
    //   [startTopPosition, 3000],
    //   [1000, topPosition]
    // );

    const [winWidth, winHeight] = useWindowSize();
    const is3XL = winWidth >= 2160;
    const startY = winHeight * 1.4;
    const y: MotionValue<number> = useTransform(
      scrollY,
      [
        startY - (is3XL ? winHeight * 1.1 : winHeight),
        startY +
          winHeight +
          index * (is3XL ? winHeight * 0.75 : winHeight) +
          index * (index === 0 ? 800 : index === 1 ? -200 : -200),
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
        className={`hidden xl:block sticky top-[8%] 2xl:top-[10%] ${className} `}
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
