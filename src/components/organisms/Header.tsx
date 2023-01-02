import { FC } from "react";
import { Logo, ThemeChanger } from "@components";

const Header: FC = () => {
  return (
    <header className="">
      <div className="px-4 sm:px-6 lg:px-10 py-4 flex justify-between items-center">
        <Logo />
      </div>
    </header>
  );
};

export default Header;
