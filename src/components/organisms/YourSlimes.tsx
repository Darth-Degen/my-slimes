import { FC, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import {
  enterAnimation,
  slimesWhitelist,
  smallClickAnimation,
} from "@constants";
import { AnimatePresence, motion } from "framer-motion";
import { SlimeHubButton } from "@components";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { getNftsByOwner } from "src/helpers";
import { Slime } from "src/types";
import axios from "axios";
import SlimesGrid from "./SlimesGrid";
import FullResolutionDownload from "../atoms/FullResolutionDownload";

interface Props {}

const YourSlimes: FC<Props> = () => {
  const { publicKey, disconnect } = useWallet();
  const { connection } = useConnection();

  const [slimes, setSlimes] = useState<Slime[]>([]); // all slimes in collection
  const [mySlimes, setMySlimes] = useState<Slime[]>([]); // all slimes in my wallet
  const [selectedNft, setSelectedNft] = useState<Slime>(); // selected slime
  const [selectedAssetType, setSelectedAssetType] = useState<
    "full-res" | "pfp" | "mobile" | "desktop"
  >("full-res"); // selected asset type of slime to display
  const [featuredImage, setFeaturedImage] = useState<string>(); // url of current featured image

  // fetch nft metadata
  // const getNftMetadata = async (tokenURIs: string[], owned: boolean) => {
  //   await Promise.all(
  //     tokenURIs.map(async (tokenURI: string) => {
  //       try {
  //         const json = await axios.get(tokenURI).then((r) => r.data);
  //         let image = json.image;
  //         let description = json.description;
  //         let name = json.name;
  //         let mobileView = `/images/wallpapers/mobile-display/${name}.png`;
  //         let desktopView = `/images/wallpapers/desktop-display/${name}.png`;
  //         const thisNft = {
  //           name,
  //           image,
  //           description,
  //           mobileView,
  //           desktopView,
  //         };
  //         if (owned) {
  //           setNfts((prev) => [...prev, thisNft]);
  //         } else {
  //           setSelectedNft(thisNft);
  //         }
  //       } catch (e: any) {
  //         console.error(e.message);
  //       }
  //     })
  //   );
  // };

  // fetch users nfts
  const getNfts = useCallback(async () => {
    if (!connection || !publicKey) {
      // default to scum's pfp (tokenUri)
      const scum: Slime = slimes.filter((slime) => slime.name === "scum")[0];
      setSelectedNft(scum);
      return;
    }
    try {
      // connected wallet, now fetch all wallet tokens, filter for slimes, then fetch metadata
      const tokens = await getNftsByOwner(connection, publicKey);
      if (!tokens || typeof tokens === "string") return;

      const ownedSlimes = tokens.filter((token) =>
        slimesWhitelist.includes(token.address.toBase58())
      );
      if (ownedSlimes.length === 0) {
        // default to scum's pfp (tokenUri)
        const scum: Slime = slimes.filter((slime) => slime.name === "scum")[0];
        setSelectedNft(scum);
        return;
      }
      // must have slimes, use slimes variable to set ownedSlimes
      const formattedSlimes = slimes.filter((slime) => {
        return ownedSlimes.some(
          (ownedSlime) => ownedSlime.address.toBase58() === slime.mintAddress
        );
      });
      // TODO: test that this works
      setMySlimes(formattedSlimes);
    } catch (e: any) {
      console.error(e.message);
      toast.error(`Error fetching Slimes: ${e.message}`);
    }
  }, [connection, publicKey, slimes]);

  // manage featured image path based on selected asset type
  useEffect(() => {
    if (selectedNft) {
      switch (selectedAssetType) {
        case "full-res":
          setFeaturedImage(selectedNft.image);
          break;
        case "desktop":
          setFeaturedImage(
            `/images/wallpapers/desktop-display/${selectedNft?.name
              .replaceAll(" ", "_")
              .toLowerCase()}.png`
          );
          break;
        case "mobile":
          setFeaturedImage(
            `/images/wallpapers/mobile-display/${selectedNft?.name
              .replaceAll(" ", "_")
              .toLowerCase()}.png`
          );
          break;
        case "pfp":
          setFeaturedImage(
            `/images/wallpapers/pfp-crop/${selectedNft?.name
              .replaceAll(" ", "_")
              .toLowerCase()}.png`
          );
          break;
        default:
          setFeaturedImage(selectedNft.image);
          break;
      }
    }
  }, [selectedNft, selectedAssetType]);

  useEffect(() => {
    getNfts();
  }, [getNfts]);

  return (
    <motion.div className="w-full max-w-[1200px] mx-auto" {...enterAnimation}>
      <div className="w-full flex items-start justify-center pt-8">
        {selectedNft && (
          <div className="flex flex-col items-center justify-center">
            {/* TODO: manage loading states (both initial and in between asset type changes) */}
            {/* <Suspense fallback={<div>Loading...</div>}> */}
            <AnimatePresence mode="wait">
              <motion.div
                className="relative flex items-center justify-center h-[500px] w-[500px] mr-6"
                {...enterAnimation}
                key={selectedNft?.name}
              >
                <Image
                  src={featuredImage ?? selectedNft.image}
                  width={selectedAssetType === "mobile" ? 250 : 500}
                  height={500}
                  alt="featured slime asset"
                  className="rounded-xl overflow-hidden"
                />
              </motion.div>
            </AnimatePresence>
            {/* </Suspense> */}
            <FullResolutionDownload imageUrl={selectedNft.image} />
          </div>
        )}
        <div className="w-[600px] h-full ml-6 -mt-3">
          <p className="hub-name uppercase text-slimes-black">
            {selectedNft?.name}
          </p>
          <p className="font-secondary max-w-[300px] text-[9px] leading-[12px] text-slimes-black -mt-1">
            {selectedNft?.description}
          </p>
          {/* CTA buttons */}
          <div className="flex items-center gap-6 py-4 min-h-[60px]">
            <motion.button
              className="bg-v2-green text-sm w-[190px] h-[60px] rounded-lg font-secondary text-slimes-black uppercase"
              {...smallClickAnimation}
              onClick={() => {
                window.open(
                  `https://exchange.art/single/${selectedNft?.mintAddress}`,
                  "_blank",
                  "noopener noreferrer"
                );
              }}
            >
              Exchange Art
            </motion.button>
            <SlimeHubButton
              text="Redeem Merch"
              className="line-through"
              // onClick={() => {
              //   window.open(
              //     "https://youtube.com/watch?v=dQw4w9WgXcQ",
              //     "_blank",
              //     "noopener noreferrer"
              //   );
              // }}
            />
          </div>
          {/* your slimes - connect wallet or show icons */}
          <div>
            <div className="flex items-center gap-2 pb-4">
              <p className="text-sm uppercase font-black text-slimes-black">
                Your Slime(s):
              </p>
              {publicKey !== null && (
                <motion.div
                  {...smallClickAnimation}
                  className="uppercase underline font-secondary text-xs text-custom-red cursor-pointer"
                  onClick={() => {
                    disconnect();
                  }}
                >
                  {`Disconnect: ${
                    publicKey.toBase58().slice(0, 4) +
                    ".." +
                    publicKey.toBase58().slice(-4)
                  }`}
                </motion.div>
              )}
            </div>
            {/* owned slimes area */}
            <div className={`flex items-start gap-3`}>
              {mySlimes.length > 0 &&
                mySlimes.map((slime, index) => {
                  return (
                    <div
                      key={index}
                      className="relative w-[100px] h-[100px] overflow-hidden rounded-lg border border-slimes-border shadow-lg"
                    >
                      <Image
                        src={slime.image}
                        alt={slime.name}
                        height={100}
                        width={100}
                        className="rounded-lg shadow-lg"
                      />
                    </div>
                  );
                })}
              {mySlimes.length === 0 && publicKey && (
                <motion.div
                  className="relative w-[100px] h-[100px] bg-custom-red cursor-pointer flex items-center justify-center overflow-hidden rounded-lg border border-slimes-border shadow-lg"
                  {...smallClickAnimation}
                  onClick={() => {
                    window.open(
                      "https://exchange.art/series/Slimes/nfts",
                      "_blank",
                      "noopener noreferrer"
                    );
                  }}
                >
                  <p className="p-3 text-sm text-white uppercase font-secondary text-center">
                    you need a slime friend
                  </p>
                </motion.div>
              )}

              {!publicKey && (
                <WalletMultiButton className="!bg-v2-green !text-slimes-black !border-none !rounded-lg !h-[60px] !w-[190px] !font-secondary !flex !items-center !justify-center !px-0 !text-sm !uppercase">
                  Connect Wallet
                </WalletMultiButton>
              )}
            </div>
          </div>
          {/* asset library */}
          <div className="pt-3">
            <p className="text-sm uppercase font-black text-slimes-black pb-4">
              Asset Library:
            </p>
            {selectedNft && (
              <div className="h-[100px] flex items-start gap-3">
                <Image
                  src={selectedNft?.image}
                  height={100}
                  width={100}
                  alt={selectedNft?.name}
                  className={`cursor-pointer rounded-lg shadow-lg border ${
                    selectedAssetType === "full-res"
                      ? "border-black"
                      : "border-slimes-border"
                  }`}
                  onClick={() => setSelectedAssetType("full-res")}
                />
                <div
                  className={`relative flex items-center justify-center w-[100px] h-[100px] 
                  overflow-hidden border rounded-lg shadow-lg cursor-pointer
                  ${
                    selectedAssetType === "desktop"
                      ? "border-black"
                      : "border-slimes-border"
                  }`}
                  onClick={() => setSelectedAssetType("desktop")}
                >
                  <Image
                    src={`/images/wallpapers/desktop-display/${selectedNft?.name
                      .replaceAll(" ", "_")
                      .toLowerCase()}.png`}
                    height={200}
                    width={200}
                    alt={`${selectedNft?.name} desktop wallpaper`}
                  />
                </div>
                <div
                  className={`relative flex items-center justify-center w-[100px] h-[100px] 
                  overflow-hidden border rounded-lg shadow-lg cursor-pointer 
                  ${
                    selectedAssetType === "mobile"
                      ? "border-black"
                      : "border-slimes-border"
                  }`}
                  onClick={() => setSelectedAssetType("mobile")}
                >
                  <Image
                    src={`/images/wallpapers/mobile-display/${selectedNft?.name
                      .replaceAll(" ", "_")
                      .toLowerCase()}.png`}
                    alt={`${selectedNft?.name} mobile wallpaper`}
                    height={100}
                    width={50}
                  />
                </div>
                <div
                  className={`relative w-[100px] h-[100px] overflow-hidden rounded-lg 
                  border shadow-lg cursor-pointer ${
                    selectedAssetType === "pfp"
                      ? "border-black"
                      : "border-slimes-border"
                  }`}
                  onClick={() => setSelectedAssetType("pfp")}
                >
                  <Image
                    src={`/images/wallpapers/pfp-crop/${selectedNft?.name
                      .replaceAll(" ", "_")
                      .toLowerCase()}.png`}
                    alt={`${selectedNft?.name} pfp crop`}
                    layout="fill"
                    objectFit="cover"
                    className="absolute inset-0 z-10 bg-transparent p-2"
                    style={{
                      clipPath: "circle(40% at 50% 50%)",
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <SlimesGrid
        slimes={slimes}
        setSlimes={setSlimes}
        selectedNft={selectedNft}
        setSelectedNft={setSelectedNft}
        setSelectedAssetType={setSelectedAssetType}
      />
    </motion.div>
  );
};

export default YourSlimes;
