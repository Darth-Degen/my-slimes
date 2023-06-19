import { motion } from "framer-motion";
import { FC } from "react";
import { midExitAnimation } from "@merch-constants";
import { ImageShimmer } from "@merch-components";
import { Merch } from "@merch-types";

interface Props {
  item: Merch;
  addToCart: (item: Merch) => void;
}
const StoreItem: FC<Props> = (props: Props) => {
  const { item, addToCart } = props;
  const src = `/images/merch/${item.id}/image.png`;

  return (
    <motion.div className="flex gap-10" {...midExitAnimation}>
      {/* image + add to cart */}
      <div className="flex flex-col items-center gap-2">
        <ImageShimmer
          src={src}
          alt={item.id}
          height={225}
          width={225}
          className="cursor-pointer"
        />
        <button
          className="uppercase font-neuebit-bold text-lg bg-m-green px-6 pt-1 text-white transition-colors duration-200 hover:bg-m-dark-green active:bg-opacity-90"
          onClick={() => addToCart(item)}
        >
          add to cart
        </button>
      </div>
      {/* info */}
      <div className="flex flex-col items-start justify-start uppercase text-m-mid-gray gap-[17px] -mt-1">
        <h3 className="font-neuebit-bold text-4xl max-w-[200px] tracking-wide">
          {item.name}
        </h3>
        <p className="font-neuebit-bold text-xl">cost - {item.cost} racks</p>
        <p className="font-neuebit-bold text-xl">
          qty made - {item.maxSupply}*
        </p>
        <div className="flex gap-2 font-neuebit text-xl ">
          {item.sizes.map((item, index) => (
            <span key={index}>{item}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default StoreItem;
