import {
  PageLayout,
  LandingView,
  WhatView,
  WhoView,
  FriendsView,
  WhereView,
} from "@components";
import { FC, ReactNode, useEffect, useRef, useState } from "react";
import { NextPage } from "next";
import {
  motion,
  useInView,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useWindowSize } from "src/hooks";

const Home: NextPage = () => {
  const [assets, setAssets] = useState<boolean[]>([]);

  return (
    <PageLayout headerType="fixed" assets={assets}>
      <LandingView setAssets={setAssets} />
      <WhatView setAssets={setAssets} />
      <WhoView setAssets={setAssets} />
      <FriendsView setAssets={setAssets} />
      <WhereView setAssets={setAssets} />
    </PageLayout>
  );
};

interface Props {
  children: ReactNode;
}
const Layout: FC<Props> = (props: Props) => {
  const { children } = props;
  const [winWidth, winHeight] = useWindowSize();

  //scroll progress
  // const [scrollY, setScrollY] = useState(0);
  const { scrollY, scrollYProgress } = useScroll();
  // const progress = useTransform(scrollY, [0, winHeight], [0, 1]);
  //is at top
  const [isAtTop, setIsAtTop] = useState(false);
  //is in view
  const scrollRef = useRef(null);
  const isInView = useInView(scrollRef);

  useMotionValueEvent(scrollY, "change", (latest) => {
    console.log("latest ", isInView, latest);
  });

  return <motion.div className="relative">{children}</motion.div>;
};

export default Home;
