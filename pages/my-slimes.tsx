import { PageLayout, ScumSection } from "@components";
import { useEffect, useState } from "react";
import { NextPage } from "next";
import Image from "next/image";
import { Dropdown } from "@components";
import { collections, assets, midExitAnimation } from "@constants";
import { AnimatePresence, motion } from "framer-motion";

const MySlimes: NextPage = () => {
  const [didMount, setDidMount] = useState<boolean>(false);
  const [header, setHeader] = useState<string>("My Slimes");

  const [collectionDropdown, setCollectionDropdown] = useState<boolean>(false);
  const [collection, setCollection] = useState<number>();
  const [collectionLabel, setCollectionLabel] =
    useState<string>("select slime");

  const [assetDropdown, setAssetDropdown] = useState<boolean>(false);
  const [asset, setAsset] = useState<string>();
  const [assetLabel, setAssetLabel] = useState<string>("select asset");

  useEffect(() => {
    setDidMount(true);
  }, []);

  const collectionSelected = (id: number): void => {
    setCollectionLabel(collections[id].name);
  };
  const assetSelected = (id: string): void => {
    setAssetLabel(assets[id].name);
  };

  return (
    <PageLayout
      showFooter={true}
      footerAccentColor="bg-custom-light"
      footerTextColor="text-custom-light"
      footerHex="#F3F1EA"
    >
      {didMount && (
        <div className="bg-custom-light w-screen h-full flex flex-col items-center pt-[104px] pb-20 px-10">
          {/* header */}
          <div className="relative my-10">
            <h2 className="text-[80px] ">{header}</h2>
            <AnimatePresence mode="wait">
              {header !== "My Slimes" && (
                <motion.p
                  className="text-custom-red absolute -bottom-0 left-1/2 transform -translate-x-1/2 text-xs font-primary"
                  key="merch-message"
                  {...midExitAnimation}
                >
                  *merch not redeemed
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          {/* dropdowns */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-14 pb-20">
            <Dropdown
              handleSelect={collectionSelected}
              setShowDropdown={setCollectionDropdown}
              showDropdown={collectionDropdown}
              label={collectionLabel}
              items={collections}
            />
            <Dropdown
              handleSelect={assetSelected}
              setShowDropdown={setAssetDropdown}
              showDropdown={assetDropdown}
              label={assetLabel}
              items={assets}
            />
          </div>
          <div
            className={`transtion-colors duration-300 h-[600px] w-screen ${
              header === "My Slimes" ? "bg-custom-secondary" : "bg-white"
            }`}
          ></div>
        </div>
      )}
    </PageLayout>
  );
};

export default MySlimes;
