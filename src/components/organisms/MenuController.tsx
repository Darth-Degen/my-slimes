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

interface Props {}

const MenuController: FC<Props> = (props: Props) => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const wrapperRef = useRef(null);

  useOutsideAlerter(wrapperRef, setOpenMenu);

  useEffect(() => {
    if (openMenu) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [openMenu]);

  return (
    <div className="w-full h-full flex items-end justify-end " ref={wrapperRef}>
      <div key="menu-icon" onClick={() => setOpenMenu(true)}>
        <MenuIcon />
      </div>
      <Menu toggleMenu={setOpenMenu} open={openMenu} />
    </div>
  );
};

export default MenuController;
