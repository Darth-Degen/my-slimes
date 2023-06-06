import { FC, HTMLAttributes, ReactNode, useEffect, useState } from "react";
import {
  PageHead,
  Header,
  Footer,
  SplashScreen,
  GalleryModal,
} from "@components";
import { AnimatePresence, motion } from "framer-motion";
import { enterAnimation, ViewContext } from "@constants";
import { useRouter } from "next/router";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  pageTitle?: string;
  showFooter?: boolean;
  // showPage?: boolean;
  headerType?: string;
  showHeader?: boolean;
  footerAccentColor?: string;
  footerTextColor?: string;
  footerHex?: string;
  mainColor?: string;
  stopScroll?: boolean;
  assets?: boolean[]; //image didLoad values
}

const PageLayout: FC<Props> = (props: Props) => {
  const {
    children,
    pageTitle = "Slimes",
    showFooter = false,
    // showPage = true,
    headerType = "absolute",
    stopScroll = false,
    showHeader = false,
    assets = [],
    //footer customizations
    footerAccentColor,
    footerTextColor,
    footerHex,
    mainColor = "#f9f1d9", //"#F6EFD3",
    className,
  } = props;

  //context for splash screen & modals
  const [showView, setShowView] = useState<boolean>(false);
  const [galleryModalId, setGalleryModalId] = useState<number>(-1);
  const value = {
    showView,
    setShowView,
    galleryModalId,
    setGalleryModalId,
  };

  const router = useRouter();

  //set body bg based on page
  useEffect(() => {
    if (!router?.pathname) return;
    if (mainColor) {
      document.body.style.backgroundColor = mainColor;
    }
  }, [router.pathname, mainColor]);

  //stop page scroll (when modal or menu open)
  // useEffect(() => {
  //   if (stopScroll) document.body.style.overflow = "hidden";
  //   else document.body.style.overflow = "auto";
  // }, [stopScroll]);

  return (
    <ViewContext.Provider value={value}>
      <motion.div
        className="flex flex-col lg:min-h-screen justify-between relative"
        {...enterAnimation}
      >
        <PageHead title={pageTitle} description="An art project by scum" />

        {/* header */}
        <Header
          headerType={headerType}
          showHeader={showHeader}
          mainColor={mainColor}
        />
        {/* body */}
        <main
          className={`flex flex-col justify-start items-center w-full h-full overflow-x-clip ${
            className ? className : ""
          }`}
        >
          {children}
        </main>

        {/* footer */}
        {showFooter && (
          <Footer
            backgroundAccentColor={footerAccentColor}
            textColor={footerTextColor}
            hex={footerHex}
            mainColor={mainColor}
          />
        )}
        {/* modals */}
        {assets && <SplashScreen assets={assets} />}
        <AnimatePresence mode="wait">
          {galleryModalId !== -1 && (
            <GalleryModal
              key="gallery-modal"
              imageId={galleryModalId}
              setImageId={setGalleryModalId}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </ViewContext.Provider>
  );
};
export default PageLayout;
