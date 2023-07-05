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
import { sfc, ViewContext } from "@constants";
import { AnimatePresence, motion } from "framer-motion";
import download from "downloadjs";
import Image from "next/image";

interface Props {
  imageId: number;
  setImageId: Dispatch<SetStateAction<number>>;
}

const SFCModal: FC<Props> = (props: Props) => {
  const { imageId, setImageId } = props;

  const item = sfc[imageId];
  const mainImage = `${process.env.NEXT_PUBLIC_CDN_URL}/images/sfc/${
    item.highResSrc ?? item.src
  }`;
  //fetches id from context
  const { sfcModalId } = useContext(ViewContext);

  const formatId = (id: number): string => `${id < 10 ? "00" : "0"}${id}`;

  return (
    <ModalV2
      show={sfcModalId !== -1}
      onClick={() => {
        setImageId(-1);
      }}
      className="w-[98%] h-[98%]  lg:h-[70vh] lg:w-[100vh] xl:w-[130vh] "
    >
      <div className="flex flex-col-reverse md:flex-row justify-evenly items-center bg-v2-dark !bg-opacity-100 h-full w-full gap-4 p-10">
        {/* image */}
        <motion.div
          transition={{ duration: 1 }}
          exit={{ opacity: 0 }}
          key="main"
          // className="relative w-full h-full lg:w-full xl:w-[70vh] lg:h-[70vh] "
          className="relative lg:w-[70vh] flex items-center justify-center"
        >
          <Image
            src={mainImage}
            alt={`Slime ${imageId}`}
            // style={{ objectFit: "contain" }}
            // fill
            width={item.width}
            height={item.height}
            className="rounded-3xl"
          />
        </motion.div>
        {/* info */}
        <div className="relative flex flex-col items-center justify-center w-full md:w-1/2 h-full lg:px-6 py-4 lg:py-20 text-custom-primary ">
          {/* bg image */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <ImageShimmer
              src={`${process.env.NEXT_PUBLIC_CDN_URL}/images/modal-backsplash.png`}
              alt="splash"
              width={300}
              height={300}
              className="opacity-40"
            />
          </div>
          {/* text */}
          <div className="flex flex-col z-10 gap-8 text-center items-center">
            <h3 className="font-black uppercase text-4xl lg:text-6xl  text-v2-green">
              {item.name}
            </h3>
            <div className="text-2xl lg:px-12 text-center">
              {item.description}
            </div>
          </div>
          <div className="hidden lg:block absolute bottom-2 left-4 text-xl">
            Artist: {item.artist}
          </div>
          <div className="hidden lg:block absolute bottom-2 right-4">
            <LogoIcon fill={"#F6EFD3"} width={40} height={40} animate={false} />
          </div>
        </div>
      </div>
    </ModalV2>
  );
};

export default SFCModal;
