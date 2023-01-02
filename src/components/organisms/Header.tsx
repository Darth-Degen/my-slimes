import { FC } from "react";
import { Logo, MenuController } from "@components";

const Header: FC = () => {
  return (
    <header className="px-4 sm:px-6 lg:px-10 py-6 flex justify-between items-center">
      <Logo />
      <MenuController />
    </header>
  );
};

export default Header;
