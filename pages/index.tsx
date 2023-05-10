import {
  PageLayout,
  LandingView,
  WhatView,
  WhoView,
  FriendsView,
  WhereView,
  ScrollProgress,
} from "@components";
import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
  useState,
  HTMLAttributes,
  UIEvent,
} from "react";
import { NextPage } from "next";
import {
  motion,
  useInView,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useWindowSize } from "@hooks";
import { scrollToSection } from "@helpers";

const ids: string[] = ["landing", "what", "who", "friends", "where", "slimes"];

const Home: NextPage = () => {
  const [assets, setAssets] = useState<boolean[]>([]);
  const [viewId, setViewId] = useState<string>(ids[0]);

  const scrollYRef = useRef<number>();
  const { scrollYProgress } = useScroll();

  // useMotionValueEvent(scrollYProgress, "change", (latest) => {
  //   // console.log("latest ", latest, ids.indexOf(viewId));
  //   //auto scroll down
  //   if (scrollYRef.current && latest > scrollYRef.current) {
  //     console.log("scrollToSection ", ids[ids.indexOf(viewId)]);
  //     // scrollToSection(ids[ids.indexOf(viewId)]);
  //   }
  //   scrollYRef.current = latest;
  // });

  // useEffect(() => {
  //   if (true) document.body.style.overflow = "hidden";
  //   else document.body.style.overflow = "auto";
  // }, [true]);

  // useEffect(() => {
  //   console.log("--- parent ", viewId);
  // }, [viewId]);

  const [currentScreenIndex, setCurrentScreenIndex] = useState<number>(0);
  const [winWidth, winHeight] = useWindowSize();

  const handleChildScroll = (index: number, event: UIEvent<HTMLElement>) => {
    const element = event.target as HTMLElement;
    const { scrollTop, offsetHeight } = element;
    const scrollBottom = scrollTop + offsetHeight;
    const windowHeight = window.innerHeight;

    const isFullyScrolled = scrollBottom >= element.scrollHeight;
    const isTopScreen = index === 0;

    if (scrollTop <= windowHeight && isTopScreen) {
      setCurrentScreenIndex(0);
    } else if (isFullyScrolled) {
      setCurrentScreenIndex(index + 1);
    }
  };

  useEffect(() => {
    console.log(
      ">>> screen index: ",
      currentScreenIndex
      // -currentScreenIndex * winHeight
    );
  }, [currentScreenIndex, winHeight]);

  return (
    <PageLayout headerType="scroll" assets={assets}>
      <ScrollProgress />
      <motion.div
      // className="overflow-y-scroll"
      // style={{ y: currentScreenIndex * window.innerHeight }}
      >
        <Layout screenIndex={0} onScroll={(e) => handleChildScroll(0, e)}>
          <LandingView setAssets={setAssets} />
        </Layout>
        <Layout screenIndex={1} onScroll={(e) => handleChildScroll(1, e)}>
          <WhatView setAssets={setAssets} />
        </Layout>
        <Layout screenIndex={2} onScroll={(e) => handleChildScroll(2, e)}>
          <WhoView setAssets={setAssets} />
        </Layout>
        <Layout screenIndex={3} onScroll={(e) => handleChildScroll(3, e)}>
          <FriendsView setAssets={setAssets} />
        </Layout>
        <Layout screenIndex={4} onScroll={(e) => handleChildScroll(4, e)}>
          <WhereView setAssets={setAssets} />
        </Layout>
      </motion.div>
    </PageLayout>
  );
};

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  screenIndex: number;
  // viewId: string;
  setScreenIndex?: Dispatch<SetStateAction<number>>;
}

const Layout: FC<Props> = (props: Props) => {
  const {
    children,
    screenIndex,
    setScreenIndex,
    className,
    ...componentProps
  } = props;

  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["end end", "start start"],
  });

  //is in view
  // const isInScope = childId === viewId;
  const isInView = useInView(scrollRef);
  const [winWidth, winHeight] = useWindowSize();

  // useEffect(() => {
  //   if (isInView) setScreenIndex(screenIndex);
  // }, [isInView, screenIndex, setScreenIndex]);

  // useEffect(() => {
  //   if (childId === viewId) console.log(viewId, childId, childId === viewId);
  // }, [childId, viewId]);

  // useMotionValueEvent(scrollYProgress, "change", (latest) => {
  //   console.log("scrollYProgress latest ", latest);
  // });

  return (
    <motion.div
      className={`w-screen ${className}`}
      ref={scrollRef}
      onScroll={componentProps.onScroll}
    >
      {children}
    </motion.div>
  );
};

export default Home;
