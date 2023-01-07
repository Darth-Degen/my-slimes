import { useEffect, useState } from "react";
import { PageLayout, ScumSection, AboutSection, LogoText } from "@components";
import { NextPage } from "next";
import Image from "next/image";
import bg from "public/images/about-splash.png";
import { motion } from "framer-motion";
import { useWindowSize } from "@hooks";

const Home: NextPage = () => {
  const [didMount, setDidMount] = useState<boolean>(false);
  const [loadingComplete, setLoadingComplete] = useState<boolean>(false);

  const [winWidth, winHeight] = useWindowSize();

  const seconds = Math.floor(Math.random() * (3 - 2 + 1) + 2);

  useEffect(() => {
    setDidMount(true);
  }, []);

  return (
    <PageLayout showFooter={false} scrollHeader={true}>
      {didMount && (
        <>
          <div className="h-screen w-screen relative">
            <motion.aside
              initial={{ y: 0 }}
              animate={{ y: true ? -winHeight : 0 }}
              transition={{ delay: seconds, duration: 3, ease: "easeInOut" }}
            >
              <motion.div className="absolute h-screen w-screen bg-custom-primary">
                <div className="absolute left-1/2 lg:top-[27%] transform -translate-y-1/2 -translate-x-1/2">
                  <LogoText showAnimation={true} />
                </div>
              </motion.div>
            </motion.aside>
            <motion.aside
              initial={{ y: winHeight }}
              animate={{ y: true ? 0 : winHeight }}
              transition={{ delay: seconds, duration: 2, ease: "easeInOut" }}
            >
              <motion.div className="absolute h-screen w-screen">
                <Image
                  src={bg.src}
                  fill={true}
                  alt="About"
                  objectFit="cover"
                  onLoadingComplete={() => setLoadingComplete(true)}
                />
              </motion.div>
            </motion.aside>
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
