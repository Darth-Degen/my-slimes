import { FC } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { underlineAnimation } from "@constants";
import LogoIcon from "../@icons/LogoIcon";
import { LogoText } from "..";

interface Props {
  backgroundAccentColor?: string;
  textColor?: string;
  hex?: string;
}

const UnderlineAnimation: FC = (props: Props) => {
  const { hex = "#FFFFFF" } = props;

  const getBorder = () => {
    return `bg-${hex}`;
  };
  return (
    <motion.div
      {...underlineAnimation}
      className={`absolute bottom-0 left-0 h-full w-full bg-transparent border-b ${getBorder()}`}
    />
  );
};

const Footer: FC<Props> = (props: Props) => {
  const {
    backgroundAccentColor = "bg-white",
    textColor = "text-white",
    hex = "#FFFFFF",
  } = props;
  return (
    <footer className="relative">
      <div className="flex flex-col md:flex-row items-center justify-around gap-10 lg:gap-6 px-10 py-8 md:py-12 3xl:py-20 bg-custom-primary">
        {/* logo */}
        <div className="lg:w-1/4">
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
        </div>
        {/* exp */}
        <div className="flex lg:w-1/4 justify-end ">
          <div className=" flex flex-col items-center gap-0.5">
            <div
              className={`${backgroundAccentColor} rounded-l-2xl rounded-r-2xl text-3xl text-custom-primary w-min px-5 py-0.5`}
            >
              EXP
            </div>
            <p className={`${textColor}`}>powered by EXP</p>
          </div>
        </div>
      </div>
      <div className={`h-10 ${backgroundAccentColor}`}></div>
    </footer>
  );
};

export default Footer;
