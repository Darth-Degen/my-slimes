import { motion } from "framer-motion";
import { HTMLAttributes, FC, useState } from "react";
import { tapAnimation } from "apps/merch/src/constants";
import { NumberInput } from "apps/merch/src/components";

interface BuyRacksProps extends HTMLAttributes<HTMLDivElement> {
  handleMint: (amountToMint: number) => void;
}
const BuyRacksForm: FC<BuyRacksProps> = (props: BuyRacksProps) => {
  const { handleMint } = props;
  const [amountToMint, setAmountToMint] = useState<number>(1);

  const cost = 0.5;
  const handleInput = (amount: number) => {
    console.log("amount ", amount);
    setAmountToMint(amount);
  };

  return (
    <div className="flex flex-col items-center lg:items-start gap-3 font-neuebit-bold -mt-14">
      <p className="text-ait-teal text-4xl md:text-5xl">QTY:</p>
      <NumberInput supply={50} handleInput={handleInput} placeholder="50" />
      <p className="text-ait-teal text-4xl">TOTAL: {amountToMint * cost} SOL</p>

      <motion.button
        className="my-2 flex pt-1 items-center justify-center rounded-full w-48 h-14 bg-ait-teal text-4xl  transition-all duration-300 "
        {...tapAnimation}
        onClick={() => handleMint(amountToMint)}
      >
        BUY RACKS
      </motion.button>
    </div>
  );
};

export default BuyRacksForm;
