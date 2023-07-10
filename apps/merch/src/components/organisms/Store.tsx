import { motion } from "framer-motion";
import { FC } from "react";
import { midExitAnimation, merch } from "@merch-constants";
import { StoreItem } from "@merch-components";
import { Merch, Quantity } from "@merch-types";
import { verifyItemInStock } from "@merch-helpers";

interface Props {
  quantities: Quantity[];
  addToCart: (item: Merch) => void;
  handleImageClick: (item: Merch) => void;
}
const Store: FC<Props> = (props: Props) => {
  const { quantities, addToCart, handleImageClick } = props;

  return (
    <motion.div
      className="flex flex-col items-center xl:items-start justify-between lg:justify-around h-full w-full pt-10 2xl:pt-0"
      {...midExitAnimation}
    >
      {/* body */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 xl:gap-20 2xl:gap-x-36 px-10 py-10 md:py-0">
        {merch.map((item: Merch, index) => (
          <StoreItem
            item={item}
            key={index}
            addToCart={addToCart}
            inStock={verifyItemInStock(item, quantities)}
            handleImageClick={handleImageClick}
            quantities={quantities}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default Store;
