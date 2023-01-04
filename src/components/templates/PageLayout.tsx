import { FC, ReactNode, useEffect, useRef, useState } from "react";
import { PageHead, Header, PageLoadAnimation, Footer } from "@components";
import { AnimatePresence, motion } from "framer-motion";
import { enterAnimation } from "@constants";

interface Props {
  children: ReactNode;
  showFooter?: boolean;
  showPage?: boolean;
}

const PageLayout: FC<Props> = (props: Props) => {
  const { children, showFooter = false, showPage = true } = props;

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
        {children}
      </main>

      {showFooter && showPage && <Footer />}
    </motion.div>
  );
};
export default PageLayout;
