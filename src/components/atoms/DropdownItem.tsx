import { FC } from "react";
import { motion, Variants } from "framer-motion";
import { Collection, Asset } from "@types";

interface Props {
  item: Collection | Asset;
  handleClick: (id: number | string) => void;
  variants: Variants;
}

const DropdownItem: FC<Props> = (props: Props) => {
  const { item, handleClick, variants } = props;
  const styles: string = "w-56 h-10 bg-dark text-xs z-50";

  return (
    <motion.li
      key={item?.id}
      className={`${styles} px-2 cursor-pointer flex items-center hover:bg-custom-pink transition-colors duration-300`}
      onClick={() => handleClick(item?.id)}
    >
      <motion.span variants={variants}>
        {/* {item.id < 10 ? `00${item.id + 1}` : `0${item.id + 1}`} */}
        {item.name}
      </motion.span>
    </motion.li>
  );
};

export default DropdownItem;
