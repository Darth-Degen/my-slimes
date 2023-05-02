import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { Logo, MenuController } from "@components";
import { motion, useScroll, Variants } from "framer-motion";

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
      } `}
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
