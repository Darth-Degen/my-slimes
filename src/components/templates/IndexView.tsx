import {
  LandingView,
  WhatView,
  WhoView,
  FriendsView,
  WhereView,
  ScrollProgress,
  LinkFire,
  ExpIcon,
} from "@components";
import { BuyRacksView } from "apps/merch/src/components";
import {
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { scrollToSection } from "@helpers";
import { ViewContext } from "@constants";
import { useScrollDirection, useWindowSize } from "@hooks";

interface Props {
  setAssets: Dispatch<SetStateAction<boolean[]>>;
}

const pageIDs: string[] = [
  "landing",
  "buyracks",
  "what",
  "who",
  "friends",
  "where",
];

const IndexView: FC<Props> = ({ setAssets }) => {
  //state
  const [scrollColor, setScrollColor] = useState<string>("bg-v2-green");
  const [isRacksInView, setIsRacksInView] = useState<boolean>(false);
  const [isLandingInView, setIsLandingInView] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<string>(pageIDs[0]);
  const [showLoop, setShowLoop] = useState<boolean>(false);

  //context
  const { didMenuClick } = useContext(ViewContext);

  // views
  const [width] = useWindowSize();
  const mobileView = width <= 1024;
  const scrollDirection = useScrollDirection();

  // handles auto scroll
  useEffect(() => {
    // console.log("currentPage ", currentPage);
    if (
      // currentPage === pageIDs[0] ||
      // currentPage === pageIDs[1] ||
      (currentPage === pageIDs[2] ||
        currentPage === pageIDs[3] ||
        currentPage === pageIDs[4]) &&
      !didMenuClick &&
      scrollDirection === "down"
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
      {/* <ScrollProgress backgroundColor={scrollColor} hidden={mobileView} /> */}
      <LandingView
        setAssets={setAssets}
        setIsInView={setIsLandingInView}
        id={pageIDs[0]}
        setCurrentPage={setCurrentPage}
        showLoop={showLoop}
        setShowLoop={setShowLoop}
      />
      <div className="w-full h-full hidden lg:block">
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
          showLoop={showLoop}
        />
      </div>
      <div className="w-full h-full lg:hidden">
        <LinkFire setAssets={setAssets} showLoop={showLoop} />
      </div>
    </>
  );
};

export default IndexView;
