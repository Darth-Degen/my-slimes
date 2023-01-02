import { PageLayout, DownloadView } from "@components";
import { collections } from "@constants";
import { useEffect, useState } from "react";
import { NextPage } from "next";

const Home: NextPage = () => {
  const [didMount, setDidMount] = useState<boolean>(false);
  const [tokenId, setTokenId] = useState<number>(-1);

  useEffect(() => {
    setDidMount(true);
  }, []);

  return (
    <PageLayout>
      <h1 className="text-xl lg:text-3xl font-pressStart md:pb-10 text-red-400 text-center px-5">
        Download your <br />
        <span className="text-orange-300"> HotHeads Wallpaper</span>
      </h1>
      {didMount && (
        <DownloadView
          collection={collections[0]}
          tokenId={tokenId}
          setTokenId={setTokenId}
        />
      )}
    </PageLayout>
  );
};

export default Home;
