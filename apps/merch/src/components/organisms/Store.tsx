import { motion } from "framer-motion";
import { FC } from "react";
import { midExitAnimation, merch } from "@merch-constants";
import { StoreItem } from "@merch-components";
import { Merch } from "@merch-types";

interface Props {
  step: number;
  checkoutStep: number;
  addToCart: (item: Merch) => void;
}
const Store: FC<Props> = (props: Props) => {
  const { step, checkoutStep, addToCart } = props;

  return (
    <motion.div
      className="flex flex-col items-center justify-between"
      {...midExitAnimation}
    >
      {/* header <Header step={step} checkoutStep={checkoutStep} /> */}
      {/* body */}
      <div className="grid grid-cols-2 gap-20">
        {merch.map((item: Merch, index) => (
          <StoreItem item={item} key={index} addToCart={addToCart} />
        ))}
      </div>
      {/* footer <Footer step={step} checkoutStep={checkoutStep} /> */}
    </motion.div>
  );
};

export default Store;
