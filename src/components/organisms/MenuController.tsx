import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { MenuIcon, Menu } from "@components";

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

const useOutsideAlerter = (
  ref: any,
  callback: Dispatch<SetStateAction<boolean>>
) => {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    const handleClickOutside = (event: Event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        if (callback) callback(false);
      }
    };
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
};

export default MenuController;
