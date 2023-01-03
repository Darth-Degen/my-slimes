import { PageLayout, LandingPage } from "@components";
import { useEffect, useState } from "react";
import { NextPage } from "next";

const Home: NextPage = () => {
  const [didMount, setDidMount] = useState<boolean>(false);

  useEffect(() => {
    setDidMount(true);
    console.log("MY SLIMES");
  }, []);

  return (
    <PageLayout showLoader={true}>{didMount && <LandingPage />}</PageLayout>
  );
};

export default Home;
