import { PageLayout, LandingPage } from "@components";
import { useEffect, useRef, useState } from "react";
import { NextPage } from "next";

const Home: NextPage = () => {
  const [didMount, setDidMount] = useState<boolean>(false);
  const [showPage, setShowPage] = useState<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const milliseconds = Math.floor(Math.random() * (3000 - 2000 + 1) + 2000);
    timeoutRef.current = setTimeout(() => {
      setShowPage(true);
    }, milliseconds);

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    setDidMount(true);
    console.log("MY SLIMES");
  }, []);

  return (
    <PageLayout showPage={showPage} headerType="fixed">
      {didMount && <LandingPage showPage={showPage} />}
    </PageLayout>
  );
};

export default Home;
