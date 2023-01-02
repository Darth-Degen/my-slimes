import { ArrowIcon } from "@components";
import { arrowVariants } from "@constants";
import { FC } from "react";
import { motion } from "framer-motion";

interface Props {
  isActive: boolean;
  label: string;
}

const DropdownButton: FC<Props> = (props: Props) => {
  const { isActive, label } = props;

  const styles: string = "w-56 h-10 bg-dark text-[9px]";

  return (
    <motion.button
      className={`relative flex justify-between ${styles} border border-dark hover:border-orange-300 rounded items-center p-2 cursor-pointer transition-colors duration-500 ${
        isActive ? "border-red-400" : ""
      }`}
      whileTap={{ scale: 0.97 }}
    >
      {label}
      <motion.div animate={isActive ? "end" : "start"} variants={arrowVariants}>
        <ArrowIcon color={"#d1d5db"} />
      </motion.div>
    </motion.button>
  );
};

export default DropdownButton;
