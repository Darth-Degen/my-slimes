import {
  Dispatch,
  SetStateAction,
  FC,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import { ImageShimmer, LogoIcon, ModalV2 } from "@components";
import {
  collection as collections,
  exitAnimation,
  smallClickAnimation,
  ViewContext,
} from "@constants";
import { AnimatePresence, motion } from "framer-motion";
import download from "downloadjs";
import Image from "next/image";

interface Props {
  imageId: number;
  setImageId: Dispatch<SetStateAction<number>>;
}

const GalleryModal: FC<Props> = (props: Props) => {
  const { imageId, setImageId } = props;

  const item = collections[imageId];
  const mainImage = `${process.env.NEXT_PUBLIC_CDN_URL}/images/wallpapers/pfp-crop/${item.tag}.png`;
  //fetches id from context
  const { galleryModalId } = useContext(ViewContext);

  const formatId = (id: number): string => `${id < 10 ? "00" : "0"}${id}`;

  return (
    <ModalV2
      show={galleryModalId !== -1}
      onClick={() => {
        setImageId(-1);
      }}
    >
      <div className="flex flex-col md:flex-row justify-between bg-v2-dark !bg-opacity-100 h-full w-full">
        {/* slime */}
        <motion.div
          transition={{ duration: 1 }}
          exit={{ opacity: 0 }}
          key="main"
          className="relative w-full h-full lg:w-full xl:w-[70vh] lg:h-[70vh] "
        >
          <Image
            src={mainImage}
            alt={`Slime ${imageId}`}
            fill
            // imageClass="!rounded-3xl"
            className="rounded-3xl"
          />
        </motion.div>
        {/* info */}
        <div className="relative flex flex-col items-center justify-center w-full md:w-1/2 h-full p-10 text-custom-primary ">
          <ImageShimmer
            src={`${process.env.NEXT_PUBLIC_CDN_URL}/images/modal-backsplash.png`}
            alt="splash"
            width={300}
            height={300}
          />
          <h3
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
            font-black uppercase text-4xl lg:text-8xl whitespace-nowrap`}
          >
            {item.name}
          </h3>
          <div className="absolute bottom-2 left-4">
            My Slime #{formatId(galleryModalId + 1)}
          </div>
          {!!!item.burned && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
              <motion.button
                {...smallClickAnimation}
                onClick={() => {
                  window.open(
                    `https://exchange.art/single/${item?.mintAddress}`,
                    "_blank",
                    "noopener noreferrer"
                  );
                }}
                className="flex flex-col items-center justify-center gap-2"
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_CDN_URL}/images/icons/exchangeArt.png`}
                  alt="exchange art"
                  width={30}
                  height={30}
                />
              </motion.button>
            </div>
          )}

          <div className="absolute bottom-2 right-4">
            <LogoIcon fill={"#F6EFD3"} width={40} height={40} animate={false} />
          </div>
          {item?.burned && (
            <p className="text-lg" {...exitAnimation}>
              R.I.P.
            </p>
          )}
        </div>
      </div>
    </ModalV2>
  );
};

export default GalleryModal;
