import { FC, useState } from "react";
import Image from "next/image";
import { enterAnimation, smallClickAnimation } from "@constants";
import { motion } from "framer-motion";
import { SlimeHubButton } from "@components";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

interface Props {}

const YourSlimes: FC<Props> = () => {
  const { publicKey, disconnect } = useWallet();

  return (
    <motion.div
      className="w-full flex items-start justify-center pt-8"
      {...enterAnimation}
    >
      <div className="w-fit rounded-xl overflow-hidden pr-6">
        <Image
          src="/images/slimeshub/pablo.png"
          width={400}
          height={400}
          alt="featured slime pfp"
        />
      </div>
      <div className="w-[450px] h-full pl-6 -mt-3">
        <p className="hub-name uppercase text-slimes-black">Pablo</p>
        <p className="font-secondary max-w-[300px] text-[9px] leading-[12px] text-slimes-black -mt-1">
          I feel like Pablo. Ye needs jesus. Blem if you read this text me “I’m
          a happy sappy poopsy woopsy” Wooptity poop.
        </p>
        {/* CTA buttons */}
        <div className="flex items-center gap-6 py-4 min-h-[60px]">
          <motion.button
            className="bg-v2-green text-sm w-[190px] h-[60px] rounded-lg font-secondary text-slimes-black uppercase"
            {...smallClickAnimation}
            onClick={() => {
              window.open(
                "https://youtube.com/watch?v=dQw4w9WgXcQ",
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
            onClick={() => {
              window.open(
                "https://youtube.com/watch?v=dQw4w9WgXcQ",
                "_blank",
                "noopener noreferrer"
              );
            }}
          />
        </div>
        {/* your slimes - connect wallet or show icons */}
        <div>
          <div className="flex items-center gap-2 pb-3">
            <p className="text-sm uppercase font-black text-slimes-black">
              Your Slime(s):
            </p>
            {publicKey !== null && (
              <div
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
              </div>
            )}
          </div>
          {publicKey !== null ? (
            <div className="min-h-[60px]">icons here</div>
          ) : (
            <WalletMultiButton className="!bg-v2-green !text-slimes-black !border-none !rounded-lg !h-[60px] !w-[190px] !font-secondary !flex !items-center !justify-center !px-0 !text-sm !uppercase">
              Connect Wallet
            </WalletMultiButton>
          )}
        </div>
        {/* asset library */}
        <div className="pt-4">
          <p className="text-sm uppercase font-black text-slimes-black pb-3">
            Asset Library:
          </p>
          <div className="h-[100px] flex items-start gap-3">
            <Image
              src="/images/slimeshub/pablo.png"
              alt="pablo full"
              height={100}
              width={100}
              className="rounded-lg shadow-lg"
            />
            <div className="relative flex items-center justify-center w-[100px] h-[100px] overflow-hidden border border-slimes-border rounded-lg shadow-lg">
              <Image
                src="/images/wallpapers/desktop-display/pablo.png"
                alt="pablo desktop wallpaper"
                height={200}
                width={200}
              />
            </div>
            <div className="relative flex items-center justify-center w-[100px] h-[100px] overflow-hidden border border-slimes-border rounded-lg shadow-lg">
              <Image
                src="/images/wallpapers/mobile-display/pablo.png"
                alt="pablo mobile wallpaper"
                height={100}
                width={50}
              />
            </div>
            <div className="relative w-[100px] h-[100px] overflow-hidden rounded-lg border border-slimes-border shadow-lg">
              <Image
                src="/images/wallpapers/pfp-crop/pablo.png"
                alt="pablo pfp crop"
                layout="fill"
                objectFit="cover"
                className="absolute inset-0 z-10 bg-transparent p-2"
                style={{
                  clipPath: "circle(40% at 50% 50%)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default YourSlimes;
