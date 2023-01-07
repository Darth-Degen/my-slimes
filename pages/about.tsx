import { useEffect, useMemo, useRef, useState } from "react";
import { PageLayout, ScumSection, AboutSection, LogoText } from "@components";
import { NextPage } from "next";
import Image from "next/image";
import bg from "public/images/about-splash.png";
import { motion } from "framer-motion";
import { useWindowSize } from "@hooks";
import { enterAnimation } from "@constants";

const Home: NextPage = () => {
  const [didMount, setDidMount] = useState<boolean>(false);
  const [loadingComplete, setLoadingComplete] = useState<boolean>(false);
  const [animationEnded, setAnimationEnded] = useState<boolean>(false);
  // const [delay, setDelay] = useState<number>(5);

  const [winWidth, winHeight] = useWindowSize();

  const delay = Math.floor(Math.random() * (3 - 2 + 1) + 2);
  const duration = 2.5;
  const delayMs = delay * 1000;
  const durationMs = duration * 1000;

  const timeoutRef = useRef<NodeJS.Timeout>();

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

  return (
    <PageLayout
      showFooter={false}
      staticHeader={false}
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
                <div className="absolute left-1/2 lg:top-[27%] transform -translate-y-1/2 -translate-x-1/2">
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
              <motion.div className="absolute h-screen w-screen top-0 left-0 bg-custom-dark">
                <Image
                  src={bg.src}
                  fill={true}
                  alt="About"
                  objectFit="cover"
                  onLoadingComplete={() => setLoadingComplete(true)}
                />
              </motion.div>
            </motion.aside>
            {animationEnded && (
              <motion.div
                className="cursor-pointer absolute bottom-0 left-1/2 transform -translate-y-1/2 text-white w-28 h-28 border border-white shadow-xl shadow-white rounded-full bg-custom-primary flex items-center justify-center text-xl animate-bounce"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1.4, ease: "easeInOut" }}
              >
                Press Me
              </motion.div>
            )}
          </div>

          {false && (
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

export default Home;
