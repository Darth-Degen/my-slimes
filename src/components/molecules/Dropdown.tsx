import { dropdownAnimations, dropdownItemsAnimations } from "@constants";
import { DropdownButton, DropdownItem } from "@components";
import { Collection } from "@types";
import { Dispatch, FC, SetStateAction } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  handleClick: (id: number) => void;
  setDidHover: Dispatch<SetStateAction<boolean>>;
  didHover: boolean;
  label: string;
  collections: Collection[];
}

const Dropdown: FC<Props> = (props: Props) => {
  const { handleClick, setDidHover, didHover, label, collections } = props;

  return (
    <div
      onMouseEnter={() => setDidHover(true)}
      onMouseLeave={() => setDidHover(false)}
    >
      <DropdownButton isActive={didHover} label={label} />
      <AnimatePresence mode="wait">
        {didHover && (
          <motion.div
            className="absolute z-50 pt-2"
            key="dropdown-list"
            variants={dropdownAnimations}
            initial="hidden"
            animate="show"
          >
            <motion.ul className="rounded divide-y divide-customMidGray border border-customMidGray shadow max-h-[200px] overflow-y-auto z-50">
              {collections &&
                collections.map((item: Collection) => (
                  <DropdownItem
                    item={item}
                    handleClick={handleClick}
                    key={item.id}
                    variants={dropdownItemsAnimations}
                  />
                ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;
