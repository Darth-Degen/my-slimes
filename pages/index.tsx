import { PageLayout, IndexView } from "@components";
import { useState } from "react";
import { NextPage } from "next";
import { useWindowSize } from "@hooks";

const Home: NextPage = () => {
  //state
  const [assets, setAssets] = useState<boolean[]>([]);

  const [width] = useWindowSize();
  const mobileView = width <= 1024;

  // useEffect(() => {
  //   console.log("assets", assets);
  // }, [assets]);

  return (
    <PageLayout headerType={mobileView ? "absolute" : "scroll"} assets={assets}>
      <IndexView setAssets={setAssets} />
    </PageLayout>
  );
};

export default Home;
