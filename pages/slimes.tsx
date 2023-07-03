import { PageLayout } from "@components";
import { NextPage } from "next";
import { useState } from "react";

const MySlimes: NextPage = () => {
  const [assets, setAssets] = useState<boolean[]>([]);

  return (
    <PageLayout headerType="secondary" assets={assets}>
      {/* <SlimesView /> */}
    </PageLayout>
  );
};
export default MySlimes;
