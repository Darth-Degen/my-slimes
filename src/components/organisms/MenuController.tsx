import { FC, useState } from "react";
import { MenuIcon, Menu } from "@components";
import { AnimatePresence, motion } from "framer-motion";

const MenuController: FC = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  return (
    <div className="w-full h-full flex items-end justify-end ">
      <div key="menu-icon" className="p-2 cursor-pointer">
        <div onMouseEnter={() => setOpenMenu(true)}>
          <MenuIcon />
        </div>
      </div>
      <AnimatePresence mode="wait" initial={false}>
        {openMenu && <Menu toggleMenu={setOpenMenu} />}
      </AnimatePresence>
    </div>
  );
};

export default MenuController;
