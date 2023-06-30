import { ArrowIcon } from "@components";
import { arrowVariants } from "@constants";
import { ButtonHTMLAttributes, FC } from "react";
import { motion } from "framer-motion";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive: boolean;
  label: string;
}

const DropdownButton: FC<Props> = (props: Props) => {
  const { isActive, label, className, ...componentProps } = props;

  const styles: string = "w-60 h-10 font-neuebit-bold text-xl";

  return (
    <button
      className={`relative flex justify-between ${styles} uppercase  border-custom-dark items-center px-3 cursor-pointer bg-white transition-colors duration-300 
      disabled:cursor-auto ${className}`}
      {...componentProps}
    >
      {label}
      <motion.div
        animate={isActive ? "end" : "start"}
        variants={arrowVariants}
        className=""
      >
        {!componentProps.disabled && (
          <ArrowIcon color={"#505050"} type="single" />
        )}
      </motion.div>
    </button>
  );
};

export default DropdownButton;
