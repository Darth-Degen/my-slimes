import { motion } from "framer-motion";
import { FC } from "react";
import Image from "next/image";

interface Props {
  href: string;
  image: string;
  width: number;
  height: number;
  alt: string;
  span: "1" | "2";
}

const MobileLink: FC<Props> = ({ href, image, width, height, alt, span }) => {
  const spanClass = `col-span-${span}`;
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={`w-full h-full overflow-hidden rounded-xl ${spanClass}`}
    >
      <Image src={image} width={width} height={height} alt={alt} />
    </motion.a>
  );
};

export default MobileLink;
