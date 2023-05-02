import { Button, PageLayout, LogoIcon } from "@components";
import { FC, HTMLAttributes, useEffect, useRef, useState } from "react";
import { NextPage } from "next";
import Image from "next/image";
import { Dropdown, AssetDisplay, Modal } from "@components";
import { collections, assets, midExitAnimation } from "@constants";
import type { Collection, Asset } from "@types";
import { AnimatePresence, motion } from "framer-motion";
import download from "downloadjs";

const darkKai: Collection = {
  id: 23,
  name: "Dark Kai",
  tag: "dark-kai",
  color: "#242424",
};

const MySlimes: NextPage = () => {
  const [didMount, setDidMount] = useState<boolean>(false);
  const [collectionDropdown, setCollectionDropdown] = useState<boolean>(false);
  const [collection, setCollection] = useState<Collection>();
  const [assetDropdown, setAssetDropdown] = useState<boolean>(false);
  const [asset, setAsset] = useState<Asset>();
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [imageModal, setImageModal] = useState<string>("");
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  const timeoutRef = useRef<NodeJS.Timeout>();

  const hasSelections = collection?.name && asset?.name;

  useEffect(() => {
    setDidMount(true);
    return () => {
      if (timeoutRef?.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const collectionSelected = (id: number): void => {
    setCollection(collections[id]);
    setCollectionDropdown(false);
    if (!asset) {
      setAsset(assets[0]);
    }
  };
  const assetSelected = (id: number): void => {
    setAsset(assets[id]);
    //test comment
    setAssetDropdown(false);
  };

  const downloadAsset = (path: string): void => {
    setIsDownloading(true);
    timeoutRef.current = setTimeout(() => {
      if (collection?.doublePfp && asset?.tag === "pfp-crop") {
        download(path);
        download(path.replace(".png", "-1.png"));
      } else {
        download(path.replace("-display", ""));
      }
      setIsDownloading(false);
    }, 690);
  };

  const handleToggle = (isOn: boolean): void => {
    setCollection(isOn ? darkKai : collections[23]);
  };

  return (
    <PageLayout
      pageTitle={"My Slimes"}
      showHeader={true}
      headerType={"absolute"}
      showFooter={true}
      mainColor={collection?.color ?? "#F6EFD3"}
      stopScroll={imageModal.length > 0}
    >
      {didMount && (
        <div className="bg-custom-light w-screen h-full flex flex-col items-center pt-[90px] pb-10 px-10">
          {/* header */}
          <div className="relative my-3 mb-6">
            <h2 className="text-[50px] lg:text-[70px] text-center">
              {collection?.name ?? "My Slimes"}
            </h2>
            <AnimatePresence mode="wait">
              {collection?.name && (
                <motion.p
                  className="text-custom-red absolute lg:-bottom-1 left-1/2 transform -translate-x-1/2 text-xs font-primary whitespace-nowrap"
                  key="merch-message"
                  {...midExitAnimation}
                >
                  *merch not redeemed
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          {/* dropdowns */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-14 pb-8">
            <Dropdown
              handleSelect={collectionSelected}
              setShowDropdown={setCollectionDropdown}
              showDropdown={collectionDropdown}
              label={collection?.name ?? "select slime"}
              items={collections}
            />
            <Dropdown
              handleSelect={assetSelected}
              setShowDropdown={setAssetDropdown}
              showDropdown={assetDropdown}
              label={asset?.name ?? "select asset"}
              items={assets}
            />
            {/* <Toggle /> */}
          </div>
          {/* download container */}
          <div
            className={`relative transtion-colors duration-300 min-h-[330px] lg:h-[500px] w-full md:w-[60%] rounded-2xl flex justify-center items-start ${
              hasSelections ? "bg-white" : "bg-custom-secondary"
            }`}
          >
            <AnimatePresence mode="wait">
              {!hasSelections ? (
                //unselected
                <motion.div
                  key="unselected"
                  {...midExitAnimation}
                  className="flex h-[330px] lg:h-full w-full items-center justify-center"
                >
                  <LogoIcon size={250} />
                </motion.div>
              ) : (
                //selected
                <motion.div
                  className="flex flex-col items-center justify-between w-full h-full pb-10 lg:pb-5 pt-10 gap-1 px-4 "
                  key="selected"
                  {...midExitAnimation}
                >
                  <div className="relative">
                    <Button
                      className="font-primary !bg-custom-dark !text-custom-light !text-lg !shadow !w-48 sm:!w-56 md:!w-64 h-14 rounded-lg"
                      isLoading={isDownloading}
                      disabled={false}
                      onClick={() =>
                        downloadAsset(
                          `/images/wallpapers/${asset?.tag}/${collection?.tag}.png`
                        )
                      }
                    >
                      {asset?.actionLabel ?? "download wallpaper"}
                    </Button>
                    {collection?.id === 23 && (
                      <div className="absolute left-1/2 -bottom-[78%] md:-bottom-[82%] transform -translate-x-1/2 flex items-center text-xs">
                        <p className="absolute -left-7">Kai</p>
                        <Toggle handleToggle={handleToggle} />
                        <p className="absolute -right-14">Dark Kai</p>
                      </div>
                    )}
                  </div>

                  <div className="pb-4 mt-10 lg:pb-6 h-full w-full flex items-center lg:items-start justify-center">
                    <AnimatePresence mode="wait">
                      {/* pfp */}
                      {asset?.tag === "image" && (
                        <AssetDisplay
                          asset={asset}
                          collection={collection}
                          handleClick={setImageModal}
                          key="image"
                        />
                      )}
                      {/* pfp crop */}
                      {asset?.tag === "pfp-crop" && (
                        <>
                          {collection?.doublePfp ? (
                            <div className="flex flex-col lg:flex-row gap-10">
                              <AssetDisplay
                                asset={asset}
                                collection={collection}
                                handleClick={setImageModal}
                                key="pfp-crop"
                              />
                              <AssetDisplay
                                asset={asset}
                                collection={collection}
                                handleClick={setImageModal}
                                key="pfp-crop"
                                isExtra={true}
                              />
                            </div>
                          ) : (
                            <AssetDisplay
                              asset={asset}
                              collection={collection}
                              handleClick={setImageModal}
                              key="pfp-crop"
                            />
                          )}
                        </>
                      )}
                      {/* banner */}
                      {asset?.tag === "banner" && (
                        <AssetDisplay
                          asset={asset}
                          collection={collection}
                          handleClick={setImageModal}
                          key="banner"
                        />
                      )}
                      {/* mobile-display */}
                      {asset?.tag === "mobile-display" && (
                        <AssetDisplay
                          asset={asset}
                          collection={collection}
                          handleClick={setImageModal}
                          key="mobile-display"
                        />
                      )}
                      {/* desktop-display */}
                      {asset?.tag === "desktop-display" && (
                        <AssetDisplay
                          asset={asset}
                          collection={collection}
                          handleClick={setImageModal}
                          key="desktop-display"
                        />
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
      <Modal show={imageModal.length > 0} close={setImageModal}>
        <Image
          src={imageModal.replace("-display", "")}
          fill={true}
          alt="Image"
          objectFit="contain"
          className={`rounded-3xl p-4 `}
          onLoadingComplete={() => setImageLoaded(true)}
        />
      </Modal>
    </PageLayout>
  );
};

interface ToggleProps extends HTMLAttributes<HTMLDivElement> {
  handleToggle: (isOn: boolean) => void;
}
const Toggle: FC<ToggleProps> = (props: ToggleProps) => {
  const { handleToggle, className } = props;
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => {
    setIsOn(!isOn);
  };

  useEffect(() => {
    handleToggle(isOn);
  }, [handleToggle, isOn]);

  return (
    <motion.div
      className={`w-12 h-7 rounded-full p-1 cursor-pointer ${
        isOn ? "bg-custom-primary" : "bg-gray-400"
      } ${className}`}
      onClick={toggleSwitch}
      // whileHover={{ scale: 1.1 }}
      // whileTap={{ scale: 0.9 }}
      transition={{ duration: 1, type: "spring", stiffness: 700 }}
    >
      <motion.div
        className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-all duration-300 ${
          isOn ? "translate-x-5" : ""
        }`}
        transition={{ duration: 1, type: "spring", stiffness: 700 }}
      />
    </motion.div>
  );
};
export default MySlimes;
