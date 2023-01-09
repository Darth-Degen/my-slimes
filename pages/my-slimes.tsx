import { Button, PageLayout, ScumSection } from "@components";
import { useEffect, useState } from "react";
import { NextPage } from "next";
import Image from "next/image";
import { Dropdown } from "@components";
import { collections, assets, midExitAnimation } from "@constants";
import type { Collection, Asset } from "@types";
import { AnimatePresence, motion } from "framer-motion";

//assets
import bg from "public/images/slimes-gang.png";
import bgMobile from "public/images/landing-slimes-sm.png";

const MySlimes: NextPage = () => {
  const [didMount, setDidMount] = useState<boolean>(false);

  const [collectionDropdown, setCollectionDropdown] = useState<boolean>(false);
  const [collection, setCollection] = useState<Collection>();
  const [assetDropdown, setAssetDropdown] = useState<boolean>(false);
  const [asset, setAsset] = useState<Asset>();

  const hasSelections = collection?.name && asset?.name;

  useEffect(() => {
    setDidMount(true);
  }, []);

  const collectionSelected = (id: number): void => {
    setCollection(collections[id]);
    setCollectionDropdown(false);
  };
  const assetSelected = (id: number): void => {
    setAsset(assets[id]);
    setAssetDropdown(false);
  };

  return (
    <PageLayout
      showHeader={true}
      staticHeader={false}
      showFooter={true}
      footerAccentColor="bg-custom-light"
      footerTextColor="text-custom-light"
      footerHex="#F3F1EA"
      mainColor={collection?.color ?? "#8BD2B9"}
    >
      {didMount && (
        <div className="bg-custom-light w-screen h-full flex flex-col items-center pt-[104px] pb-20 px-10">
          {/* header */}
          <div className="relative my-3 mb-6">
            <h2 className="text-[50px] lg:text-[80px] text-center">
              {collection?.name ?? "My Slimes"}
            </h2>
            <AnimatePresence mode="wait">
              {collection?.name && (
                <motion.p
                  className="text-custom-red absolute  lg:-bottom-1 left-1/2 transform -translate-x-1/2 text-xs font-primary whitespace-nowrap"
                  key="merch-message"
                  {...midExitAnimation}
                >
                  *merch not redeemed
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          {/* dropdowns */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-14 pb-10">
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
              label={asset?.name ?? "select slime"}
              items={assets}
            />
          </div>
          {/* download container */}
          <div
            className={`transtion-colors duration-300 h-[600px] md:w-3/4 rounded-2xl flex justify-center items-end ${
              hasSelections ? "bg-white" : "bg-custom-secondary"
            }`}
          >
            {hasSelections ? (
              <motion.div
                className="flex flex-col items-center justify-around lg:justify-between h-full pt-10 gap-1 px-4 "
                key="selected"
                {...midExitAnimation}
              >
                <Button
                  className="font-primary !bg-custom-dark !text-custom-light !text-lg !shadow !w-64 h-14 rounded-lg"
                  isLoading={false}
                  disabled={false}
                >
                  download wallpaper
                </Button>
                <div className="rounded-xl pb-4 mt-10 lg:pb-6">
                  <Image
                    src={`/images/wallpapers/${
                      asset?.tag
                    }/${collection?.name.toLocaleLowerCase()}.png`}
                    height={asset?.height[0]}
                    width={asset?.width[0]}
                    alt={asset?.name}
                    className="rounded-xl"
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div key="unselected" {...midExitAnimation}>
                <div className="hidden lg:block">
                  <Image
                    src={bg.src}
                    height={766}
                    width={2371}
                    alt="My Slimes Banner"
                  />
                </div>
                <motion.div className="lg:hidden ">
                  <Image
                    src={bgMobile.src}
                    height={352.5}
                    width={440.5}
                    alt="My Slimes Mobile"
                  />
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default MySlimes;
