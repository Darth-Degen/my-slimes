import { FC, ReactNode, useEffect } from "react";
import { PageHead, Header, Footer } from "@components";
import { motion } from "framer-motion";
import { enterAnimation } from "@constants";
import { useRouter } from "next/router";

interface Props {
  children: ReactNode;
  showFooter?: boolean;
  showPage?: boolean;
  staticHeader?: boolean;
  showHeader?: boolean;
}

const PageLayout: FC<Props> = (props: Props) => {
  const {
    children,
    showFooter = false,
    showPage = true,
    staticHeader = true,
    showHeader = false,
  } = props;

  const router = useRouter();

  //set body bg based on page
  // useEffect(() => {
  //   if (!router?.pathname) return;

  //   switch (router.pathname) {
  //     case "/about":
  //       document.body.style.backgroundColor = "#FFF";
  //       break;
  //     default:
  //       document.body.style.backgroundColor = "#8BD2B9";
  //   }
  // }, [router.pathname]);

  return (
    <motion.div
      className="flex flex-col lg:min-h-screen justify-between"
      {...enterAnimation}
    >
      <PageHead title="My Slimes" description="Welcome to My Slimes" />

      {showPage && <Header isStatic={staticHeader} showHeader={showHeader} />}
      <main className="flex flex-col justify-start items-center h-full z-0 ">
        {children}
      </main>

      {showFooter && showPage && <Footer />}
    </motion.div>
  );
};
export default PageLayout;
