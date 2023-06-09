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
  id: string;
  setCurrentPage: Dispatch<SetStateAction<string>>;
}

const LandingView: FC<Props> = (props: Props) => {
  const { setAssets, setIsInView, id, setCurrentPage } = props;

  const [showLoop, setShowLoop] = useState<boolean>(false);

  const [winWidth, winHeight] = useWindowSize();
  const { scrollY, scrollYProgress } = useScroll();
  //refs
  const scrollRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLVideoElement>(null);
  const loopRef = useRef<HTMLVideoElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(scrollRef);
  const isChildInView = useInView(innerRef);
  //auto scroll
  useEffect(() => {
    if (isChildInView) setCurrentPage(id);
  }, [id, isChildInView, setCurrentPage]);

  useEffect(() => {
    // console.log("landing ", isInView);
    setIsInView(isInView);
  }, [isInView, setIsInView]);

  useEffect(() => {
    if (showLoop && loopRef.current && introRef.current) {
      loopRef.current.play();
      introRef.current.pause();
    }
  }, [showLoop]);

  return (
    <motion.div
      id={id}
      key="landing"
      className="relative w-full h-screen flex flex-col items-center justify-end"
      {...exitAnimation}
      ref={scrollRef}
    >
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
          // console.log("onLoadedData 1");
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

      <motion.video
        ref={loopRef}
        muted
        playsInline
        loop
        className={`h-screen w-screen absolute inset-0 -z-10 ${
          showLoop ? "visible" : "invisible"
        }`}
        style={{ objectFit: "cover" }}
        onLoadedData={() => {
          // console.log("onLoadedData 2");
          setAssets &&
            setAssets((prevState) => [
              ...prevState.slice(0, 1),
              true,
              ...prevState.slice(1 + 1),
            ]);
        }}
      >
        <source src={_assets[1].src} type="video/mp4" />
      </motion.video>

      <div
        className="uppercase font-black text-lg pb-6 3xl:pb-20"
        ref={innerRef}
      >
        scroll
      </div>
      <div className="hidden lg:flex justify-between w-full pb-4 px-4 sm:px-6">
        <div className="w-1/3 uppercase">the whole squad here</div>
        <div className="w-1/3 uppercase flex justify-center">and</div>
        <div className="w-1/3 uppercase flex justify-end">everybody eats</div>
      </div>
    </motion.div>
  );
};

export default LandingView;
