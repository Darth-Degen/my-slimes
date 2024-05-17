import { Dispatch, SetStateAction, FC, useContext } from "react";
import { ImageShimmer, LogoIcon, ModalV2 } from "@components";
import { sfc, smallClickAnimation, ViewContext } from "@constants";
import { motion } from "framer-motion";
import Image from "next/image";

interface Props {
  imageId: number;
  setImageId: Dispatch<SetStateAction<number>>;
}

const SFCModal: FC<Props> = (props: Props) => {
  const { imageId, setImageId } = props;

  const item = sfc[imageId];
  const mainImage = `${process.env.cloudflareStorage}/images/sfc/low-res/${item.src}`;
  //fetches id from context
  const { sfcModalId } = useContext(ViewContext);

  return (
    <ModalV2
      show={sfcModalId !== -1}
      onClick={() => {
        setImageId(-1);
      }}
      className="w-[98%] h-[98%] lg:h-[70vh] lg:w-[100vh] xl:w-[130vh] "
    >
      <div className="relative flex flex-col-reverse md:flex-row justify-evenly items-center bg-v2-dark !bg-opacity-100 h-full w-full gap-4 px-10">
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
            alt={`SFC ${imageId}`}
            // style={{ objectFit: "contain" }}
            // fill
            width={item.width}
            height={item.height}
            className="rounded-3xl"
          />
        </motion.div>
        {/* info */}
        <div className="relative flex flex-col items-center justify-center w-full md:w-1/2 h-full gap-8 lg:px-6 text-custom-primary">
          <h3 className="z-30 text-center font-black uppercase text-4xl lg:text-6xl  text-v2-green">
            {item.name}
          </h3>
          <div className="relative">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <ImageShimmer
                src={`${process.env.cloudflareStorage}/images/modal-backsplash.png`}
                alt="splash"
                width={300}
                height={300}
                className="opacity-40"
              />
            </div>
            {/* text */}
            <div className="flex flex-col z-10 gap-6 text-center items-center">
              <div className="z-20 text-xl lg:px-12 text-center">
                {item.description}
              </div>
            </div>
          </div>
          <div className="flex gap-1 items-center">
            <p className="z-20 text-2xl">{`Artist${
              item.artist.length > 1 ? "s" : ""
            }: `}</p>
            {item.artist.map((artist, index) => {
              const isLast = index === item.artist.length - 1;
              return (
                <>
                  <p
                    className="cursor-pointer z-20 text-2xl text-center underline text-v2-green"
                    onClick={() =>
                      window.open(
                        item.twitter[index],
                        "_blank",
                        "noopener noreferrer"
                      )
                    }
                    key={index}
                  >
                    {artist}
                  </p>
                  {!isLast && "& "}
                </>
              );
            })}
          </div>
          <div className="absolute bottom-4 left-4">
            <motion.button
              {...smallClickAnimation}
              onClick={() => {
                window.open(`${item?.url}`, "_blank", "noopener noreferrer");
              }}
              className="flex flex-col items-center justify-center gap-2"
            >
              <Image
                src={`${process.env.cloudflareStorage}/images/icons/exchangeArt.png`}
                alt="exchange art"
                width={35}
                height={35}
              />
            </motion.button>
          </div>
        </div>
        <div className="hidden lg:block absolute bottom-4 right-4">
          <LogoIcon fill={"#F6EFD3"} width={40} height={40} animate={false} />
        </div>
      </div>
    </ModalV2>
  );
};

export default SFCModal;
