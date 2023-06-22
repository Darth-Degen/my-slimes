import { FC } from "react";
import Image from "next/image";
import { enterAnimation, smallClickAnimation } from "@constants";
import { motion } from "framer-motion";
import { ConnectButton, SlimeHubButton, WalletButton } from "@components";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

interface Props {}

const YourSlimes: FC<Props> = () => {
  const { connected, publicKey } = useWallet();
  return (
    <motion.div
      className="w-full flex items-start justify-center pt-8"
      {...enterAnimation}
    >
      <div className="w-fit rounded-xl overflow-hidden pr-5">
        <Image
          src="/images/slimeshub/pablo.png"
          width={450}
          height={450}
          alt="featured slime pfp"
        />
      </div>
      <div className="w-fit h-full pl-5">
        <p className="hub-name uppercase text-slimes-black">Pablo</p>
        <p className="font-secondary max-w-[300px] text-[9px] leading-[12px] text-slimes-black -mt-1">
          I feel like Pablo. Ye needs jesus. Blem if you read this text me “I’m
          a happy sappy poopsy woopsy” Wooptity poop.
        </p>
        {/* CTA buttons */}
        <div className="flex items-center gap-6 py-3">
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
          <p className="text-sm uppercase font-black text-slimes-black">
            Your Slime(s):
          </p>
          {publicKey !== null ? (
            <div className="flex items-center gap-2">icons here</div>
          ) : (
            <WalletMultiButton className="!bg-v2-green !text-slimes-black !border-none !rounded-lg !h-[60px] !w-[190px] !font-secondary !flex !items-center !justify-center !px-0 !text-sm !uppercase">
              Connect Wallet
            </WalletMultiButton>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default YourSlimes;
