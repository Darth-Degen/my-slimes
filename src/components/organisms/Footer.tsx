import { FC } from "react";
import { motion } from "framer-motion";
import { underlineAnimation } from "@constants";
import { LogoText, ExpIcon } from "@components";
import Link from "next/link";
import Image from "next/image";
interface Props {
  backgroundAccentColor?: string;
  textColor?: string;
  hex?: string;
  mainColor?: string;
}

const Footer: FC<Props> = (props: Props) => {
  const {
    backgroundAccentColor = "bg-white",
    textColor = "text-white",
    hex = "#FFFFFF",
    mainColor = "#8BD2B9",
  } = props;

  const UnderlineAnimation = () => {
    return (
      <motion.div
        {...underlineAnimation}
        className={`absolute bottom-0 left-0 h-full w-full bg-transparent border-b`}
      />
    );
  };

  const text = () => {
    switch (mainColor) {
      case "#356551":
        return "text-[#356551]";
      case "#FE6B2F":
        return "text-[#FE6B2F]";
      case "#90CFBC":
        return "text-[#90CFBC]";
      case "#5A4E42":
        return "text-[#5A4E42]";
      case "#81a2e8":
        return "text-[#81a2e8]";
      case "#2A4F43":
        return "text-[#2A4F43]";
      default:
        return "text-custom-primary";
    }
  };

  return (
    <footer className="relative">
      <motion.div
        className="flex flex-col md:flex-row items-center justify-around gap-10 lg:gap-6 px-10 py-8  "
        initial={{ backgroundColor: mainColor }}
        animate={{ backgroundColor: mainColor }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        {/* logo */}
        <div className="xl:w-1/4">
          <LogoText
            fill={hex}
            height={68.44}
            width={200}
            showAnimation={false}
          />
        </div>
        {/*  links */}

        <div
          className={`flex flex-col lg:flex-row gap-4 lg:gap-10 ${textColor} text-center lg:text-left `}
        >
          <Link href="/about">
            <div className="relative cursor-pointer">
              about
              <UnderlineAnimation />
            </div>
          </Link>
          <Link href="/my-slimes">
            <motion.div className="relative cursor-pointer whitespace-nowrap">
              my slimes
              <UnderlineAnimation />
            </motion.div>
          </Link>

          <a
            href="https://exchange.art/series/Slimes/nfts?sort=contract-type&filters=%7B%7D"
            target="_blank"
            rel="noreferrer"
            className="cursor-pointer"
          >
            <div className="relative cursor-pointer">
              buy a slime
              <UnderlineAnimation />
            </div>
          </a>
          <a
            className="relative cursor-pointer"
            href="https://twitter.com/MySlimes_"
            target="_blank"
            rel="noreferrer"
          >
            <div className="relative cursor-pointer">
              twitter
              <UnderlineAnimation />
            </div>
          </a>
          <a
            className="cursor-pointer"
            href="https://discord.gg/scumsol"
            target="_blank"
            rel="noreferrer"
          >
            <div className="relative cursor-pointer">
              discord
              <UnderlineAnimation />
            </div>
          </a>
        </div>
        {/* exp */}
        <div className="flex xl:w-1/4 justify-end ">
          <a
            className="relative cursor-pointer whitespace-nowrap"
            href="https://expstud.io/"
            target="_blank"
            rel="noreferrer"
          >
            <div className=" flex flex-col items-center">
              <div
                className={`${backgroundAccentColor} rounded-l-2xl rounded-r-2xl text-3xl ${text()} w-min px-5`}
              >
                <ExpIcon color={mainColor} />
              </div>
              <p className={`${textColor} mt-1.5`}>powered by EXP</p>
            </div>
          </a>
        </div>
      </motion.div>
      <div className={`h-6 ${backgroundAccentColor}`}></div>
    </footer>
  );
};

export default Footer;
