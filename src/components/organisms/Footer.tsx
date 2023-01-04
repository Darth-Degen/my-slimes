import { FC } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { underlineAnimation } from "@constants";

interface Props {
  bottomBgColor?: string;
}

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
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-10 text-white">
          <motion.a
            className="cursor-pointer"
            href="https://twitter.com/MySlimes_"
            target="_blank"
            rel="noreferrer"
            {...underlineAnimation}
          >
            twitter
          </motion.a>
          <motion.a
            className="cursor-pointer"
            href="https://exchange.art/series/Slimes/nfts?sort=contract-type&filters=%7B%7D"
            target="_blank"
            rel="noreferrer"
            {...underlineAnimation}
          >
            buy a slime
          </motion.a>
          <Link href="/about">
            <motion.p className="w-min cursor-pointer" {...underlineAnimation}>
              about
            </motion.p>
          </Link>
          {/* <Link href="/slimes-only"> */}
          <motion.p
            className="cursor-default whitespace-nowrap opacity-50"
            // {...underlineAnimation}
          >
            slimes only
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
