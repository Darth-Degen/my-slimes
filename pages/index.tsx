import {
  PageLayout,
  LandingView,
  WhatView,
  WhoView,
  FriendsView,
  WhereView,
  ScrollProgress,
  BuyRacksView,
} from "@components";
import { useEffect, useRef, useState } from "react";
import { NextPage } from "next";
import { useScrollDirection } from "src/hooks";
import { scrollToSection } from "@helpers";
import { useMotionValueEvent, useScroll } from "framer-motion";

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
  const [assets, setAssets] = useState<boolean[]>([]);
  const [scrollColor, setScrollColor] = useState<string>("bg-v2-green");
  const [isRacksInView, setIsRacksInView] = useState<boolean>(false);
  const [isLandingInView, setIsLandingInView] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<string>(pageIDs[0]);
  //refs
  // const previousPageRef = useRef<string>();
  //hooks
  // const scrollDirection = useScrollDirection();
  // const { scrollY } = useScroll();

  //handle auto scroll
  // useMotionValueEvent(scrollY, "change", (latest) => {
  //   const currentPageIndex = pageIDs.indexOf(currentPage);
  //   // console.log("-- currentPageIndex ", currentPageIndex);

  //   if (scrollDirection === "down") {
  //     //next page if not at end
  //     const nextPageIndex =
  //       currentPageIndex + 1 < pageIDs.length
  //         ? currentPageIndex + 1
  //         : currentPageIndex;
  //     console.log("next page ", pageIDs[nextPageIndex]);

  //     // scrollToSection("buyracks");
  //   } else if (scrollDirection === "up") {
  //   }
  // });

  useEffect(() => {
    // console.log("--> ", currentPage);
    if (
      currentPage === pageIDs[0] ||
      currentPage === pageIDs[1] ||
      currentPage === pageIDs[2]
    )
      scrollToSection(currentPage);
  }, [currentPage]);

  //changes progress bar color over BuyRacksView
  useEffect(() => {
    if (isRacksInView && !isLandingInView) setScrollColor("bg-v2-beige");
    else setScrollColor("bg-v2-green");
  }, [isLandingInView, isRacksInView]);

  return (
    <PageLayout headerType="scroll" assets={assets}>
      <ScrollProgress backgroundColor={scrollColor} />
      {/* TODO: add onLoadingComplete when landing graphic is added */}
      <LandingView
        setAssets={setAssets}
        setIsInView={setIsLandingInView}
        id={pageIDs[0]}
        setCurrentPage={setCurrentPage}
      />
      <BuyRacksView
        setIsInView={setIsRacksInView}
        id={pageIDs[1]}
        setCurrentPage={setCurrentPage}
      />
      <WhatView
        setAssets={setAssets}
        id={pageIDs[2]}
        setCurrentPage={setCurrentPage}
      />
      <WhoView
        setAssets={setAssets}
        id={pageIDs[3]}
        setCurrentPage={setCurrentPage}
      />
      <FriendsView
        setAssets={setAssets}
        id={pageIDs[4]}
        setCurrentPage={setCurrentPage}
      />
      <WhereView
        setAssets={setAssets}
        id={pageIDs[5]}
        setCurrentPage={setCurrentPage}
      />
    </PageLayout>
  );
};

export default Home;
