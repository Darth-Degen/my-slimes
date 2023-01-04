import { Dispatch, FC, SetStateAction } from "react";
import { motion } from "framer-motion";
import { midExitAnimation } from "@constants";
import { CloseIcon } from "@components";
import Link from "next/link";

interface Props {
  toggleMenu: Dispatch<SetStateAction<boolean>>;
}

const menuItemAnimation = {
  whileHover: { color: "#8BD2B9" },
  // whileTap: { scale: 0.96 },
  transition: { duration: 0.35 },
};

const Menu: FC<Props> = (props: Props) => {
  const { toggleMenu } = props;
  return (
    <motion.div
      key="main-menu"
      className="bg-white fixed w-72 sm:w-96 top-0  right-0 z-100 p-8 shadow-xl"
      onMouseLeave={() => toggleMenu(false)}
      {...midExitAnimation}
    >
      <div onClick={() => toggleMenu(false)} className="cursor-pointer w-min">
        <CloseIcon />
      </div>
      <div className="flex flex-col pt-16 pb-6 gap-6 text-3xl font-primary">
        {/* about */}
        <Link href="/about">
          <motion.p
            className="w-min cursor-pointer py-1"
            {...menuItemAnimation}
          >
            about
          </motion.p>
        </Link>
        {/* auctions */}
        <motion.a
          className="cursor-pointer py-1"
          {...menuItemAnimation}
          href="/"
          target="_blank"
          rel="noreferrer"
        >
          auctions
        </motion.a>
        {/* twitter */}
        <motion.a
          className="cursor-pointer py-1"
          {...menuItemAnimation}
          href="https://twitter.com/MySlimes_"
          target="_blank"
          rel="noreferrer"
        >
          twitter
        </motion.a>
        {/* design */}
        {/* <Link href="/design"> */}
        <motion.p
          className="py-1 whitespace-nowrap text-slimes-dark opacity-50"
          // {...menuItemAnimation}
        >
          design notes (soon)
        </motion.p>
        {/* </Link> */}

        {/* slimes-only */}
        <Link href="/slimes-only">
          <motion.p
            className="cursor-pointer py-1 whitespace-nowrap"
            {...menuItemAnimation}
          >
            slimes only
          </motion.p>
        </Link>
      </div>
    </motion.div>
  );
};

export default Menu;
