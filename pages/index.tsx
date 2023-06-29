import { PageLayout, IndexView } from "@components";
import { useContext, useEffect, useRef, useState } from "react";
import { NextPage } from "next";
import { useScrollDirection, useWindowSize } from "@hooks";
import { scrollToSection } from "@helpers";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { ViewContext } from "@constants";

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

const pageIDs: string[] = [
  "landing",
  "buyracks",
  "what",
  "who",
  "friends",
  "where",
];

const Home: NextPage = () => {
  //state
  const [assets, setAssets] = useState<boolean[]>([
    // false, // [0] landing - video intro
    // false, // [1] landing - video loop
    // false, // [1] landing - video intro mobile
    // false, // [1] landing - video loop mobile
    // false, // [2] what - image 1
    // false, // [3] what - image 2
    // false, // [4] what - image 3
    // false, // [5] what - image 4
    // false, // [6] what - image 5
  ]);

  const [width] = useWindowSize();
  const mobileView = width < 1024;

  // useEffect(() => {
  //   if (mobileView) {
  //     setAssets([
  //       false,
  //       false,
  //       false,
  //       false,
  //       // false,
  //       // false,
  //       // false,
  //       // false,
  //       // false,
  //     ]);
  //   }
  // }, [mobileView]);

  useEffect(() => {
    console.log("assets", assets);
  }, [assets]);

  return (
    <PageLayout headerType={mobileView ? "block" : "scroll"} assets={assets}>
      <IndexView setAssets={setAssets} />
    </PageLayout>
  );
};

export default Home;
