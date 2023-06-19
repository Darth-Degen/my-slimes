import { FC, HTMLAttributes, ReactNode, useEffect, useState } from "react";
import {
  PageHead,
  Header,
  Footer,
  SplashScreen,
  GalleryModal,
  SFCModal,
} from "@components";
import { AnimatePresence, motion } from "framer-motion";
import { enterAnimation, ViewContext } from "@constants";
import { useRouter } from "next/router";
import debounce from "lodash.debounce";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  pageTitle?: string;
  showFooter?: boolean;
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
    ...componentProps
  } = props;

  //context for splash screen & modals
  const [showView, setShowView] = useState<boolean>(false);
  const [galleryModalId, setGalleryModalId] = useState<number>(-1);
  const [didMenuClick, setDidMenuClick] = useState<boolean>(false);
  const [sfcModalId, setSFCModalId] = useState<number>(-1);
  const value = {
    showView,
    setShowView,
    galleryModalId,
    setGalleryModalId,
    didMenuClick,
    setDidMenuClick,
    sfcModalId,
    setSFCModalId,
  };

  const router = useRouter();

  //set body bg based on page
  useEffect(() => {
    if (!router?.pathname) return;
    if (mainColor) {
      document.body.style.backgroundColor = mainColor;
    }
  }, [router.pathname, mainColor]);

  //sets menu click back to false so that auto scroll can work
  const debouncer = debounce((value) => setDidMenuClick(value), 1000);
  useEffect(() => {
    // console.log("1. didMenuClick ", didMenuClick);
    if (didMenuClick) debouncer(false);
    return () => {
      debouncer.cancel();
    };
  }, [debouncer, didMenuClick]);

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
          {...componentProps}
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
          {sfcModalId !== -1 && (
            <SFCModal
              key="gallery-modal"
              imageId={sfcModalId}
              setImageId={setSFCModalId}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </ViewContext.Provider>
  );
};
export default PageLayout;
