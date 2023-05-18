import {
  PageLayout,
  LandingView,
  WhatView,
  WhoView,
  FriendsView,
  WhereView,
  ScrollProgress,
} from "@components";
import { useState } from "react";
import { NextPage } from "next";
import { collections } from "@constants";

const Home: NextPage = () => {
  const [assets, setAssets] = useState<boolean[]>([]);

  return (
    <PageLayout headerType="scroll" assets={assets}>
      <ScrollProgress />
      <LandingView setAssets={setAssets} />
      <WhatView setAssets={setAssets} />
      <WhoView setAssets={setAssets} />
      <FriendsView setAssets={setAssets} />
      <WhereView setAssets={setAssets} />
    </PageLayout>
  );
};

export default Home;
