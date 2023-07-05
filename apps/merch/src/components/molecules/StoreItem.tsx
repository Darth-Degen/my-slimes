import { AnimatePresence, motion } from "framer-motion";
import { FC, useState } from "react";
import { fastExitAnimation, midExitAnimation } from "@merch-constants";
import { ImageShimmer } from "@merch-components";
import { Merch } from "@merch-types";

interface Props {
  item: Merch;
  inStock: boolean;
  addToCart: (item: Merch) => void;
  handleImageClick: (item: Merch) => void;
}
const StoreItem: FC<Props> = (props: Props) => {
  const { item, inStock, addToCart, handleImageClick } = props;

  //TODO: change to true
  const [didHover, setDidHover] = useState<boolean>(true);

  const src = `${process.env.NEXT_PUBLIC_CDN_URL}/images/merch/${item.id}/image.png`;

  const handleAddToCart = (cartItem: Merch) => {
    //set size & color if only one
    if (item.sizeChart.length === 1) {
      cartItem.size = item.sizeChart[0];
    }
    if (item.colors.length === 1) {
      cartItem.color = item.colors[0];
    }
    addToCart(cartItem);
  };

  return (
    <motion.div
      className="flex flex-col md:flex-row gap-10"
      {...midExitAnimation}
    >
      {/* image + add to cart */}
      <div className="flex flex-col items-center gap-2">
        <div
          className="relative"
          //TODO: uncomment
          // onMouseEnter={() => setDidHover(true)}
          // onMouseLeave={() => setDidHover(false)}
          // onClick={() => handleImageClick(item)}
        >
          <ImageShimmer
            src={src}
            alt={item.id}
            height={225}
            width={225}
            className="cursor-pointer"
          />
          <AnimatePresence mode="wait">
            {didHover && (
              <motion.div
                className="absolute flex items-center justify-center inset-0 bg-[#D9D9D9] bg-opacity-50 text-white uppercase font-neuebit-bold text-4xl cursor-pointer"
                key="more"
                {...fastExitAnimation}
              >
                {/* TODO: uncomment */}
                {/* <p>see more</p> */}
                <p>available 7/7</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <button
          className="uppercase font-neuebit-bold text-lg bg-m-green px-6 pt-1 text-white transition-colors duration-200 hover:bg-m-dark-green active:bg-opacity-90 shadow-md
          disabled:bg-red-500 disabled:bg-opacity-50 disabled:cursor-not-allowed disabled:shadow-none min-w-[127px]"
          onClick={() => handleAddToCart(item)}
          //TODO: uncomment
          // disabled={!inStock}
          disabled={true}
        >
          {!inStock ? "sold out" : "add to cart"}
        </button>
      </div>
      {/* info */}
      <div className="flex flex-col items-center md:items-start justify-start uppercase text-m-mid-gray gap-[17px] -mt-1">
        <h3 className="font-neuebit-bold text-4xl max-w-[180px] tracking-wide text-center md:text-start">
          {item.name}
        </h3>
        <p className="font-neuebit-bold text-xl">cost - {item.cost} racks</p>
        <p className="font-neuebit-bold text-xl">
          qty made - {item.maxSupply}*
        </p>
        <div className="flex gap-2 font-neuebit text-xl ">
          {item.sizeChart.map((item, index) => (
            <span key={index}>{item}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default StoreItem;
