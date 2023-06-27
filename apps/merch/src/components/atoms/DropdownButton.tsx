import { ArrowIcon } from "@components";
import { arrowVariants } from "@constants";
import { ButtonHTMLAttributes, FC } from "react";
import { motion } from "framer-motion";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive: boolean;
  label: string;
}

const DropdownButton: FC<Props> = (props: Props) => {
  const { isActive, label, className } = props;

  const styles: string = "w-60 h-10 font-neuebit-bold text-xl";

  return (
    <motion.button
      className={`relative flex justify-between ${styles} uppercase  border-custom-dark items-center px-3 cursor-pointer bg-white transition-colors duration-300 ${className}`}
      // whileTap={{ scale: 0.97 }}
      // {...backgroundAnimations}
    >
      {label}
      <motion.div
        animate={isActive ? "end" : "start"}
        variants={arrowVariants}
        className=""
      >
        <ArrowIcon color={"#505050"} type="single" />
      </motion.div>
    </motion.button>
  );
};

export default DropdownButton;
