import { PageLayout, ScumSection } from "@components";
import { useEffect, useState } from "react";
import { NextPage } from "next";
import Image from "next/image";
import { AboutSection } from "@components";

const Home: NextPage = () => {
  const [didMount, setDidMount] = useState<boolean>(false);

  useEffect(() => {
    setDidMount(true);
    document.body.style.backgroundColor = "#FFFFF";
    console.log("We bout it.");
  }, []);

  return (
    <PageLayout showFooter={true}>
      {didMount && (
        <div className="bg-white w-screen h-full flex flex-col items-center py-20 px-10">
          <AboutSection />
          <ScumSection />
        </div>
      )}
    </PageLayout>
  );
};

export default Home;
