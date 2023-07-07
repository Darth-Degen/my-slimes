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
  expandUI?: boolean;
}

const Dropdown: FC<Props> = (props: Props) => {
  const {
    handleSelect,
    setShowDropdown,
    showDropdown,
    label,
    items,
    disabled,
    expandUI,
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
      <Droppi
        showDropdown={showDropdown}
        items={items}
        handleSelect={handleSelect}
        expandUI={expandUI}
      />
    </div>
  );
};

interface DP {
  showDropdown: boolean;
  handleSelect: (id: string) => void;
  items: string[];
  expandUI?: boolean;
}
const Droppi: FC<DP> = (props: DP) => {
  const { showDropdown, items, handleSelect, expandUI } = props;
  return (
    <AnimatePresence mode="wait">
      {showDropdown && (
        <motion.div
          className={`${expandUI ? "" : "absolute"} z-10 `}
          {...fastExitAnimation}
          key="dropdown-list"
        >
          <motion.div
            variants={dropdownAnimations}
            initial="hidden"
            animate="show"
            key="dropdown-list"
          >
            <ul className="border border-m-black shadow max-h-[240px] overflow-y-scroll bg-white z-10">
              {items &&
                items.map((item, index) => (
                  <DropdownItem
                    item={item}
                    handleSelect={handleSelect}
                    key={index}
                    variants={dropdownItemsAnimations}
                  />
                ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Dropdown;
