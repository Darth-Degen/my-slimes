import {
  dropdownAnimations,
  dropdownItemsAnimations,
  fastExitAnimation,
} from "@constants";
import { DropdownButton, DropdownItem } from "@merch-components";
import { Collection, Asset } from "@types";
import { Dispatch, FC, HTMLAttributes, SetStateAction } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Merch } from "@merch-types";

interface Props extends HTMLAttributes<HTMLDivElement> {
  handleSelect: (id: string) => void;
  setShowDropdown: Dispatch<SetStateAction<boolean>>;
  showDropdown: boolean;
  label: string;
  items: string[];
  disabled?: boolean;
}

const Dropdown: FC<Props> = (props: Props) => {
  const {
    handleSelect,
    setShowDropdown,
    showDropdown,
    label,
    items,
    disabled,
    className,
    ...componentProps
  } = props;

  return (
    <div
      onClick={() => setShowDropdown(!showDropdown)}
      onMouseLeave={() => setShowDropdown(false)}
      {...componentProps}
      className="relative"
    >
      <DropdownButton
        isActive={showDropdown}
        label={label}
        className={className}
        disabled={disabled}
      />
      <AnimatePresence mode="wait">
        {showDropdown && (
          <motion.div
            {...fastExitAnimation}
            key="dropdown-list"
            className="absolute z-20 pt-0.5"
          >
            <motion.div
              variants={dropdownAnimations}
              initial="hidden"
              animate="show"
            >
              <motion.ul className="border border-m-black shadow max-h-[240px] overflow-y-scroll z-20 bg-white">
                {items &&
                  items.map((item, index) => (
                    <DropdownItem
                      item={item}
                      handleSelect={handleSelect}
                      key={index}
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
