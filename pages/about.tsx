import { PageLayout } from "@components";
import { useEffect, useState } from "react";
import { NextPage } from "next";
import Image from "next/image";
import { exitAnimation } from "@constants";
import { motion } from "framer-motion";

//assets
import bg from "public/images/landing-slimes-lg.png";
import bgMobile from "public/images/landing-slimes-sm.png";
import slimes from "public/images/slimes-text.png";

const Home: NextPage = () => {
  const [didMount, setDidMount] = useState<boolean>(false);

  useEffect(() => {
    setDidMount(true);
  }, []);

  return <PageLayout showLoader={false}> ABOUT</PageLayout>;
};

export default Home;
