import { Dispatch, FC, SetStateAction, useState } from "react";

interface Props {
  selectedNft: string | undefined;
  isDark: boolean;
  setIsDark: Dispatch<SetStateAction<boolean>>;
}

const ThemeToggler: FC<Props> = ({ selectedNft, isDark, setIsDark }) => {
  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  if (selectedNft !== "Kai" || selectedNft === undefined) return null;

  return (
    <div className="toggle h-full flex items-center justify-center">
      <input
        type="checkbox"
        id="darkmode-toggle"
        checked={!!isDark}
        onChange={toggleTheme}
      />
      <label htmlFor="darkmode-toggle" />
    </div>
  );
};

export default ThemeToggler;
