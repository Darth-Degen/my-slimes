import React, { useState } from "react";

const ThemeToggler = () => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div>
      <input type="checkbox" id="darkmode-toggle" />
      <label htmlFor="darkmode-toggle" />

      <div className="background" />
    </div>
  );
};

export default ThemeToggler;
