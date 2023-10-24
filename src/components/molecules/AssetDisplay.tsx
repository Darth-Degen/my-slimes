import { Dispatch, FC, SetStateAction } from "react";
import { motion } from "framer-motion";
import { Collection, Asset } from "@types";
import Image from "next/image";
import { midExitAnimation } from "@constants";

interface Props {
  asset: Asset;
  collection: Collection;
  key: string;
  isExtra?: boolean;
  handleClick?: Dispatch<SetStateAction<string>>;
}

const AssetDisplay: FC<Props> = (props: Props) => {
  const { asset, collection, key, isExtra = false, handleClick } = props;

  const src = `${process.env.cloudflarestorage}/images/wallpapers/${
    asset?.tag
  }/${collection?.tag}${isExtra ? "-1" : ""}.png`;

  return (
    <motion.div
      className="relative w-full h-full flex items-center justify-center"
      key={key}
      {...midExitAnimation}
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        onClick={() => (handleClick ? handleClick(src) : null)}
      >
        <Image
          src={src}
          height={asset?.height[0]}
          width={asset?.width[0]}
          alt={asset?.name}
          className="cursor-pointer rounded-xl"
        />
      </motion.div>
    </motion.div>
  );
};

export default AssetDisplay;
