import { motion } from "framer-motion";
import { Dispatch, FC, SetStateAction } from "react";
import { midExitAnimation, merch } from "@merch-constants";
import { StoreItem, Header, Footer } from "@merch-components";
import { Merch, Quantities } from "@merch-types";

interface Props {
  quantities: Quantities;
  addToCart: (item: Merch) => void;
  handleImageClick: (item: Merch) => void;
}
const Store: FC<Props> = (props: Props) => {
  const { quantities, addToCart, handleImageClick } = props;

  return (
    <motion.div
      className="flex flex-col items-start justify-between lg:justify-around h-full w-full"
      {...midExitAnimation}
    >
      {/* body */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 xl:gap-20 2xl:gap-x-36 px-10 py-10 md:py-0">
        {merch.map((item: Merch, index) => (
          <StoreItem
            item={item}
            key={index}
            addToCart={addToCart}
            quantity={quantities[item.id].quantity}
            handleImageClick={handleImageClick}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default Store;
