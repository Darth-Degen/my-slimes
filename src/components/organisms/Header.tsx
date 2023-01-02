import { FC } from "react";
import { Logo, ThemeChanger } from "@components";

const Header: FC = () => {
  return (
    <header className="h-15 border-b border-orange-300 z-20 bg-[#121212] transition-colors ease-in-out duration-500">
      <div className="px-4 sm:px-6 lg:px-10 py-4 flex justify-between items-center">
        <Logo />
      </div>
    </header>
  );
};

export default Header;
