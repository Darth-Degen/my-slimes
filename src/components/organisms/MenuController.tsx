import { FC, useState } from "react";
import { MenuIcon, Menu } from "@components";

const MenuController: FC = () => {
  const [open, cycleOpen] = useState(false);
  return (
    <div className="w-full h-full flex items-end justify-end ">
      <div key="menu-icon" onClick={() => cycleOpen(true)}>
        <MenuIcon />
      </div>
      <Menu toggleMenu={cycleOpen} open={open} />
    </div>
  );
};

export default MenuController;
