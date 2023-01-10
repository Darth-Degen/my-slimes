import { FC, ReactNode, useEffect } from "react";
import { PageHead, Header, Footer } from "@components";
import { motion } from "framer-motion";
import { enterAnimation } from "@constants";
import { useRouter } from "next/router";

interface Props {
  children: ReactNode;
  showFooter?: boolean;
  showPage?: boolean;
  headerType?: string;
  showHeader?: boolean;
  footerAccentColor?: string;
  footerTextColor?: string;
  footerHex?: string;
  mainColor?: string;
}

const PageLayout: FC<Props> = (props: Props) => {
  const {
    children,
    showFooter = false,
    showPage = true,
    headerType = "absolute",
    showHeader = false,
    footerAccentColor,
    footerTextColor,
    footerHex,
    mainColor = "#8BD2B9",
  } = props;

  const router = useRouter();

  //set body bg based on page
  useEffect(() => {
    if (!router?.pathname) return;
    if (mainColor) {
      document.body.style.backgroundColor = mainColor;
    }
    // switch (router.pathname) {
    //   case "/about":
    //     document.body.style.backgroundColor = "#FFF";
    //     break;
    //   default:
    //     document.body.style.backgroundColor = "#8BD2B9";
    // }
  }, [router.pathname, mainColor]);

  return (
    <motion.div
      className="flex flex-col lg:min-h-screen justify-between"
      {...enterAnimation}
    >
      <PageHead title="My Slimes" description="Welcome to My Slimes" />

      {showPage && (
        <Header
          headerType={headerType}
          showHeader={showHeader}
          mainColor={mainColor}
        />
      )}
      <main className="flex flex-col justify-start items-center h-full z-0 ">
        {children}
      </main>

      {showFooter && showPage && (
        <Footer
          backgroundAccentColor={footerAccentColor}
          textColor={footerTextColor}
          hex={footerHex}
          mainColor={mainColor}
        />
      )}
    </motion.div>
  );
};
export default PageLayout;
