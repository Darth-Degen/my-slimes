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
import { useContext, useEffect, useRef, useState } from "react";
import { NextPage } from "next";
import { useScrollDirection } from "@hooks";
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

const IndexView = () => {
  //state
  const [assets, setAssets] = useState<boolean[]>([
    // false, // [0] landing - video 1
    // false, // [1] landing - video 2
    // false, // [2] what - image 1
    // false, // [3] what - image 2
    // false, // [4] what - image 3
  ]);
  const [scrollColor, setScrollColor] = useState<string>("bg-v2-green");
  const [isRacksInView, setIsRacksInView] = useState<boolean>(false);
  const [isLandingInView, setIsLandingInView] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<string>(pageIDs[0]);
  //refs
  //hooks
  //context
  const { didMenuClick } = useContext(ViewContext);

  // handles auto scroll
  useEffect(() => {
    if (
      (currentPage === pageIDs[0] ||
        currentPage === pageIDs[1] ||
        currentPage === pageIDs[2]) &&
      !didMenuClick
    )
      scrollToSection(currentPage);
  }, [currentPage, didMenuClick]);

  //changes progress bar color over BuyRacksView
  useEffect(() => {
    if (isRacksInView && !isLandingInView) setScrollColor("bg-v2-beige");
    else setScrollColor("bg-v2-green");
  }, [isLandingInView, isRacksInView]);

  return (
    <>
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
    </>
  );
};

export default IndexView;
