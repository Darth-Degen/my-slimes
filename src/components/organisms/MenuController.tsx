import { FC, useEffect, useRef, useState } from "react";
import { MenuIcon, Menu, CloseIcon } from "@components";
import { useOutsideAlerter } from "@hooks";
import { AnimatePresence, motion } from "framer-motion";
import { menuAnimation } from "@constants";

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
    <div
      className="w-full h-full items-end justify-end hidden sm:flex"
      ref={wrapperRef}
    >
      <AnimatePresence mode="wait">
        {!openMenu ? (
          <motion.div key="open" {...menuAnimation}>
            <MenuIcon
              className="cursor-pointer"
              onClick={() => setOpenMenu(true)}
            />
          </motion.div>
        ) : (
          <motion.div
            key="close"
            className="cursor-pointer z-30"
            {...menuAnimation}
          >
            <CloseIcon
              className="cursor-pointer"
              onClick={() => setOpenMenu(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <Menu toggleMenu={setOpenMenu} open={openMenu} />
    </div>
  );
};

export default MenuController;
