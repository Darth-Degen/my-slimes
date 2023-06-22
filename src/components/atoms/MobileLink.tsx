import { motion } from "framer-motion";
import { FC } from "react";
import Image from "next/image";

interface Props {
  href: string;
  image: string;
  width: number;
  height: number;
  alt: string;
}

const MobileLink: FC<Props> = ({ href, image, width, height, alt }) => {
  return (
    <motion.a href={href} target="_blank" rel="noreferrer noopener">
      <Image src={image} width={width} height={height} alt={alt} />
    </motion.a>
  );
};

export default MobileLink;
