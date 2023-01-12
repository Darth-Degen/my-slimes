import {
  dropdownAnimations,
  dropdownItemsAnimations,
  fastExitAnimation,
} from "@constants";
import { DropdownButton, DropdownItem } from "@components";
import { Collection, Asset } from "@types";
import { Dispatch, FC, SetStateAction } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  handleSelect: (id: number) => void;
  setShowDropdown: Dispatch<SetStateAction<boolean>>;
  showDropdown: boolean;
  label: string;
  items: Collection[] | Asset[];
}

const Dropdown: FC<Props> = (props: Props) => {
  const { handleSelect, setShowDropdown, showDropdown, label, items } = props;

  return (
    <div
      onMouseEnter={() => setShowDropdown(true)}
      onMouseLeave={() => setShowDropdown(false)}
    >
      <DropdownButton isActive={showDropdown} label={label} />
      <AnimatePresence mode="wait">
        {showDropdown && (
          <motion.div
            {...fastExitAnimation}
            key="dropdown-list"
            className="absolute z-50 pt-2"
          >
            <motion.div
              variants={dropdownAnimations}
              initial="hidden"
              animate="show"
            >
              <motion.ul className="rounded-xl divide-y divide-custom-dark border-2 border-custom-dark shadow max-h-[240px] overflow-y-auto z-50 bg-custom-light">
                {items &&
                  items.map((item: Collection | Asset) => (
                    <DropdownItem
                      item={item}
                      handleSelect={handleSelect}
                      key={item.id}
                      variants={dropdownItemsAnimations}
                    />
                  ))}
              </motion.ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;
