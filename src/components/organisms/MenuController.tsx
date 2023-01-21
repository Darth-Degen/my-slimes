import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { MenuIcon, Menu } from "@components";
import { useOutsideAlerter } from "@hooks";

const MenuController: FC = () => {
  const [open, cycleOpen] = useState(false);
  const wrapperRef = useRef(null);

  useOutsideAlerter(wrapperRef, cycleOpen);

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
