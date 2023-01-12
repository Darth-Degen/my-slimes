import { useEffect, useRef, useState } from "react";
import {
  PageLayout,
  ScumSection,
  AboutSection,
  LogoText,
  ArrowIcon,
} from "@components";
import { NextPage } from "next";
import Image from "next/image";
import bg from "public/images/about-splash.png";
import { useScroll, motion, AnimatePresence } from "framer-motion";
import { useWindowSize } from "@hooks";

const indicatorVariants = {
  show: {
    opacity: 1,
    transition: { delay: 1.2, duration: 1, ease: "easeInOut" },
  },
  hide: {
    opacity: 0,
    transition: { delay: 0, duration: 0.5, ease: "easeInOut" },
  },
};

const About: NextPage = () => {
  const [didMount, setDidMount] = useState<boolean>(false);
  const [loadingComplete, setLoadingComplete] = useState<boolean>(false);
  const [animationEnded, setAnimationEnded] = useState<boolean>(false);
  const [showScrollArrow, setShowScrollArrow] = useState<boolean>(true);

  const [winWidth, winHeight] = useWindowSize();
  const { scrollYProgress } = useScroll();

  const delay = Math.floor(Math.random() * (3 - 2 + 1) + 2);
  const duration = 2;
  const delayMs = delay * 1000;
  const durationMs = duration * 1000;

  const timeoutRef = useRef<NodeJS.Timeout>();
  const scrollRef = useRef<number>();

  useEffect(() => {
    setDidMount(true);
  }, []);

  //init header dropdown after slide animation
  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setAnimationEnded(true);
    }, delayMs + durationMs);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [loadingComplete, delay, delayMs, durationMs]);

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      if (scrollRef.current) {
        if (latest > 0.1) setShowScrollArrow(false);
        else setShowScrollArrow(true);
      }
      scrollRef.current = latest;
    });
  }, [scrollYProgress]);

  return (
    <PageLayout
      pageTitle="About"
      showFooter={animationEnded}
      headerType={"scroll"}
      showHeader={animationEnded}
    >
      {didMount && (
        <>
          <div className="h-screen w-screen relative">
            <motion.aside
              initial={{ y: 0 }}
              animate={{ y: -winHeight }}
              transition={{
                delay: delay,
                duration: duration,
                ease: "easeInOut",
              }}
            >
              <motion.div className="absolute h-screen w-screen bg-custom-primary">
                <div className="absolute left-1/2 top-[27%] transform -translate-y-1/2 -translate-x-1/2">
                  <LogoText showAnimation={true} />
                </div>
              </motion.div>
            </motion.aside>
            <motion.aside
              initial={{ y: winHeight }}
              animate={{ y: 0 }}
              transition={{
                delay: delay,
                duration: duration,
                ease: "easeInOut",
              }}
            >
              <motion.div className="absolute h-screen w-screen top-0 left-0 bg-custom-primary">
                <Image
                  src={bg.src}
                  fill={true}
                  alt="About"
                  objectFit="cover"
                  onLoadingComplete={() => setLoadingComplete(true)}
                />
              </motion.div>
            </motion.aside>
            {/* scroll arrow */}
            <AnimatePresence mode="wait">
              {animationEnded && showScrollArrow && (
                <motion.div
                  className="animate-bounce cursor-default fixed z-50 bottom-3 left-[40%] sm:left-[45%] md:left-[47%] lg:left-[47.5%] 2xl:left-[48.5%] transform -translate-x-1/2 border border-white border-opacity-80 text-white px-4 pt-1 bg-[#8BD2B9] bg-opacity-80 rounded  flex flex-col items-center justify-center text-lg"
                  // initial={{ opacity: 0 }}
                  // animate={{ opacity: 1 }}
                  // exit={{ opacity: 0}}
                  // transition={{ delay: 1.2, duration: 1, ease: "easeInOut" }}
                  variants={indicatorVariants}
                  initial="hide"
                  animate="show"
                  exit="hide"
                  key="scroll-arrow"
                >
                  Scroll
                  <div className="-mt-1">
                    <ArrowIcon color="#fff" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {/* page content */}
          {animationEnded && (
            <div className="bg-white w-screen h-full flex flex-col items-center py-20 px-10">
              <AboutSection />
              <ScumSection />
            </div>
          )}
        </>
      )}
    </PageLayout>
  );
};

export default About;
