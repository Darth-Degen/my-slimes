import { FC, useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import {
  midExitAnimation,
  fastExitAnimation,
  smallClickAnimation,
  collection,
} from "@constants";
import { AnimatePresence, motion } from "framer-motion";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { getNftsByOwner } from "src/helpers";
import { Collection } from "src/types";
import ReactLoading from "react-loading";
import {
  AssetLibrary,
  Scrollbar,
  SlimesGrid,
  FullResolutionDownload,
  SlimeToggler,
  LoadAnimation,
  SlimeImage,
} from "@components";
import { Metaplex } from "@metaplex-foundation/js";
import { PublicKey } from "@solana/web3.js";
import axios from "axios";

interface Props {}

const YourSlimes: FC<Props> = () => {
  const { publicKey, disconnect } = useWallet();
  const { connection } = useConnection();

  const [slimes, setSlimes] = useState<Collection[]>([]); // all slimes in collection
  const [mySlimes, setMySlimes] = useState<Collection[]>([]); // all slimes in my wallet
  const [selectedNft, setSelectedNft] = useState<Collection>(); // selected slime
  const [selectedAssetType, setSelectedAssetType] = useState<
    "full-res" | "pfp" | "mobile" | "desktop" | "banner"
  >("full-res"); // selected asset type of slime to display
  const [featuredImage, setFeaturedImage] = useState<string>(); // url of current featured image
  const [imageLoading, setImageLoading] = useState<boolean>(true); // loading state of featured image
  const [isDark, setIsDark] = useState(false);
  const [buttonColor, setButtonColor] = useState<string>(collection[0].color);

  const imageToggleRef = useRef<number>(0);

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
      const ownedSlimes = slimes.filter((slime) => {
        return tokens.some((token) => {
          if (token.address.toBase58()) {
            //@ts-ignore
            return slime.mintAddress === token.mintAddress.toBase58();
          }
          return false;
        });
      });

      console.log("owned slimes", ownedSlimes);

      if (ownedSlimes.length === 0) {
        if (selectedNft) return;
        // default to scum's pfp (tokenUri)
        const scum: Collection = slimes.filter(
          (slime) => slime.name === "Scum"
        )[0];
        setSelectedNft(scum);
        setSelectedAssetType("full-res");
        return;
      } else {
        // must have slimes, use slimes variable to set ownedSlimes
        setMySlimes(ownedSlimes);
        if (selectedNft) return;
        // default to [0] index of owned slimes
        setSelectedNft(ownedSlimes[0]);
      }
    } catch (e: any) {
      console.error(e.message);
      toast.error(`Error fetching Slimes: ${e.message}`);
    }
  }, [connection, publicKey, slimes, selectedNft]);

  function getContrastYIQ() {
    if (selectedNft?.color === undefined) return "white";
    var r = parseInt(selectedNft?.color?.substr(0, 2), 16);
    var g = parseInt(selectedNft?.color?.substr(2, 2), 16);
    var b = parseInt(selectedNft?.color?.substr(4, 2), 16);
    var yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? "black" : "white";
  }

  // swap out display assets with actual images (i.e. desktop/mobile wallpapers)
  const handleDownload = () => {
    if (!selectedNft) {
      return `${process.env.cloudflareStorage}/images/wallpapers/image/scum.png`;
    }
    var imageName = `${isDark ? "dark-" : ""}${selectedNft?.name
      .replaceAll(" ", "-")
      .toLowerCase()}`;
    switch (selectedAssetType) {
      case "full-res":
        // return `${process.env.cloudflareStorage}/images/wallpapers/image/${imageName}.png`;

        return `${process.env.cloudflareStorage}/images/slimes/high-res/${imageName}.png`;
      case "desktop":
        return `${process.env.cloudflareStorage}/images/wallpapers/desktop/${imageName}.png`;
      case "mobile":
        return `${process.env.cloudflareStorage}/images/wallpapers/mobile/${imageName}.png`;
      case "pfp":
        return `${process.env.cloudflareStorage}/images/wallpapers/pfp-crop/${imageName}.png`;
      case "banner":
        return `${process.env.cloudflareStorage}/images/wallpapers/banner/${imageName}.png`;
      default:
        return `${process.env.cloudflareStorage}/images/wallpapers/image/${imageName}.png`;
    }
  };

  useEffect(() => {
    if (slimes) {
      getNfts();
    }
  }, [getNfts, slimes]);

  useEffect(() => {
    if (!selectedNft) return;
    if (isDark) {
      setButtonColor("#242424");
    } else {
      setButtonColor(selectedNft.color);
    }
  }, [isDark, selectedNft]);

  useEffect(() => {
    imageToggleRef.current += 1;
  }, [featuredImage]);

  // const endpoint =
  //   "https://mainnet.helius-rpc.com/?api-key=fd98bcfd-5344-4cc0-8ac1-db7ba9603613";
  // const connection = new Connection(endpoint);
  const metaplex = new Metaplex(connection);

  const fetchAllSlimes = useCallback(async () => {
    if (slimes.length > 0) return;

    await Promise.all(
      collection.map(async (token, index) => {
        if (!token?.mintAddress) return;
        const mintAddress = new PublicKey(token.mintAddress);

        try {
          const nft = await metaplex.nfts().findByMint({ mintAddress });
          const uri = nft?.uri;

          await axios.get(uri).then((r) => {
            // push mintAddress, id, and color to the json object
            r.data.mintAddress = token.mintAddress;
            r.data.id = token.id;
            r.data.color = token.color;

            setSlimes((prev) => [...prev, r.data]);
          });
        } catch (e: any) {
          console.error(e.message);
        }
      })
    );
  }, []);

  useEffect(() => {
    fetchAllSlimes();
  }, [fetchAllSlimes]);

  return (
    <motion.div
      className="relative w-full max-w-[1200px] mx-auto overflow-x-hidden pb-20"
      {...midExitAnimation}
    >
      <div
        className={`w-full sm:w-fit lg:w-full mx-auto flex flex-col lg:flex-row 
        items-center lg:items-start justify-center px-10 xl:px-0 pt-8 overflow-x-auto
        ${imageLoading ? "opacity-0" : "opacity-100"}`}
      >
        {/* display image */}
        <div className="flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            {selectedAssetType === "full-res" &&
              imageToggleRef.current % 2 === 0 && (
                <SlimeImage
                  key={selectedAssetType}
                  featuredImage={featuredImage}
                  isDark={isDark}
                  setImageLoading={setImageLoading}
                />
              )}
            {selectedAssetType === "full-res" &&
              imageToggleRef.current % 2 === 1 && (
                <SlimeImage
                  key={"full-res-1"}
                  featuredImage={featuredImage}
                  isDark={isDark}
                  setImageLoading={setImageLoading}
                />
              )}
            {selectedAssetType === "desktop" && (
              <SlimeImage
                key={selectedAssetType}
                featuredImage={featuredImage}
                isDark={isDark}
                setImageLoading={setImageLoading}
              />
            )}
            {selectedAssetType === "mobile" && (
              <SlimeImage
                key={selectedAssetType}
                featuredImage={featuredImage}
                isDark={isDark}
                setImageLoading={setImageLoading}
                width={300}
              />
            )}
            {selectedAssetType === "banner" && (
              <SlimeImage
                key={selectedAssetType}
                featuredImage={featuredImage}
                isDark={isDark}
                setImageLoading={setImageLoading}
                height={250}
              />
            )}
            {selectedAssetType === "pfp" && (
              <SlimeImage
                key={selectedAssetType}
                featuredImage={featuredImage}
                isDark={isDark}
                setImageLoading={setImageLoading}
              />
            )}
          </AnimatePresence>
          <FullResolutionDownload
            imageUrl={handleDownload()}
            color={buttonColor}
          />
        </div>
        {/* image info & options */}
        <div className="w-full lg:w-[600px] h-full lg:ml-6 mt-3 lg:-mt-3">
          <div className="flex items-center gap-6">
            <p className="hub-name uppercase text-slimes-black -ml-1">
              {selectedNft?.name ?? "scum"}
            </p>
            <SlimeToggler
              selectedNft={selectedNft?.name}
              isDark={isDark}
              setIsDark={setIsDark}
            />
          </div>

          <p className="font-secondary w-full xl:max-w-[392px] min-h-[30px] text-xs text-[10px] leading-[12px] text-slimes-black -mt-1">
            {selectedNft?.description ??
              "Leader of the slimes. Best friend named Paco. Love's drawing, hip hop and movies. Once defeated a jaguar in hand to hand combat."}
          </p>
          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-start lg:items-center gap-3 lg:gap-6 py-4 min-h-[60px]">
            <motion.button
              initial={{ backgroundColor: buttonColor }}
              animate={{ backgroundColor: buttonColor }}
              transition={{ duration: 0.69, ease: "easeInOut" }}
              className={`text-sm w-full sm:w-[190px] h-[60px] rounded-lg font-secondary text-slimes-black uppercase`}
              style={{
                backgroundColor: buttonColor,
                color: getContrastYIQ(),
              }}
              // {...smallClickAnimation}
              onClick={() => {
                if (selectedNft?.mintAddress) {
                  window.open(
                    `https://exchange.art/single/${selectedNft?.mintAddress}`,
                    "_blank",
                    "noopener noreferrer"
                  );
                } else {
                  window.open(
                    "https://exchange.art/series/Slimes/nfts?sort=newest_listed&filters=%7B%22currencies%22:%5B%5D%7D",
                    "_blank",
                    "noopener noreferrer"
                  );
                }
              }}
            >
              Exchange Art
            </motion.button>
            <motion.button
              initial={{ backgroundColor: buttonColor }}
              animate={{ backgroundColor: buttonColor }}
              transition={{ duration: 0.69, ease: "easeInOut" }}
              disabled={true}
              className="text-sm w-full line-through sm:w-[190px] h-[60px] 
              rounded-lg font-secondary text-slimes-black uppercase cursor-not-allowed"
              style={{
                backgroundColor: buttonColor,
                color: getContrastYIQ(),
              }}
              // {...smallClickAnimation}
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
                  // {...smallClickAnimation}
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
              {publicKey &&
                mySlimes.length > 0 &&
                mySlimes.map((slime, index) => {
                  return (
                    <div
                      key={index}
                      className={`${
                        mySlimes[index] === selectedNft
                          ? "border-slimes-black"
                          : "border-transparent"
                      } 
                      relative w-[100px] h-[100px] overflow-hidden rounded-lg border cursor-pointer`}
                      onClick={() => {
                        setSelectedNft(mySlimes[index]);
                      }}
                    >
                      <Image
                        src={
                          slime.image ||
                          `${process.env.cloudflareStorage}/images/exp/logo-dark.svg`
                        }
                        alt={slime.name}
                        height={100}
                        width={100}
                        className="rounded-lg"
                      />
                    </div>
                  );
                })}
              {mySlimes.length === 0 && publicKey && (
                <motion.div
                  className="relative w-[100px] h-[100px] bg-custom-red cursor-pointer flex items-center justify-center overflow-hidden rounded-lg border border-slimes-border shadow-lg"
                  // {...smallClickAnimation}
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
                  initial={{ backgroundColor: buttonColor }}
                  animate={{ backgroundColor: buttonColor }}
                  transition={{ duration: 0.69, ease: "easeInOut" }}
                  // {...smallClickAnimation}
                >
                  <WalletMultiButton
                    className="!w-full !h-full !font-secondary !rounded-lg !bg-transparent !flex !items-center !justify-center !text-sm !uppercase"
                    style={{
                      backgroundColor: buttonColor,
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
          <div className="pt-4">
            <p className="text-sm uppercase font-black text-slimes-black pb-4">
              Asset Library:
            </p>
            {selectedNft && (
              <AssetLibrary
                selectedNft={selectedNft}
                selectedAssetType={selectedAssetType}
                setSelectedAssetType={setSelectedAssetType}
                isDark={isDark}
                setFeaturedImage={setFeaturedImage}
                setImageLoading={setImageLoading}
              />
            )}
          </div>
        </div>
      </div>
      {/* {imageLoading && (
        <div
          className={`${
            imageLoading ? "opacity-100" : "opacity-0"
          } absolute top-0 w-screen h-[500px] flex flex-col items-center justify-center`}
        >
          <ReactLoading type={"balls"} color={collection[0].color} />
        </div>
      )} */}

      <SlimesGrid
        slimes={slimes}
        setSlimes={setSlimes}
        selectedNft={selectedNft}
        setSelectedNft={setSelectedNft}
        setSelectedAssetType={setSelectedAssetType}
        setIsDark={setIsDark}
      />
      {/* </Scrollbar> */}
    </motion.div>
  );
};

export default YourSlimes;
