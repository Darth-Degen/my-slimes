import { Dispatch, FC, SetStateAction, useEffect } from "react";
import Image from "next/image";
import { Collection } from "src/types";

interface Props {
  selectedNft: Collection;
  selectedAssetType: "full-res" | "pfp" | "mobile" | "desktop" | "banner";
  setSelectedAssetType: Dispatch<
    SetStateAction<"full-res" | "pfp" | "mobile" | "desktop" | "banner">
  >;
  isDark: boolean;
  setFeaturedImage: Dispatch<SetStateAction<string | undefined>>;
  setImageLoading: Dispatch<SetStateAction<boolean>>;
}

const AssetLibrary: FC<Props> = ({
  selectedNft,
  selectedAssetType,
  setSelectedAssetType,
  isDark,
  setFeaturedImage,
  setImageLoading,
}) => {
  // manage featured image path based on selected asset type
  useEffect(() => {
    // setImageLoading(true);
    var imageName = `${isDark ? "dark-" : ""}${selectedNft?.name
      .replaceAll(" ", "-")
      .toLowerCase()}`;
    if (selectedNft) {
      switch (selectedAssetType) {
        case "full-res":
          setFeaturedImage(
            `${process.env.cloudflarestorage}/images/wallpapers/image/${imageName}.png`
          );
          break;
        case "desktop":
          setFeaturedImage(
            `${process.env.cloudflarestorage}/images/wallpapers/desktop-display/${imageName}.png`
          );
          break;
        case "mobile":
          setFeaturedImage(
            `${process.env.cloudflarestorage}/images/wallpapers/mobile-display/${imageName}.png`
          );
          break;
        case "pfp":
          setFeaturedImage(
            `${process.env.cloudflarestorage}/images/wallpapers/pfp-crop/${imageName}.png`
          );
          break;
        case "banner":
          setFeaturedImage(
            `${process.env.cloudflarestorage}/images/wallpapers/banner/${imageName}.png`
          );
          break;
        default:
          `${process.env.cloudflarestorage}/images/wallpapers/image/${imageName}.png`;
          break;
      }
    }
  }, [selectedNft, selectedAssetType, isDark]);

  return (
    <div className="w-full flex flex-wrap items-start gap-3 overflow-x-auto">
      <Image
        src={`${process.env.cloudflarestorage}/images/wallpapers/image/${
          selectedNft?.name === "Kai" && isDark ? "dark-" : ""
        }${selectedNft?.name.replaceAll(" ", "-").toLowerCase()}.png`}
        height={100}
        width={100}
        alt={selectedNft?.name}
        className={`cursor-pointer rounded-lg shadow-lg border w-[75px] md:w-[100px] h-[75px] md:h-[100px] ${
          selectedAssetType === "full-res"
            ? "border-black"
            : "border-slimes-border"
        }`}
        onClick={() => setSelectedAssetType("full-res")}
      />
      <div
        className={`relative flex items-center justify-center w-[75px] md:w-[100px] h-[75px] md:h-[100px] 
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
            process.env.cloudflarestorage
          }/images/wallpapers/desktop-display/${
            selectedNft?.name === "Kai" && isDark ? "dark-" : ""
          }${selectedNft?.name.replaceAll(" ", "-").toLowerCase()}.png`}
          height={200}
          width={200}
          alt={`${selectedNft?.name} desktop wallpaper`}
        />
      </div>
      <div
        className={`relative flex items-center justify-center w-[75px] md:w-[100px] h-[75px] md:h-[100px] 
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
            process.env.cloudflarestorage
          }/images/wallpapers/mobile-display/${
            selectedNft?.name === "Kai" && isDark ? "dark-" : ""
          }${selectedNft?.name.replaceAll(" ", "-").toLowerCase()}.png`}
          alt={`${selectedNft?.name} mobile wallpaper`}
          height={75}
          width={40}
        />
      </div>
      <div
        className={`relative w-[75px] md:w-[100px] h-[75px] md:h-[100px] overflow-hidden rounded-lg 
        border shadow-lg cursor-pointer ${
          selectedAssetType === "pfp" ? "border-black" : "border-slimes-border"
        }`}
        onClick={() => setSelectedAssetType("pfp")}
      >
        <Image
          src={`${process.env.cloudflarestorage}/images/wallpapers/pfp-crop/${
            selectedNft?.name === "Kai" && isDark ? "dark-" : ""
          }${selectedNft?.name.replaceAll(" ", "-").toLowerCase()}.png`}
          alt={`${selectedNft?.name} pfp crop`}
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-10 bg-transparent p-2"
          style={{
            clipPath: "circle(40% at 50% 50%)",
          }}
        />
      </div>
      {/* banner */}
      <div
        className={`relative w-[75px] md:w-[100px] h-[75px] md:h-[100px] overflow-hidden rounded-lg 
        border shadow-lg cursor-pointer flex items-center justify-center ${
          selectedAssetType === "banner"
            ? "border-black"
            : "border-slimes-border"
        }`}
        onClick={() => setSelectedAssetType("banner")}
      >
        <Image
          src={`${process.env.cloudflarestorage}/images/wallpapers/banner/${
            selectedNft?.name === "Kai" && isDark ? "dark-" : ""
          }${selectedNft?.name.replaceAll(" ", "-").toLowerCase()}.png`}
          height={100}
          width={200}
          alt={`${selectedNft?.name} pfp crop`}
          className="z-10 bg-transparent p-2"
        />
      </div>
    </div>
  );
};

export default AssetLibrary;
