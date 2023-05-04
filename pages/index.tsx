import {
  PageLayout,
  LandingView,
  WhatView,
  WhoView,
  FriendsView,
  WhereView,
} from "@components";
import { useEffect, useRef, useState } from "react";
import { NextPage } from "next";

const Home: NextPage = () => {
  const [assets, setAssets] = useState<boolean[]>([]);

  return (
    <PageLayout headerType="fixed" assets={assets}>
      <LandingView setAssets={setAssets} />
      <WhatView setAssets={setAssets} />
      <WhoView setAssets={setAssets} />
      <FriendsView setAssets={setAssets} />
      <WhereView setAssets={setAssets} />
    </PageLayout>
  );
};

export default Home;
