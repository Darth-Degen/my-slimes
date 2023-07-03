import { PageLayout, IndexView } from "@components";
import { useState } from "react";
import { NextPage } from "next";
import { useWindowSize } from "@hooks";

const pageIDs: string[] = [
  "landing",
  "buyracks",
  "what",
  "who",
  "friends",
  "where",
];

const Home: NextPage = () => {
  //state
  const [assets, setAssets] = useState<boolean[]>([
    // false, // [0] landing - video intro
    // false, // [1] landing - video loop
    // false, // [2] landing - video intro mobile
    // false, // [3] landing - video loop mobile
    // false, // [4] what - image 1
    // false, // [5] what - image 2
    // false, // [6] what - image 3
    // false, // [7] what - image 4
    // false, // [8] what - image 5
  ]);

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
