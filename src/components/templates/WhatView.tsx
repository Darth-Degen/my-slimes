import {
  Dispatch,
  FC,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
  forwardRef,
  HTMLAttributes,
  ReactNode,
} from "react";
import {
  MotionValue,
  motion,
  useAnimation,
  useInView,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { ImageShimmer } from "@components";
import {} from "@constants";
import Image from "next/image";
import { useWindowSize } from "@hooks";
import { useScroll as useScrollGesture } from "react-use-gesture";
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

  //is in view
  // --parent
  const inView = useInView(ref);
  // -- text
  const inView1 = useInView(ref1);
  const inView2 = useInView(ref2);
  const inView3 = useInView(ref3);
  // -- images
  const imgInView1 = useInView(imgRef1);
  const imgInView2 = useInView(imgRef2);
  const imgInView3 = useInView(imgRef3);
  //animation
  const animation1 = useAnimation();
  const animation2 = useAnimation();
  const animation3 = useAnimation();
  const animation4 = useAnimation();
  const animation5 = useAnimation();
  const animation6 = useAnimation();

  const { scrollYProgress, scrollY } = useScroll({
    target: ref,
    // offset: ["end end", "start start"],
  });
  const stickyPosition = useTransform(scrollY, (value) =>
    value >= winHeight ? "sticky" : ""
  );

  // useEffect(() => {
  //   console.log("stickyPosition ", stickyPosition);
  //   const handleStickyPositionChange = (newValue: string) => {
  //     if (newValue === "sticky") {
  //       console.log("Position is now sticky!");
  //     } else {
  //       console.log("Position is no longer sticky.");
  //     }
  //   };

  //   const unsubscribe = stickyPosition.onChange(handleStickyPositionChange);

  //   return () => unsubscribe();
  // }, [stickyPosition]);

  useMotionValueEvent(stickyPosition, "change", (latest) => {
    if (latest === "sticky") {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  });

  // const imageOffsets = [0, 200, 400]; // Set the offset for each image
  // const transform1 =  useTransform(scrollY, [0, 0 + 200], [0, 1])
  // const transform2 =  useTransform(scrollY, [200, 200 + 200], [0, 1])
  // const transform3 =  useTransform(scrollY, [400, 400 + 200], [0, 1])

  const [visibleImage, setVisibleImage] = useState(0);

  const getRef = (id: number): MutableRefObject<null> => {
    return id === 0 ? ref1 : id === 1 ? ref2 : ref3;
  };

  return (
    <div
      className="relative flex flex-col lg:flex-row items-center lg:items-start lg:justify-center gap-10 2xl:gap-20 w-full p-8 pt-14 lg:p-10"
      id="what"
      ref={ref}
    >
      <div className="flex flex-col justify-around items-start">
        {content.map((item, index) => (
          <ImageAnimation imgRef={imgRef1} topPosition={0} key={index}>
            <Image
              src={`/images/landing/${item.src}`}
              height={height}
              width={width}
              alt={item.title}
              // className={index === visibleImage ? "static" : "absolute"}
            />
          </ImageAnimation>
        ))}
      </div>
      <div className="flex flex-col justify-around items-start gap-32">
        {content.map((item, index) => (
          <TextDisplay
            content={item}
            key={item.title}
            topPosition={index * 300}
            divRef={getRef(index)}
          />
        ))}
        <div className=" pb-[1500px]" />
      </div>
    </div>
  );
};

interface ImageProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  imgRef: React.RefObject<HTMLDivElement>;
  topPosition: number;
}
const ImageAnimation: FC<ImageProps> = forwardRef<HTMLDivElement, ImageProps>(
  function Child(props: ImageProps, ref) {
    const { children, imgRef, topPosition } = props;
    const [winWidth, winHeight] = useWindowSize();
    // const imgRef = useRef(null);

    const { scrollYProgress, scrollY } = useScroll({
      target: imgRef,
    });

    const y: MotionValue<number> = useTransform(
      scrollY,
      [0, 600],
      [800, topPosition]
    );
    const opacity: MotionValue<number> = useTransform(
      scrollYProgress,
      [0, 1],
      [1, 0]
    );

    // useMotionValueEvent(scrollY, "change", (latest) => {
    //   console.log("scrollY ", latest);
    // });

    return (
      <motion.div
        className="sticky top-14 flex flex-col gap-4 items-center lg:items-start"
        style={{
          y,
          // opacity
        }}
        ref={imgRef}
      >
        {children}
      </motion.div>
    );
  }
);

// eslint-disable-next-line react/display-name
interface TextProps extends HTMLAttributes<HTMLDivElement> {
  content: Content;
  topPosition: number;
  divRef: React.RefObject<HTMLDivElement>;
}
const TextDisplay: FC<TextProps> = forwardRef<HTMLDivElement, TextProps>(
  function Child(props: TextProps, ref) {
    const { content, topPosition, divRef } = props;
    const [winWidth, winHeight] = useWindowSize();
    // const divRef = useRef(null);

    const { scrollYProgress, scrollY } = useScroll({
      target: divRef,
    });
    const opacity: MotionValue<number> = useTransform(
      scrollYProgress,
      [1, 0.3, 0],
      [0, 1, 1]
    );
    const y: MotionValue<number> = useTransform(
      scrollY,
      [0, 600],
      [800, topPosition]
    );

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
      console.log("scrollYProgress ", latest, topPosition);
    });

    return (
      <motion.div
        className="sticky top-14 flex flex-col gap-4 items-center lg:items-start"
        style={{ opacity, y }}
        ref={divRef}
      >
        <p className="text-3xl lg:text-9xl 3xl:text-[10rem] 4xl:text-[12rem] font-black uppercase">
          {content.title}
        </p>
        <div className="flex flex-col md:flex-row items-center gap-10 lg:ml-14 2xl:ml-20">
          <p className="w-64">{content.textOne}</p>
          <p className="w-64">{content.textTwo}</p>
        </div>
      </motion.div>
    );
  }
);

interface Content {
  title: string;
  src: string;
  textOne: string;
  textTwo: string;
}
const content: Content[] = [
  {
    title: "community",
    src: "community.png",
    textOne:
      "*lock scroll - jump to this block and animate before carousel activates.",
    textTwo:
      "*lock scroll - jump to this block and animate before carousel activates.",
  },
  {
    title: "culture",
    src: "culture.png",
    textOne:
      "*lock scroll - jump to this block and animate before carousel activates.",
    textTwo:
      "*lock scroll - jump to this block and animate before carousel activates.",
  },
  {
    title: "curation",
    src: "curation.png",
    textOne:
      "*lock scroll - jump to this block and animate before carousel activates.",
    textTwo:
      "*lock scroll - jump to this block and animate before carousel activates.",
  },
];

export default WhatView;
