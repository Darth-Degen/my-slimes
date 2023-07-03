import { FC, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { collection, enterAnimation, smallClickAnimation } from "@constants";
import { motion } from "framer-motion";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { getNftsByOwner } from "src/helpers";
import { Collection } from "src/types";
import { Scrollbar, SlimesGrid, FullResolutionDownload } from "@components";

interface Props {}

const YourSlimes: FC<Props> = () => {
  const { publicKey, disconnect } = useWallet();
  const { connection } = useConnection();

  const [slimes, setSlimes] = useState<Collection[]>([]); // all slimes in collection
  const [mySlimes, setMySlimes] = useState<Collection[]>([]); // all slimes in my wallet
  const [selectedNft, setSelectedNft] = useState<Collection>(); // selected slime
  const [selectedAssetType, setSelectedAssetType] = useState<
    "full-res" | "pfp" | "mobile" | "desktop"
  >("full-res"); // selected asset type of slime to display
  const [featuredImage, setFeaturedImage] = useState<string>(); // url of current featured image
  const [imageLoading, setImageLoading] = useState<boolean>(false); // loading state of featured image

  // fetch users nfts
  const getNfts = useCallback(async () => {
    if (!connection || !publicKey) {
      if (selectedNft) return;
      // default to scum's pfp (tokenUri)
      const scum: Collection = slimes.filter(
        (slime) => slime.name === "Scum"
      )[0];
      setSelectedNft(scum);
      setSelectedAssetType("full-res");
      return;
    }
    try {
      // connected wallet, now fetch all wallet tokens, filter for slimes, then fetch metadata
      const tokens = await getNftsByOwner(connection, publicKey);
      if (!tokens || typeof tokens === "string") return;

      // check collection for a mint address match
      const ownedSlimes = tokens.filter((token) => {
        return collection.some(
          (slime) => slime.mintAddress === token.address.toBase58()
        );
      });

      if (ownedSlimes.length === 0) {
        if (selectedNft) return;
        // default to scum's pfp (tokenUri)
        const scum: Collection = slimes.filter(
          (slime) => slime.name === "Scum"
        )[0];
        setSelectedNft(scum);
        setSelectedAssetType("full-res");
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
      // TODO: probs default to [0] index of owned slimes
    } catch (e: any) {
      console.error(e.message);
      toast.error(`Error fetching Slimes: ${e.message}`);
    }
  }, [connection, publicKey, slimes]);

  function getContrastYIQ() {
    if (selectedNft?.color === undefined) return "black";
    var r = parseInt(selectedNft?.color?.substr(0, 2), 16);
    var g = parseInt(selectedNft?.color?.substr(2, 2), 16);
    var b = parseInt(selectedNft?.color?.substr(4, 2), 16);
    var yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? "black" : "white";
  }

  // swap out display assets with actual images (i.e. desktop/mobile wallpapers)
  const handleDownload = () => {
    switch (selectedAssetType) {
      case "full-res":
        return selectedNft?.image;
      case "desktop":
        return `${
          process.env.NEXT_PUBLIC_CDN_URL
        }/images/wallpapers/desktop/${selectedNft?.name
          .replaceAll(" ", "-")
          .toLowerCase()}.png`;
      case "mobile":
        return `${
          process.env.NEXT_PUBLIC_CDN_URL
        }/images/wallpapers/mobile/${selectedNft?.name
          .replaceAll(" ", "-")
          .toLowerCase()}.png`;
      case "pfp":
        return `${
          process.env.NEXT_PUBLIC_CDN_URL
        }/images/wallpapers/pfp-crop/${selectedNft?.name
          .replaceAll(" ", "-")
          .toLowerCase()}.png`;
      default:
        return selectedNft?.image;
    }
  };

  // manage featured image path based on selected asset type
  useEffect(() => {
    setImageLoading(true);
    if (selectedNft) {
      switch (selectedAssetType) {
        case "full-res":
          setFeaturedImage(selectedNft.image);
          break;
        case "desktop":
          setFeaturedImage(
            `${
              process.env.NEXT_PUBLIC_CDN_URL
            }/images/wallpapers/desktop-display/${selectedNft?.name
              .replaceAll(" ", "-")
              .toLowerCase()}.png`
          );
          break;
        case "mobile":
          setFeaturedImage(
            `${
              process.env.NEXT_PUBLIC_CDN_URL
            }/images/wallpapers/mobile-display/${selectedNft?.name
              .replaceAll(" ", "-")
              .toLowerCase()}.png`
          );
          break;
        case "pfp":
          setFeaturedImage(
            `${
              process.env.NEXT_PUBLIC_CDN_URL
            }/images/wallpapers/pfp-crop/${selectedNft?.name
              .replaceAll(" ", "-")
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
    if (slimes) {
      getNfts();
    }
  }, [getNfts, slimes]);

  return (
    <motion.div
      className="relative w-full max-w-[1200px] mx-auto"
      {...enterAnimation}
    >
      {/* <Scrollbar> */}
      <div
        className="w-fit lg:w-full mx-auto flex flex-col lg:flex-row 
        items-center lg:items-start justify-center px-4 xl:px-0 pt-8"
      >
        {selectedNft && (
          <div className="flex flex-col items-center justify-center">
            {/* TODO: manage loading states (both initial and in between asset type changes) */}
            <motion.div
              className="relative flex items-center justify-center lg:h-[500px] lg:w-[500px] lg:mr-6"
              {...enterAnimation}
              key={selectedNft?.name ?? "placeholder"}
            >
              <Image
                src={
                  featuredImage ||
                  `${process.env.NEXT_PUBLIC_CDN_URL}/images/exp/logo-dark.svg`
                }
                width={selectedAssetType === "mobile" ? 250 : 500}
                height={500}
                alt="featured slime asset"
                className="rounded-xl overflow-hidden"
                onLoad={() => setImageLoading(false)}
                style={{
                  transition: "opacity 0.5s",
                  opacity: imageLoading ? 0 : 1,
                }}
              />
            </motion.div>
            <FullResolutionDownload imageUrl={handleDownload()} />
          </div>
        )}
        <div className="w-full lg:w-[600px] h-full lg:ml-6 mt-3 lg:-mt-3">
          <p className="hub-name uppercase text-slimes-black">
            {selectedNft?.name}
          </p>
          <p className="font-secondary max-w-[300px] text-xs text-[10px] leading-[12px] text-slimes-black -mt-1">
            {selectedNft?.description}
          </p>
          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-start lg:items-center gap-3 lg:gap-6 py-4 min-h-[60px]">
            <motion.button
              initial={{ backgroundColor: selectedNft?.color }}
              animate={{ backgroundColor: selectedNft?.color }}
              transition={{ duration: 0.69, ease: "easeInOut" }}
              className={`text-sm w-full sm:w-[190px] h-[60px] rounded-lg font-secondary text-slimes-black uppercase`}
              style={{
                backgroundColor: selectedNft?.color,
                color: getContrastYIQ(),
              }}
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
            <motion.button
              initial={{ backgroundColor: selectedNft?.color }}
              animate={{ backgroundColor: selectedNft?.color }}
              transition={{ duration: 0.69, ease: "easeInOut" }}
              className="text-sm w-full line-through sm:w-[190px] h-[60px] rounded-lg font-secondary text-slimes-black uppercase"
              style={{
                backgroundColor: selectedNft?.color,
                color: getContrastYIQ(),
              }}
              {...smallClickAnimation}
              // onClick={() => {
              //   window.open(
              //     `https://exchange.art/single/${selectedNft?.mintAddress}`,
              //     "_blank",
              //     "noopener noreferrer"
              //   );
              // }}
            >
              Redeem Merch
            </motion.button>
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
                        src={
                          slime.image ||
                          `${process.env.NEXT_PUBLIC_CDN_URL}/images/exp/logo-dark.svg`
                        }
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
                <motion.div
                  className="!h-[60px] !w-[190px] !border-none !rounded-lg !px-0"
                  initial={{ backgroundColor: selectedNft?.color }}
                  animate={{ backgroundColor: selectedNft?.color }}
                  transition={{ duration: 0.69, ease: "easeInOut" }}
                  {...smallClickAnimation}
                >
                  <WalletMultiButton
                    className="!w-full !h-full !font-secondary !rounded-lg !bg-transparent !flex !items-center !justify-center !text-sm !uppercase"
                    style={{
                      backgroundColor: selectedNft?.color,
                      color: getContrastYIQ(),
                    }}
                  >
                    Connect Wallet
                  </WalletMultiButton>
                </motion.div>
              )}
            </div>
          </div>
          {/* asset library */}
          <div className="pt-3">
            <p className="text-sm uppercase font-black text-slimes-black pb-4">
              Asset Library:
            </p>
            {selectedNft && (
              <div className="w-full h-[100px] flex items-start gap-3 overflow-x-auto">
                <Image
                  src={
                    selectedNft?.image ||
                    `${process.env.NEXT_PUBLIC_CDN_URL}/images/exp/logo-dark.svg`
                  }
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
                    src={`${
                      process.env.NEXT_PUBLIC_CDN_URL
                    }/images/wallpapers/desktop-display/${selectedNft?.name
                      .replaceAll(" ", "-")
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
                    src={`${
                      process.env.NEXT_PUBLIC_CDN_URL
                    }/images/wallpapers/mobile-display/${selectedNft?.name
                      .replaceAll(" ", "-")
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
                    src={`${
                      process.env.NEXT_PUBLIC_CDN_URL
                    }/images/wallpapers/pfp-crop/${selectedNft?.name
                      .replaceAll(" ", "-")
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
      {/* </Scrollbar> */}
    </motion.div>
  );
};

export default YourSlimes;
