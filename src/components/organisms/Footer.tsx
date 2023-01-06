import { FC } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { underlineAnimation } from "@constants";

interface Props {
  bottomBgColor?: string;
}

const UnderlineAnimation: FC = () => (
  <motion.div
    {...underlineAnimation}
    className="absolute top-0 left-0 h-full w-full bg-transparent border-b border-white"
  />
);

const Footer: FC<Props> = (props: Props) => {
  const { bottomBgColor = "bg-white" } = props;
  return (
    <footer className="relative">
      <div className="flex flex-col md:flex-row items-center justify-around gap-10 lg:gap-6 px-10 py-8 md:py-12 3xl:py-20 bg-custom-primary">
        {/* logo */}
        <div className="lg:w-1/4">
          <Image
            src="/images/slimes-text.png"
            height={68.44}
            width={200}
            alt="My Slimes Text"
          />
        </div>
        {/*  links */}

        <div className="flex flex-col lg:flex-row gap-4 lg:gap-10 text-white text-center lg:text-left ">
          <a
            className="relative cursor-pointer"
            href="https://twitter.com/MySlimes_"
            target="_blank"
            rel="noreferrer"
          >
            twitter
            <UnderlineAnimation />
          </a>
          <a
            className="relative cursor-pointer"
            href="https://exchange.art/series/Slimes/nfts?sort=contract-type&filters=%7B%7D"
            target="_blank"
            rel="noreferrer"
          >
            buy a slime
            <UnderlineAnimation />
          </a>
          <Link href="/about">
            <p className="relative cursor-pointer">
              about
              <UnderlineAnimation />
            </p>
          </Link>
          {/* <Link href="/slimes-only"> */}
          <motion.p className="relative cursor-default whitespace-nowrap opacity-50">
            slimes only
            {/* <UnderlineAnimation /> */}
          </motion.p>
          {/* </Link> */}
        </div>
        {/* exp */}
        <div className="flex lg:w-1/4 justify-end ">
          <div className=" flex flex-col items-center gap-0.5">
            <div className="bg-white rounded-l-2xl rounded-r-2xl text-3xl text-custom-primary w-min px-5 py-0.5">
              EXP
            </div>
            <p className="text-white">powered by EXP</p>
          </div>
        </div>
      </div>
      <div className={`h-10 ${bottomBgColor}`}></div>
    </footer>
  );
};

export default Footer;
