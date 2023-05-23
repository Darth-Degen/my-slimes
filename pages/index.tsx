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
import { useEffect, useState } from "react";
import { NextPage } from "next";

const Home: NextPage = () => {
  const [assets, setAssets] = useState<boolean[]>([]);
  const [scrollColor, setScrollColor] = useState<string>("bg-v2-green");
  const [isRacksInView, setIsRacksInView] = useState<boolean>(false);
  const [isLandingInView, setIsLandingInView] = useState<boolean>(false);

  useEffect(() => {
    if (isRacksInView && !isLandingInView) setScrollColor("bg-v2-beige");
    else setScrollColor("bg-v2-green");
  }, [isLandingInView, isRacksInView]);

  return (
    <PageLayout headerType="scroll" assets={assets}>
      <ScrollProgress backgroundColor={scrollColor} />
      {/* TODO: add onLoadingComplete when landing graphic is added */}
      <LandingView setAssets={setAssets} setIsInView={setIsLandingInView} />
      <BuyRacksView setIsInView={setIsRacksInView} />
      <WhatView />
      <WhoView />
      <FriendsView />
      <WhereView />
    </PageLayout>
  );
};

export default Home;
