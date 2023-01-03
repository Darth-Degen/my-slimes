import { PageLayout } from "@components";
import { useEffect, useState } from "react";
import { NextPage } from "next";
import Image from "next/image";
import { exitAnimation } from "@constants";
import { motion } from "framer-motion";

//assets
import bg from "public/images/landing-slimes-lg.png";
import bgMobile from "public/images/landing-slimes-sm.png";
import slimes from "public/images/slimes-text.png";

const Home: NextPage = () => {
  const [didMount, setDidMount] = useState<boolean>(false);

  useEffect(() => {
    setDidMount(true);
    console.log("MY SLIMES");
  }, []);

  return (
    <PageLayout showLoader={true}>
      {didMount && (
        <motion.div
          className="flex flex-col-reverse lg:flex-col lg:justify-center items-center"
          {...exitAnimation}
          key="landing-page"
        >
          {/* <div className="z-10 lg:pb-10 px-20 lg:px-0 pt-8 md:pt-10 lg:pt-20 "> */}
          <div className="px-10 pt-6 md:pt-10 lg:pt-0 lg:absolute lg:left-1/2 lg:top-[28.5%] lg:transform lg:-translate-y-1/2 lg:-translate-x-1/2">
            <Image
              src={slimes.src}
              height={136.8}
              width={400}
              alt="My Slimes Text"
            />
          </div>
          <div className="hidden lg:block px-0 z-0 absolute bottom-0">
            <Image
              src={bg.src}
              height={766}
              width={2371}
              alt="My Slimes Banner"
            />
          </div>
          <div className="lg:hidden px-0 z-0 md:pt-12">
            <Image
              src={bgMobile.src}
              height={352.5}
              width={440.5}
              alt="My Slimes Mobile"
            />
          </div>

          {/* <div className="hidden lg:block absolute bottom-0 px-10 z-0">
            <Image src={bg.src} height={1151} width={2819} alt="My Slimes" />
          </div>
          <div className="lg:hidden absolute bottom-0 px-10 z-0">
            <Image
              src={bgMobile.src}
              height={352.5}
              width={440.5}
              alt="My Slimes"
            />
          </div> */}
        </motion.div>
      )}
    </PageLayout>
  );
};

export default Home;
