import {
  ViewContext,
  exitAnimation,
  midExitAnimation,
  fastExitAnimation,
} from "@constants";
import { AnimatePresence, motion, useInView, useScroll } from "framer-motion";
import {
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useWindowSize } from "@hooks";

interface Assets {
  src: string;
}
const _assets: Assets[] = [
  {
    src: `${process.env.NEXT_PUBLIC_CDN_URL}/videos/desktop_intro.mp4`,
  },
  {
    src: `${process.env.NEXT_PUBLIC_CDN_URL}/videos/desktop_loop.mp4`,
  },
  {
    src: `${process.env.NEXT_PUBLIC_CDN_URL}/videos/mobile_intro.MP4`,
  },
  {
    src: `${process.env.NEXT_PUBLIC_CDN_URL}/videos/mobile_loop.MP4`,
  },
];

interface Props {
  setAssets?: Dispatch<SetStateAction<boolean[]>>;
  setIsInView: Dispatch<SetStateAction<boolean>>;
  id: string;
  setCurrentPage: Dispatch<SetStateAction<string>>;
  showLoop: boolean;
  setShowLoop: Dispatch<SetStateAction<boolean>>;
}

const LandingView: FC<Props> = (props: Props) => {
  const { setAssets, setIsInView, id, setCurrentPage, showLoop, setShowLoop } =
    props;
  const [winWidth] = useWindowSize();
  const mobileView = winWidth <= 1024;
  //refs
  const scrollRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLVideoElement>(null);
  const loopRef = useRef<HTMLVideoElement>(null);
  const introRefMobile = useRef<HTMLVideoElement>(null);
  const loopRefMobile = useRef<HTMLVideoElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(scrollRef);
  const isChildInView = useInView(innerRef);

  //auto scroll
  useEffect(() => {
    if (isChildInView) setCurrentPage(id);
  }, [id, isChildInView, setCurrentPage]);

  // useEffect(() => {
  //   if (mobileView) {
  //     setShowLoop(true);
  //   }
  // }, [mobileView, setShowLoop]);

  useEffect(() => {
    setIsInView(isInView);
  }, [isInView, setIsInView]);

  useEffect(() => {
    if (showLoop && loopRef.current && introRef.current) {
      loopRef.current.play();
      introRef.current.pause();
    } else {
      console.log("wtf");
    }
    if (showLoop && loopRefMobile.current && introRefMobile.current) {
      loopRefMobile.current.play();
      introRefMobile.current.pause();
    }
  }, [showLoop]);

  return (
    <motion.div
      id={id}
      key="landing"
      className={`relative w-full ${mobileView ? "h-[82vh]" : "h-screen"} 
      flex flex-col items-center justify-end`}
      {...exitAnimation}
      ref={scrollRef}
    >
      {/* desktop */}
      <motion.video
        ref={introRef}
        autoPlay
        muted
        playsInline
        key="intro desktop"
        className={`${
          mobileView && "hidden"
        } h-full w-screen absolute inset-0 -z-10 ${
          !showLoop ? "visible" : "invisible"
        }`}
        style={{ objectFit: "cover" }}
        onLoadedData={() => {
          setAssets && setAssets((prevState) => [true, ...prevState.slice(1)]);
        }}
        onEnded={() => {
          setShowLoop(true);
        }}
        {...exitAnimation}
      >
        <source src={_assets[0].src} type="video/mp4" />
      </motion.video>
      <motion.video
        ref={loopRef}
        muted
        playsInline
        key="loop desktop"
        loop
        className={`${
          mobileView && "hidden"
        } h-full w-screen absolute inset-0 -z-20 ${
          showLoop ? "visible" : "invisible"
        }`}
        style={{ objectFit: "cover" }}
        onLoadedData={() => {
          setAssets &&
            setAssets((prevState) => [
              ...prevState.slice(0, 0),
              true,
              ...prevState.slice(2),
            ]);
        }}
      >
        <source src={_assets[1].src} type="video/mp4" />
      </motion.video>

      {/* mobile */}
      <AnimatePresence mode="wait">
        {!showLoop && (
          <motion.video
            ref={introRefMobile}
            muted
            autoPlay
            playsInline
            key="intro-mobile"
            className={`${
              !mobileView && "hidden"
            } md:pt-16 h-3/4 w-screen absolute overflow-visible inset-x-0 top-[55%] transform -translate-y-1/2 -z-10 max-w-[600px] mx-auto ${
              !showLoop ? "visible" : "invisible"
            }`}
            style={{ objectFit: "cover" }}
            onLoadedData={() => {
              setAssets &&
                setAssets((prevState) => [
                  ...prevState.slice(0, 1),
                  true,
                  ...prevState.slice(3),
                ]);
            }}
            onEnded={() => setShowLoop(true)}
            {...exitAnimation}
          >
            <source src={_assets[2].src} type="video/mp4" />
          </motion.video>
        )}
      </AnimatePresence>
      <motion.video
        ref={loopRefMobile}
        muted
        playsInline
        key="loop-mobile"
        loop
        className={`${
          !mobileView && "hidden"
        } h-3/4 w-screen absolute overflow-visible inset-x-0 top-[55%] transform -translate-y-1/2 -z-20 max-w-[600px] mx-auto ${
          showLoop ? "visible" : "invisible"
        }`}
        style={{ objectFit: "cover" }}
        onLoadedData={() => {
          setAssets &&
            setAssets((prevState) => [
              ...prevState.slice(0, 2),
              true,
              ...prevState.slice(4),
            ]);
        }}
        // {...exitAnimation}
      >
        <source src={_assets[3].src} type="video/mp4" />
      </motion.video>

      {!mobileView && (
        <>
          <div
            className="uppercase font-black text-lg pb-6 3xl:pb-20"
            ref={innerRef}
          >
            scroll
          </div>
          <div className="hidden lg:flex justify-between w-full pb-4 px-4 sm:px-6">
            <div className="w-1/3 uppercase">the whole squad here</div>
            <div className="w-1/3 uppercase flex justify-center">and</div>
            <div className="w-1/3 uppercase flex justify-end">
              everybody eats
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default LandingView;
