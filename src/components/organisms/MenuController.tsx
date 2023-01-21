import { FC, useEffect, useRef, useState } from "react";
import { MenuIcon, Menu } from "@components";
import { useOutsideAlerter } from "@hooks";

const MenuController: FC = () => {
  const [open, cycleOpen] = useState(false);
  const wrapperRef = useRef(null);

  useOutsideAlerter(wrapperRef, cycleOpen);

  // useEffect(() => {
  //   if (open) document.body.style.overflow = "hidden";
  //   else document.body.style.overflow = "auto";
  // }, [open]);

  return (
    <div className="w-full h-full flex items-end justify-end " ref={wrapperRef}>
      <div key="menu-icon" onClick={() => cycleOpen(true)}>
        <MenuIcon />
      </div>
      <Menu toggleMenu={cycleOpen} open={open} />
    </div>
  );
};

export default MenuController;
