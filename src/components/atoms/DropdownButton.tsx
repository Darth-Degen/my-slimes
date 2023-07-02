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

  const styles: string = "w-56 h-10 font-primary";

  return (
    <motion.button
      className={`relative flex justify-between ${styles} border-2 border-custom-dark rounded-xl items-center px-3 cursor-pointer hover:bg-custom-pink transition-colors duration-300`}
      // whileTap={{ scale: 0.97 }}
      // {...backgroundAnimations}
    >
      {label}
      <motion.div
        animate={isActive ? "end" : "start"}
        variants={arrowVariants}
        className=""
      >
        <ArrowIcon color={"#232726"} type="thick" />
      </motion.div>
    </motion.button>
  );
};

export default DropdownButton;
