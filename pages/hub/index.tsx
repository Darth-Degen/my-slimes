import { NextPage } from "next/types";
import { useState } from "react";
import { PageLayout, SlimesHubView } from "@components";

const SlimesHub: NextPage = () => {
  const [assets, setAssets] = useState<boolean[]>([]);

  return (
    <PageLayout headerType="secondary" mainColor="white" assets={assets}>
      <SlimesHubView />
    </PageLayout>
  );
};

export default SlimesHub;
