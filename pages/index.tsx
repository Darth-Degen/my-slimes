import { PageLayout, LogoText } from "@components";
import { useEffect, useState } from "react";
import { NextPage } from "next";
import Image from "next/image";
import bg from "public/images/landing-slimes-lg.png";
import bgMobile from "public/images/landing-slimes-sm.png";

const Home: NextPage = () => {
  const [didMount, setDidMount] = useState<boolean>(false);
  const [tokenId, setTokenId] = useState<number>(-1);

  useEffect(() => {
    setDidMount(true);
    console.log("MY SLIMES");
  }, []);

  return (
    <PageLayout>
      {didMount && (
        <div className="h-full flex flex-col md:justify-between items-center">
          <div className="z-10 pb-10">
            <LogoText />
          </div>
          <div className="hidden md:block px-10 z-0">
            <Image src={bg.src} height={1151} width={2819} alt="My Slimes" />
          </div>
          <div className="md:hidden px-10 z-0 h-full">
            <Image
              src={bgMobile.src}
              height={352.5}
              width={440.5}
              alt="My Slimes"
            />
          </div>

          {/* <div className="hidden md:block absolute bottom-0 px-10 z-0">
            <Image src={bg.src} height={1151} width={2819} alt="My Slimes" />
          </div>
          <div className="md:hidden absolute bottom-0 px-10 z-0">
            <Image
              src={bgMobile.src}
              height={352.5}
              width={440.5}
              alt="My Slimes"
            />
          </div> */}
        </div>
      )}
    </PageLayout>
  );
};

export default Home;
