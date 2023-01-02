import { FC } from "react";
import { LoadAnimation } from "@components";
import { fastExitAnimation, exitAnimation, midExitAnimation } from "@constants";
import Image from "next/image";
import { AnimatePresence, motion, useDragControls } from "framer-motion";

interface Props {
  background: string;
  showLogo: boolean;
  tokenId: number;
  isLoading: boolean;
  text: string;
  src: string;
}

const Form: FC<Props> = (props: Props) => {
  const { background, showLogo, tokenId, isLoading, text, src } = props;

  const controls = useDragControls();

  return (
    <div className="bg-orange-300 p-0.5 rounded-3xl">
      <div className="overflow-hidden p-2.5">
        <div className="relative rounded-2xl h-[562.5px] w-[275px] ">
          {/* mobile frame */}
          <div className="absolute rounded-2xl h-[562.5px] w-[275px] outline outline-[11px] outline-dark z-50" />
          <div className="absolute left-1/2 -translate-x-1/2 -top-1 h-5 w-20 bg-dark rounded-b-lg z-50" />
          {tokenId > 0 && (
            <>
              {isLoading ? (
                <motion.div key="loading" {...exitAnimation} className="z-100">
                  <LoadAnimation />
                </motion.div>
              ) : (
                <>
                  <motion.div
                    key="wallpaper"
                    id="wallpaper"
                    className={`flex flex-col justify-end items-center h-full transition-colors ease-in-out duration-200`}
                    style={{ backgroundColor: background }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <AnimatePresence mode="wait">
                      {showLogo && (
                        <motion.img
                          src={"/images/logo_base.png"}
                          height={40}
                          width={200}
                          alt="Logo"
                          className={`pt-24 px-6 z-50 cursor-pointer`}
                          drag
                          dragControls={controls}
                          id="logo"
                          {...fastExitAnimation}
                        />
                      )}
                    </AnimatePresence>
                    <motion.p
                      className="motion.px-5 py-2 cursor-pointer text-black text-center  z-50 "
                      drag
                      dragControls={controls}
                    >
                      {text}
                    </motion.p>
                    {/* token image */}
                    {src.length > 0 && (
                      <motion.div
                        {...fastExitAnimation}
                        className="transition-all ease-in-out duration-500 -mb-3 rounded-b-2xl"
                        id="token-image"
                        style={{ backgroundColor: background }}
                      >
                        <Image
                          src={src}
                          height={500}
                          width={500}
                          alt="NFT"
                          className="rounded-b-2xl"
                        />
                      </motion.div>
                    )}
                  </motion.div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Form;
