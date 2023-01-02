import { FC } from "react";
import { Logo, MenuIcon } from "@components";

const MenuController: FC = () => {
  return (
    <header className="px-4 sm:px-6 lg:px-10 py-6 flex justify-between items-center">
      <Logo />
      <MenuIcon />
    </header>
  );
};

export default MenuController;
