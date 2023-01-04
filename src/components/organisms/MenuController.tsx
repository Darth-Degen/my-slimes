import { FC, useState } from "react";
import { MenuIcon, Menu } from "@components";

const MenuController: FC = () => {
  const [open, cycleOpen] = useState(false);
  return (
    <div className="w-full h-full flex items-end justify-end ">
      <div key="menu-icon" onClick={() => cycleOpen(true)}>
        <MenuIcon />
      </div>
      {/* <AnimatePresence mode="wait" initial={false}>
          {openMenu && <Menu toggleMenu={setOpenMenu} />}
        </AnimatePresence> */}
      {/* <motion.aside initial={{ width: 0 }} animate={{ width: 300 }}> */}
      <Menu toggleMenu={cycleOpen} open={open} />
      {/* </motion.aside> */}
    </div>
  );
};

export default MenuController;
