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
import { useState } from "react";
import { NextPage } from "next";
import { collections } from "@constants";

const Home: NextPage = () => {
  const [assets, setAssets] = useState<boolean[]>([]);

  return (
    <PageLayout headerType="scroll" assets={assets}>
      <ScrollProgress />
      {/* TODO: add onLoadingComplete when landing graphic is added */}
      <LandingView setAssets={setAssets} />
      <BuyRacksView />
      <WhatView />
      <WhoView />
      <FriendsView />
      <WhereView />
    </PageLayout>
  );
};

export default Home;
