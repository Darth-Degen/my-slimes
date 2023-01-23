import { FC, ReactNode, useEffect, useState } from "react";
import { PageHead, Header, Footer } from "@components";
import { motion } from "framer-motion";
import { enterAnimation } from "@constants";
import { useRouter } from "next/router";

interface Props {
  children: ReactNode;
  pageTitle?: string;
  showFooter?: boolean;
  showPage?: boolean;
  headerType?: string;
  showHeader?: boolean;
  footerAccentColor?: string;
  footerTextColor?: string;
  footerHex?: string;
  mainColor?: string;
  stopScroll?: boolean;
}

const PageLayout: FC<Props> = (props: Props) => {
  const {
    children,
    pageTitle = "Slimes",
    showFooter = false,
    showPage = true,
    headerType = "absolute",
    showHeader = false,
    footerAccentColor,
    footerTextColor,
    footerHex,
    mainColor = "#8BD2B9",
    stopScroll = false,
  } = props;

  const [_stopScroll, setStopScroll] = useState<boolean>(false);

  const router = useRouter();

  //set body bg based on page
  useEffect(() => {
    if (!router?.pathname) return;
    if (mainColor) {
      document.body.style.backgroundColor = mainColor;
    }
  }, [router.pathname, mainColor]);

  //stop page scroll (when modal or menu open)
  useEffect(() => {
    if (stopScroll || _stopScroll) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [stopScroll, _stopScroll]);

  return (
    <motion.div
      className="flex flex-col lg:min-h-screen justify-between relative"
      {...enterAnimation}
    >
      <PageHead title={pageTitle} description="An art project by scum" />

      {showPage && (
        <Header
          headerType={headerType}
          showHeader={showHeader}
          mainColor={mainColor}
          setStopScroll={setStopScroll}
        />
      )}
      <main className="flex flex-col justify-start items-center h-full overflow-x-clip">
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
