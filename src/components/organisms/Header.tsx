import { FC, useEffect, useRef, useState } from "react";
import { Logo, MenuController } from "@components";
import { motion, useScroll, Variants } from "framer-motion";

interface Props {
  showHeader?: boolean; //used to show header if isStatic is false
  headerType?: string;
  mainColor?: string;
}

const Header: FC<Props> = (props: Props) => {
  const { headerType = "absolute", showHeader = false, mainColor } = props;

  const [header, setHeader] = useState<boolean>();
  const [showOnScroll, setShowOnScroll] = useState<boolean>();

  const scrollRef = useRef<number>();

  const { scrollY, scrollYProgress } = useScroll();

  const height = 104;
  const headerVariants: Variants = {
    show: {
      y: 0,
      transition: {
        delay: 0.5,
        duration: 0.69,
        ease: "easeInOut",
      },
    },
    hidden: {
      y: -height,
      transition: {
        delay: 0.5,
        duration: 0.69,
        ease: "easeInOut",
      },
    },
  };

  //hide header on scroll down, show on scroll up
  useEffect(() => {
    return scrollY.onChange((latest) => {
      //top of page

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
        if (scrollRef.current > latest + 80) {
          setHeader(true);
          scrollRef.current = latest;
        }
        return;
      }
    });
  }, [scrollY]);

  useEffect(() => {
    setHeader(showHeader);
  }, [showHeader]);

  // useEffect(() => {
  //   console.log("1. mainColor ", mainColor);
  //   return () => {
  //     initialColorRef.current = mainColor;
  //     console.log("2. initialColorRef.current", initialColorRef.current);
  //   };
  // }, [mainColor]);

  // const getBackground = () => {
  //   switch (mainColor) {
  //     case "#356551":
  //       return "bg-[#356551]";
  //     case "#FE6B2F":
  //       return "bg-[#FE6B2F]";
  //     case "#90CFBC":
  //       return "bg-[#90CFBC]";
  //     case "#5A4E42":
  //       return "bg-[#5A4E42]";
  //     case "#81a2e8":
  //       return "bg-[#81a2e8]";
  //     case "#2A4F43":
  //       return "bg-[#2A4F43]";
  //     default:
  //       return "bg-custom-primary";
  //   }
  // };

  const Content = () => (
    <div className={`w-screen`}>
      <motion.div
        className={`h-full w-full px-4 sm:px-6 lg:px-10 py-6 flex justify-between items-center`}
        initial={{ backgroundColor: mainColor }}
        animate={{ backgroundColor: mainColor }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <Logo />
        <MenuController />
      </motion.div>
    </div>
  );

  return (
    <header
      className={`top-0 z-20 transition-all duration-500 ${
        headerType === "scroll" ? "fixed" : headerType
      } ${headerType === "absolute" ? " opacity-100" : " opacity-90"} `}
    >
      {headerType !== "scroll" ? (
        <Content />
      ) : (
        <motion.aside
          variants={headerVariants}
          initial={showHeader ? "show" : "hidden"}
          animate={header ? "show" : "hidden"}
        >
          <Content />
        </motion.aside>
      )}
    </header>
  );
};

export default Header;
