import { FC } from "react";
import { midClickAnimation } from "@constants";
import { motion } from "framer-motion";
import Image from "next/image";

const TwitterIcon: FC = () => {
  return (
    <motion.a
      {...midClickAnimation}
      href="https://twitter.com/HotHeadsSOL"
      rel="noreferrer"
      target="_blank"
    >
      <Image
        src={`${process.env.NEXT_PUBLIC_CDN_URL}/images/twitter.png`}
        width={37}
        height={41}
        alt="discord"
      />
    </motion.a>
  );
};

export default TwitterIcon;
