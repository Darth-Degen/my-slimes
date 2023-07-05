import { motion } from "framer-motion";
import { Dispatch, FC, SetStateAction } from "react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  setAssets: Dispatch<SetStateAction<boolean[]>>;
  href: string;
  image: string;
  width: number;
  height: number;
  alt: string;
  index: number;
  isInternal?: boolean;
}

const MobileLink: FC<Props> = ({
  setAssets,
  href,
  image,
  width,
  height,
  alt,
  index,
  isInternal,
}) => {
  if (isInternal) {
    return (
      <Link href={href}>
        <Image
          src={image}
          width={width}
          height={height}
          alt={alt}
          onLoadingComplete={() =>
            setAssets &&
            setAssets((prevState: boolean[]) => [
              ...prevState.slice(0, index),
              true,
              ...prevState.slice(index + 1),
            ])
          }
          className="rounded-xl transition-all duration-500 ease-out lg:hover:scale-125"
        />
      </Link>
    );
  }
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="lg:overflow-hidden"
    >
      <Image
        src={image}
        width={width}
        height={height}
        alt={alt}
        onLoadingComplete={() =>
          setAssets &&
          setAssets((prevState: boolean[]) => [
            ...prevState.slice(0, index),
            true,
            ...prevState.slice(index + 1),
          ])
        }
        className="rounded-xl transition-all duration-500 ease-out lg:hover:scale-125"
      />
    </motion.a>
  );
};

export default MobileLink;
