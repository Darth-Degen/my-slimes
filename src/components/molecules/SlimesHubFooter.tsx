import { FC } from "react";
import { motion } from "framer-motion";
import { useWindowSize } from "src/hooks";
import DiscordIcon from "../@icons/DiscordIcon";
import TwitterIcon from "../@icons/TwitterIcon";
import ExpIcon from "../@icons/ExpIcon";
import EaIcon from "../@icons/EaIcon";
import AitIcon from "../@icons/AitIcon";

interface Props {
  color: string;
}

const SlimesHubFooter: FC<Props> = ({ color }) => {
  const [winWidth, _] = useWindowSize();
  return (
    <div
      className="absolute bottom-0 w-full py-9 px-4 sm:px-10 xl:px-8"
      style={{ backgroundColor: color }}
    >
      <div className="w-full 3xl:max-w-[1800px] mx-auto flex items-center justify-between flex-col lg:flex-row gap-10 pb-8 lg:pb-0">
        <p className="lg:w-1/3 text-lg sm:text-2xl xl:text-4xl text-white font-black uppercase">
          All in Time.
          <br className="hidden lg:block" />
          With my Slimes.
        </p>
        <div className="xl:w-1/3 flex items-center justify-center xl:justify-center gap-6 lg:gap-10">
          {/* discord */}
          <div
            className="flex flex-col items-center justify-center gap-2 cursor-pointer"
            onClick={() => {
              window.open(
                "https://discord.gg/scumsol",
                "_blank",
                "noopener noreferrer"
              );
            }}
          >
            <DiscordIcon color={color} width={"40"} />
            <p className="text-white text-sm sm:text-lg font-black underline uppercase">
              Discord
            </p>
          </div>
          {/* twitter */}
          <div
            className="flex flex-col items-center justify-center gap-2 cursor-pointer"
            onClick={() => {
              window.open(
                "https://twitter.com/scumsol",
                "_blank",
                "noopener noreferrer"
              );
            }}
          >
            <TwitterIcon color={color} width={"40"} />
            <p className="text-white text-sm sm:text-lg font-black underline uppercase ">
              Twitter
            </p>
          </div>
          {/* ait */}
          <div
            className="flex flex-col items-center justify-center gap-2 cursor-pointer"
            onClick={() => {
              window.open(
                "https://twitter.com/scumsol",
                "_blank",
                "noopener noreferrer"
              );
            }}
          >
            <AitIcon color={color} className="w-[40px] h-[40px]" />
            <p className="text-white text-sm sm:text-lg font-black underline uppercase whitespace-nowrap">
              All in Time
            </p>
          </div>
          {/* ea */}
          <div
            className="flex flex-col items-center justify-center gap-2 cursor-pointer"
            onClick={() => {
              window.open(
                "https://twitter.com/scumsol",
                "_blank",
                "noopener noreferrer"
              );
            }}
          >
            <EaIcon color={color} className="w-[40px] h-[40px]" />
            <p className="text-white text-sm sm:text-lg font-black underline uppercase whitespace-nowrap">
              EA
            </p>
          </div>
        </div>
        {/* exp xl */}
        <div className="hidden lg:flex justify-end items-end w-1/3">
          <div
            className="w-fit flex flex-col items-center cursor-pointer"
            onClick={() => {
              window.open(
                "https://twitter.com/expstudio_",
                "_blank",
                "noopener noreferrer"
              );
            }}
          >
            <div className="bg-white w-20 h-12 mb-1 rounded-lg flex items-center justify-center">
              <ExpIcon color={color} />
            </div>

            <p className={`text-white text-center mt-1.5`}>powered by EXP</p>
          </div>
        </div>
      </div>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 lg:hidden">
        <a
          href="https://twitter.com/expstudio_"
          target="_blank"
          rel="noreferrer"
        >
          <p className="text-center text-xs text-white uppercase">
            Powered by EXP
          </p>
        </a>
      </div>
    </div>
  );
};

export default SlimesHubFooter;
