import { FC, ReactNode, useEffect, useRef, useState } from "react";
import { PageHead, Header, PageLoadAnimation, Footer } from "@components";
import { AnimatePresence, motion } from "framer-motion";
import { enterAnimation } from "@constants";

interface Props {
  children: ReactNode;
  showLoader?: boolean;
  showFooter?: boolean;
}

const PageLayout: FC<Props> = (props: Props) => {
  const { children, showLoader = false, showFooter = false } = props;

  const [showPage, setShowPage] = useState<boolean>(false);
  const showRef = useRef<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // if (showRef.current === false && !isRendering) {
    if (showLoader) {
      const milliseconds = Math.floor(Math.random() * (2500 - 1500 + 1) + 1500);
      timeoutRef.current = setTimeout(() => {
        setShowPage(true);
      }, milliseconds);
      // showRef.current = showLoader;
      // }
    } else {
      setShowPage(true);
    }

    return () => {
      if (showLoader) clearTimeout(timeoutRef.current);
    };
  }, [showLoader]);

  //set bg based on rendering
  // useEffect(() => {
  //   if (!showPage) {
  //     document.body.style.backgroundColor = "#8BD2B9";
  //   } else {
  //     document.body.style.backgroundColor = "#FCE4D8";
  //   }
  // }, [showPage]);

  return (
    <motion.div
      className="flex flex-col lg:min-h-screen justify-between"
      {...enterAnimation}
    >
      <PageHead title="My Slimes" description="Welcome to My Slimes" />

      {showPage && <Header />}
      <main className="flex flex-col justify-start items-center h-full z-0 ">
        <AnimatePresence mode="wait">
          {!showPage ? (
            <PageLoadAnimation show={!showPage} />
          ) : (
            <div className={`${!showPage ? "opacity-0" : "opacity-100"} `}>
              {children}
            </div>
          )}
        </AnimatePresence>
      </main>

      {showFooter && <Footer />}
    </motion.div>
  );
};
export default PageLayout;
