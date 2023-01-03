import { FC, ReactNode, useEffect, useRef, useState } from "react";
import { PageHead, Header, PageLoadAnimation } from "@components";
import { motion } from "framer-motion";
import { enterAnimation } from "@constants";

interface Props {
  children: ReactNode;
  isRendering?: boolean;
}

const PageLayout: FC<Props> = (props: Props) => {
  const { children, isRendering = true } = props;

  const [showPage, setShowPage] = useState<boolean>(false);
  const showRef = useRef<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    console.log(showRef.current, isRendering);
    if (showRef.current === false && !isRendering) {
      timeoutRef.current = setTimeout(() => {
        setShowPage(true);
      }, 3000);
      showRef.current = isRendering;
    }

    return () => clearTimeout(timeoutRef.current);
  }, [isRendering]);

  //set bg based on rendering
  useEffect(() => {
    if (!showPage) {
      document.body.style.backgroundColor = "#8BD2B9";
    } else {
      document.body.style.backgroundColor = "#FCE4D8";
    }
  }, [showPage]);

  return (
    <motion.div className="flex flex-col" {...enterAnimation}>
      <PageHead title="My Slimes" description="Welcome to My Slimes" />

      {showPage && <Header />}
      <main className="flex flex-col justify-start items-center h-full z-0">
        <div
          className={`${
            !showPage ? "opacity-0" : "opacity-100"
          } transition-opacity duration-1000`}
        >
          {children}
        </div>
        <PageLoadAnimation show={!showPage} />
      </main>

      {/* <Footer /> */}
    </motion.div>
  );
};
export default PageLayout;
