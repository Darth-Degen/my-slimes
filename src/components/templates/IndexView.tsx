import {
  LandingView,
  WhatView,
  WhoView,
  FriendsView,
  WhereView,
  ScrollProgress,
  LinkFire,
} from "@components";
import { BuyRacksView } from "@merch-components";
import { useContext, useEffect, useState } from "react";
import { scrollToSection } from "@helpers";
import { ViewContext } from "@constants";
import { useWindowSize } from "@merch-hooks";

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
  const [showLoop, setShowLoop] = useState<boolean>(false);
  //refs

  //hooks

  //context
  const { didMenuClick } = useContext(ViewContext);

  // views
  const [width] = useWindowSize();
  const mobileView = width < 1024;

  useEffect(() => {
    console.log("assets", assets);
  }, [assets]);

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
      <ScrollProgress backgroundColor={scrollColor} hidden={mobileView} />
      {/* TODO: add onLoadingComplete when landing graphic is added */}
      <LandingView
        setAssets={setAssets}
        setIsInView={setIsLandingInView}
        id={pageIDs[0]}
        setCurrentPage={setCurrentPage}
        showLoop={showLoop}
        setShowLoop={setShowLoop}
      />
      <div className="w-full h-full hidden sm:block">
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
      </div>
      <div className="w-full h-full sm:hidden">
        <LinkFire showLoop={showLoop} />
      </div>
    </>
  );
};

export default IndexView;
