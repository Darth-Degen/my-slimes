import { FC } from "react";
import { motion, Variants } from "framer-motion";

interface Props {
  item: string;
  handleSelect: (id: string) => void;
  variants: Variants;
}

const DropdownItem: FC<Props> = (props: Props) => {
  const { item, handleSelect, variants } = props;
  const styles: string = "w-52 h-10 bg-dark text-xs z-20";

  return (
    <li
      key={item}
      className={`${styles} px-2 cursor-pointer flex items-center hover:bg-m-light-gray transition-colors duration-300 text-xl font-neuebit uppercase`}
      onClick={() => handleSelect(item)}
    >
      <motion.span variants={variants}>{item}</motion.span>
    </li>
  );
};

export default DropdownItem;
