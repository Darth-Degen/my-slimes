import { Dispatch, FC, SetStateAction } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { midExitAnimation } from "@constants";
import { CloseIcon } from "@components";
import Link from "next/link";

const sideVariants = {
  closed: {
    transition: {
      staggerChildren: 0.15,
      staggerDirection: -1,
    },
  },
  open: {
    transition: {
      delay: 0.4,
      staggerChildren: 0.15,
      staggerDirection: 1,
    },
  },
};
const itemVariants = {
  closed: {
    opacity: 0,
  },
  open: { opacity: 1 },
};
const disabledItemVariants = {
  closed: {
    opacity: 0,
  },
  open: { opacity: 0.5 },
};

const menuItemAnimation = {
  whileHover: { color: "#8BD2B9" },
  // whileTap: { scale: 0.96 },
  transition: { duration: 0.35 },
};

interface Props {
  toggleMenu: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}

const Menu: FC<Props> = (props: Props) => {
  const { toggleMenu, open } = props;
  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        {open && (
          <motion.div
            key="main-menu"
            className="bg-white fixed top-0 right-0 z-100 p-8 shadow-xl rounded-bl"
            onMouseLeave={() => toggleMenu(false)}
          >
            <motion.aside
              initial={{ width: 0 }}
              animate={{ width: 300 }}
              exit={{
                width: 0,
                transition: { duration: 0.3 },
              }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="container"
                initial="closed"
                animate="open"
                variants={sideVariants}
              >
                <div
                  onClick={() => toggleMenu(false)}
                  className="cursor-pointer w-min pt-6 "
                >
                  <CloseIcon />
                </div>
                <div className="flex flex-col pt-9 py-6 gap-6 text-3xl font-primary ">
                  {/* about */}
                  <motion.p
                    className="w-min cursor-pointer py-1"
                    {...menuItemAnimation}
                    variants={itemVariants}
                  >
                    <Link href="/about">about</Link>
                  </motion.p>
                  {/* auctions */}
                  <motion.a
                    className="cursor-pointer py-1"
                    {...menuItemAnimation}
                    href="/"
                    target="_blank"
                    rel="noreferrer"
                    variants={itemVariants}
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
                    variants={itemVariants}
                  >
                    twitter
                  </motion.a>
                  {/* design */}
                  {/* <Link href="/design"> */}
                  <motion.p
                    className="py-1 whitespace-nowrap text-slimes-dark"
                    // {...menuItemAnimation}
                    variants={disabledItemVariants}
                  >
                    design notes (soon)
                  </motion.p>
                  {/* </Link> */}

                  {/* slimes-only */}
                  <motion.p
                    className="py-1 whitespace-nowrap text-slimes-dark"
                    // {...menuItemAnimation}
                    variants={disabledItemVariants}
                  >
                    {/* <Link href="/slimes-only"> */}
                    slimes only (soon)
                    {/* </Link> */}
                  </motion.p>
                </div>
              </motion.div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Menu;
