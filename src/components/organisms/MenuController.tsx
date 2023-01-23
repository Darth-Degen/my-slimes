import { Dispatch, FC, SetStateAction, useRef, useState } from "react";
import { MenuIcon, Menu } from "@components";
import { useOutsideAlerter } from "@hooks";

interface Props {
  openMenu: boolean;
  setOpenMenu: Dispatch<SetStateAction<boolean>>;
}
const MenuController: FC<Props> = (props: Props) => {
  const { openMenu, setOpenMenu } = props;

  const wrapperRef = useRef(null);

  useOutsideAlerter(wrapperRef, setOpenMenu);

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
