import { FC, useEffect, useRef, useState } from "react";
import { LogoText, MenuController } from "@components";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  Variants,
} from "framer-motion";
import Link from "next/link";

interface Props {
  showHeader?: boolean; //used to show header if isStatic is false
  headerType?: string; //scroll, fixed, absolute
  mainColor?: string;
}

const Header: FC<Props> = (props: Props) => {
  const { headerType = "absolute", showHeader = true, mainColor } = props;

  const [header, setHeader] = useState<boolean>();

  const scrollRef = useRef<number>();

  const { scrollY, scrollYProgress } = useScroll();

  const height = 104;
  const headerVariants: Variants = {
    show: {
      y: 0,
      transition: {
        delay: 0.25,
        duration: 0.4,
        ease: "easeInOut",
      },
    },
    hidden: {
      y: -height,
      transition: {
        delay: 0.25,
        duration: 0.4,
        ease: "easeInOut",
      },
    },
  };

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.9) setHeader(true);
    if (latest < 0.1) setHeader(true);
  });

  //hide header on scroll down, show on scroll up
  useMotionValueEvent(scrollY, "change", (latest) => {
    //first instance
    if (scrollRef.current === undefined) {
      setHeader(false);
      scrollRef.current = latest;
      return;
    }

    //scroll down
    if (scrollRef.current < latest) {
      if (scrollRef.current + 30 < latest) {
        setHeader(false);
        scrollRef.current = latest;
      }
      return;
    }

    //scroll up
    if (scrollRef.current > latest) {
      if (scrollRef.current > latest + 30) {
        setHeader(true);
        scrollRef.current = latest;
      }
      return;
    }
  });

  useEffect(() => {
    setHeader(showHeader);
  }, [showHeader]);

  const Content = () => (
    <div className={`w-screen`}>
      <div className="h-full w-full px-4 sm:px-6 py-1 sm:py-3 flex justify-between items-center">
        <Link href="/">
          <LogoText
            fill="#312A29"
            width={94}
            height={50}
            className="cursor-pointer"
          />
        </Link>
        <MenuController />
      </div>
    </div>
  );

  return (
    <header
      className={`top-0 z-20 transition-all duration-500 ${
        headerType === "scroll" ? "fixed" : headerType
      } `}
    >
      {headerType !== "scroll" ? (
        <Content />
      ) : (
        <motion.aside
          variants={headerVariants}
          initial={"show"}
          animate={header ? "show" : "hidden"}
        >
          <Content />
        </motion.aside>
      )}
    </header>
  );
};

export default Header;
