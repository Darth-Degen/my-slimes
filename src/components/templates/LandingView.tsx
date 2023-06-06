import { exitAnimation } from "@constants";
import { AnimatePresence, motion, useInView, useScroll } from "framer-motion";
import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { useWindowSize } from "@hooks";
// import debounce from "lodash.debounce";

interface Assets {
  src: string;
}
const _assets: Assets[] = [
  {
    src: "/videos/loading-intro.mp4",
  },
  {
    src: "/videos/loading-loop.mp4",
  },
];

interface Props {
  setAssets?: Dispatch<SetStateAction<boolean[]>>;
  setIsInView: Dispatch<SetStateAction<boolean>>;
}

const LandingView: FC<Props> = (props: Props) => {
  const { setAssets, setIsInView } = props;

  const [showLoop, setShowLoop] = useState<boolean>(false);

  const [winWidth, winHeight] = useWindowSize();
  const { scrollY, scrollYProgress } = useScroll();
  const scrollRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLVideoElement>(null);
  const loopRef = useRef<HTMLVideoElement>(null);

  // const debouncer = debounce((value) => setShowLoop(value), 60);
  // const y = useTransform(scrollY, [0, 400], [0, -400]);
  // const y2 = useTransform(scrollY, [0, 150], [0, -150]);
  // const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const isInView = useInView(scrollRef);

  useEffect(() => {
    setIsInView(isInView);
  }, [isInView, setIsInView]);

  // useEffect(() => {
  //   return () => {
  //     debouncer.cancel();
  //   };
  // }, [debouncer]);

  useEffect(() => {
    console.log("Landing VIEWE");
  }, []);

  useEffect(() => {
    if (showLoop && loopRef.current && introRef.current) {
      loopRef.current.play();
      introRef.current.pause();
    }
  }, [showLoop]);

  return (
    <motion.div
      id="landing"
      key="landing"
      className="relative w-full h-screen flex flex-col items-center justify-end"
      {...exitAnimation}
      ref={scrollRef}
    >
      {/* graphics */}
      {/* <div className="absolute left-1/2 top-[46%] transform -translate-x-1/2 -translate-y-1/2 z-10">
        <FlowerVector className="w-[280px] h-[280px] md:w-[380px] md:h-[380px] absolute left-1/2 top-[46%] transform -translate-x-1/2 -translate-y-1/2" />
        <CrackVector className="w-[340px] h-[340px] md:w-[520px] md:h-[520px] absolute left-1/2 top-[46%] transform -translate-x-1/2 -translate-y-1/2" />
        <PaddleVector className="w-[420px] h-[420px] md:w-[560px] md:h-[560px] absolute left-1/2 top-[46%] transform -translate-x-1/2 -translate-y-1/2" />
      </div> */}
      {/* <div className="w-[80px] h-[3px] z-10 bg-shadow shadow-circular mb-20 lg:mb-12 rounded-full lg:absolute lg:left-1/2 lg:top-[83%] 3xl:top-[79%] lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2"></div> */}

      {/* <AnimatePresence mode="wait">
        {!showLoop && ( */}
      <motion.video
        ref={introRef}
        autoPlay
        muted
        playsInline
        key="intro"
        className={`h-screen w-screen absolute inset-0 -z-10 ${
          !showLoop ? "visible" : "invisible"
        }`}
        style={{ objectFit: "cover" }}
        onLoadedData={() => {
          console.log("onLoadedData 1");
          setAssets &&
            setAssets((prevState) => [
              ...prevState.slice(0, 0),
              true,
              ...prevState.slice(0 + 1),
            ]);
        }}
        onEnded={() => setShowLoop(true)}
        {...exitAnimation}
      >
        <source src={_assets[0].src} type="video/mp4" />
      </motion.video>
      {/* )}
      </AnimatePresence> */}

      <motion.video
        // autoPlay
        ref={loopRef}
        muted
        playsInline
        loop
        className={`h-screen w-screen absolute inset-0 -z-10 ${
          showLoop ? "visible" : "invisible"
        }`}
        style={{ objectFit: "cover" }}
        onLoadedData={() => {
          console.log("onLoadedData 2");
          setAssets &&
            setAssets((prevState) => [
              ...prevState.slice(0, 1),
              true,
              ...prevState.slice(1 + 1),
            ]);
        }}
        // onEnded={() => onVideoEnded(id)}
        // {...exitAnimation}
      >
        <source src={_assets[1].src} type="video/mp4" />
      </motion.video>

      {/* <motion.video 
        key={`bg-${id}`}
        loop={loop} 
        onLoadedData={() => onLoadData(id)}
        onEnded={() => onVideoEnd(id)}
        id={`vid-${id}` }
        className={styles}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }} 
      >
        <source src={src} type="video/mp4"/>  
      </motion.video>     */}

      {/* <video
        className={`h-screen w-screen absolute inset-0 -z-10`}
        autoPlay
        muted
        style={{ objectFit: "cover" }}
      >
        <source src={_assets[1].src} type="video/mp4" />
      </video> */}

      <div className="uppercase font-black text-lg pb-6 3xl:pb-20">scroll</div>
      <div className="hidden lg:flex justify-between w-full pb-4 px-4 sm:px-6">
        <div className="w-1/3 uppercase">the whole squad here</div>
        <div className="w-1/3 uppercase flex justify-center">and</div>
        <div className="w-1/3 uppercase flex justify-end">everybody eats</div>
      </div>
    </motion.div>
  );
};

export default LandingView;
