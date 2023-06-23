import { FC } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { smallClickAnimation } from "@merch-constants";

const SlimesHubFooter: FC = () => {
  return (
    <div className="absolute bottom-0 w-full py-9 bg-v2-green">
      <div className="w-full max-w-[1200px] mx-auto flex items-center justify-between">
        <p className="w-1/3 text-4xl text-white font-black uppercase">
          Connect with your slimes here
        </p>
        <div className="w-1/3 flex items-center justify-center gap-14">
          <motion.button
            className="flex flex-col items-center justify-center gap-2"
            {...smallClickAnimation}
            onClick={() => {
              window.open(
                "https://discord.gg/9fZqQ2p9",
                "_blank",
                "noopener noreferrer"
              );
            }}
          >
            <Image
              src="/images/icons/slimes.svg"
              width={40}
              height={40}
              alt="slimes social icon"
            />
            <p className="text-white text-lg font-black underline uppercase">
              Discord
            </p>
          </motion.button>
          <motion.button
            className="flex flex-col items-center justify-center gap-2"
            {...smallClickAnimation}
            onClick={() => {
              window.open(
                "https://twitter.com/scumsol",
                "_blank",
                "noopener noreferrer"
              );
            }}
          >
            <Image
              src="/images/icons/slimes.svg"
              width={40}
              height={40}
              alt="slimes social icon"
            />
            <p className="text-white text-lg font-black underline uppercase">
              Twitter
            </p>
          </motion.button>
        </div>
        <div className="w-1/3" />
      </div>
    </div>
  );
};

export default SlimesHubFooter;
