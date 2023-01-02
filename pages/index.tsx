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
      {didMount && (
        <></>
        // <DownloadView
        //   collection={collections[0]}
        //   tokenId={tokenId}
        //   setTokenId={setTokenId}
        // />
      )}
    </PageLayout>
  );
};

export default Home;
