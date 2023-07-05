import { PageLayout, IndexView } from "@components";
import { useState } from "react";
import { NextPage } from "next";
import { useWindowSize } from "@hooks";
import { BuyRacksView } from "apps/merch/src/components";

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
  const [assets, setAssets] = useState<boolean[]>([]);
  const [isRacksInView, setIsRacksInView] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<string>(pageIDs[0]);

  const [width] = useWindowSize();
  const mobileView = width <= 1024;

  // useEffect(() => {
  //   console.log("assets", assets);
  // }, [assets]);

  return (
    <PageLayout headerType={mobileView ? "absolute" : "scroll"} assets={assets}>
      <BuyRacksView
        setIsInView={setIsRacksInView}
        id={pageIDs[1]}
        setCurrentPage={setCurrentPage}
      />
    </PageLayout>
  );
};

export default Home;
