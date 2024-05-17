import Image from "next/image";
import { Dispatch, FC, SetStateAction } from "react";
import { Collection } from "src/types";
import { collection, enterAnimation } from "src/constants";
import { motion } from "framer-motion";
import ReactLoading from "react-loading";

interface Props {
  slimes: Collection[];
  setSlimes: Dispatch<SetStateAction<Collection[]>>;
  selectedNft: Collection | undefined;
  setSelectedNft: Dispatch<SetStateAction<Collection | undefined>>;
  setSelectedAssetType: Dispatch<
    SetStateAction<"full-res" | "pfp" | "mobile" | "desktop" | "banner">
  >;
  setIsDark: Dispatch<SetStateAction<boolean>>;
}

const SlimesGrid: FC<Props> = ({
  slimes,
  selectedNft,
  setSelectedNft,
  setSelectedAssetType,
  setIsDark,
}) => {
  // console.log("slimes ", slimes.length, slimes);
  return (
    <div className="relative min-h-[600px] 2xl:min-h-[800px]">
      {slimes && slimes.length > 0 ? (
        // {false ? (
        <div
          className="relative w-full h-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 
        xl:grid-cols-5 gap-6 py-10 px-10 sm:px-[37px] xl:px-0 mb-40"
        >
          {slimes
            .sort((a, b) => a.id - b.id)
            .map((slime) => {
              return (
                <div
                  className="col-span-1 flex flex-col items-center"
                  key={slime?.id}
                >
                  <motion.div
                    className={`${
                      selectedNft?.name === slime?.name
                        ? "border-slimes-black"
                        : "border-transparent"
                    } relative border-2 rounded-xl overflow-hidden `}
                    {...enterAnimation}
                  >
                    <Image
                      src={
                        `${
                          process.env.cloudflareStorage
                        }/images/slimes/low-res/${slime?.name
                          .toLocaleLowerCase()
                          .replace(" ", "-")}.jpg` ||
                        `${process.env.cloudflareStorage}/images/exp/logo-dark.svg`
                      }
                      width={250}
                      height={250}
                      alt={slime?.name}
                      onClick={() => {
                        setSelectedNft(slime);
                        setIsDark(false);
                        setSelectedAssetType("full-res");
                        scroll({ top: 0, behavior: "smooth" });
                      }}
                      className="
                  cursor-pointer transition-all duration-500 ease-in-out lg:hover:scale-125"
                    />
                  </motion.div>
                  <p className="text-slimes-black font-secondary">
                    {slime?.name}
                  </p>
                  <p className="text-slimes-black font-bold text-sm">{`No. ${
                    slime?.id + 1 < 10 ? "00" : "0"
                  }${slime?.id + 1}`}</p>
                </div>
              );
            })}
        </div>
      ) : (
        <div className="w-full flex justify-center pt-20">
          <ReactLoading type={"bubbles"} color={collection[0].color} />
        </div>
      )}
    </div>
  );
};

export default SlimesGrid;
