import { motion } from "framer-motion";
import { HTMLAttributes, FC } from "react";
import { tapAnimation } from "@merch-constants";
import { NumberInput } from "@merch-components";

interface BuyRacksProps extends HTMLAttributes<HTMLDivElement> {
  handleMint: () => void;
}
const BuyRacksForm: FC<BuyRacksProps> = (props: BuyRacksProps) => {
  const { handleMint } = props;

  const handleInput = (amount: number) => {
    console.log("amount ", amount);
  };

  return (
    <div className="flex flex-col items-center lg:items-start gap-3 font-neuebit-bold">
      <p className="text-ait-teal text-4xl md:text-5xl">QTY:</p>
      <NumberInput supply={100} handleInput={handleInput} />
      <p className="text-ait-teal text-4xl">TOTAL: 11.5 SOL</p>

      <motion.button
        className="my-2 flex pt-1 items-center justify-center rounded-full w-48 h-14 bg-ait-teal text-4xl  transition-all duration-300 hover:bg-ait-black hover:text-v2-dark-green hover:border hover:border-v2-green"
        {...tapAnimation}
        onClick={() => handleMint()}
      >
        BUY RACKS
      </motion.button>
    </div>
  );
};

export default BuyRacksForm;
