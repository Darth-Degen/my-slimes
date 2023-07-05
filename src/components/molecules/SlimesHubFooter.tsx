import { FC } from "react";
import { motion } from "framer-motion";
import { useWindowSize } from "src/hooks";
import DiscordIcon from "../@icons/DiscordIcon";
import TwitterIcon from "../@icons/TwitterIcon";
import ExpIcon from "../@icons/ExpIcon";

interface Props {
  color: string;
}

const SlimesHubFooter: FC<Props> = ({ color }) => {
  const [winWidth, _] = useWindowSize();
  return (
    <div
      className="absolute bottom-0 w-full py-9 px-4 sm:px-10 xl:px-0"
      style={{ backgroundColor: color }}
    >
      <div className="w-full max-w-[1200px] mx-auto flex items-center justify-between">
        <p className="w-1/2 xl:w-1/3 text-lg sm:text-2xl xl:text-4xl text-white font-black uppercase">
          All in Time.
          <br />
          With my Slimes.
        </p>
        <div className="w-1/2 xl:w-1/3 flex items-center justify-end xl:justify-center gap-6 lg:gap-14">
          <motion.button
            className="flex flex-col items-center justify-center gap-2"
            onClick={() => {
              window.open(
                "https://discord.gg/9fZqQ2p9",
                "_blank",
                "noopener noreferrer"
              );
            }}
          >
            <DiscordIcon color={color} width={winWidth < 640 ? "20" : "40"} />
            <p className="text-white text-sm sm:text-lg font-black underline uppercase">
              Discord
            </p>
          </motion.button>
          <motion.button
            className="flex flex-col items-center justify-center gap-2"
            onClick={() => {
              window.open(
                "https://twitter.com/scumsol",
                "_blank",
                "noopener noreferrer"
              );
            }}
          >
            <TwitterIcon color={color} width={winWidth < 640 ? "20" : "40"} />
            <p className="text-white text-sm sm:text-lg font-black underline uppercase">
              Twitter
            </p>
          </motion.button>
        </div>
        <div className="hidden xl:block w-1/3">
          <motion.button
            className="w-fit mx-auto flex flex-col items-center"
            onClick={() => {
              window.open(
                "https://twitter.com/sol_exp",
                "_blank",
                "noopener noreferrer"
              );
            }}
          >
            <div className="bg-white w-20 h-12 mb-1 rounded-lg flex items-center justify-center">
              <ExpIcon color={color} />
            </div>

            <p className={`text-white text-center mt-1.5`}>powered by EXP</p>
          </motion.button>
        </div>
      </div>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 xl:hidden">
        <a href="https://twitter.com/sol_exp" target="_blank" rel="noreferrer">
          <p className="text-center text-xs text-white uppercase">
            Powered by EXP
          </p>
        </a>
      </div>
    </div>
  );
};

export default SlimesHubFooter;
