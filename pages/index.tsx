import { PageLayout, LandingPage } from "@components";
import { useEffect, useRef, useState } from "react";
import { NextPage } from "next";

const Home: NextPage = () => {
  const [assets, setAssets] = useState<boolean[]>([true]);

  return (
    <PageLayout headerType="fixed" assets={assets}>
      <LandingPage setAssets={setAssets} />
    </PageLayout>
  );
};

export default Home;
