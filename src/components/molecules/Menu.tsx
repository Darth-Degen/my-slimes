import { Dispatch, FC, SetStateAction } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CloseIcon } from "@components";
import Link from "next/link";
import { useWindowSize } from "src/hooks";

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
  open: { opacity: 0.3 },
};
const menuItemAnimation = {
  whileHover: { color: "#8BD2B9" },
  transition: { duration: 0.35 },
};

interface Props {
  toggleMenu: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}

const Menu: FC<Props> = (props: Props) => {
  const { toggleMenu, open } = props;
  const [winWidth, winHeight] = useWindowSize();
  const isMobile: boolean = winWidth < 640;

  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        {open && (
          <motion.div
            key="main-menu"
            className="bg-white fixed top-0 right-0 z-100 shadow-xl rounded-l-lg"
            onClick={() => toggleMenu(false)}
            // onMouseLeave={() => toggleMenu(false)}
          >
            <motion.aside
              initial={{ width: 0 }}
              animate={{ width: isMobile ? winWidth : 400 }}
              exit={{
                width: 0,
                transition: { duration: 0.3 },
              }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className={`px-4 sm:px-6 lg:px-10 py-6 ${
                  isMobile ? "h-screen" : "h-screen"
                }`}
                initial="closed"
                animate="open"
                variants={sideVariants}
              >
                <div className="flex w-full justify-end items-center">
                  <div
                    onClick={() => toggleMenu(false)}
                    className="cursor-pointer"
                  >
                    <CloseIcon />
                  </div>
                </div>
                <div
                  className="flex flex-col pb-16 gap-8 text-3xl font-primary "
                  onClick={() => toggleMenu(false)}
                >
                  {/* about */}
                  <Link href="/about">
                    <motion.p
                      className=" cursor-pointer py-1"
                      {...menuItemAnimation}
                      variants={itemVariants}
                    >
                      about
                    </motion.p>
                  </Link>
                  {/* auctions */}
                  <motion.a
                    className="cursor-pointer py-1"
                    href="https://exchange.art/series/Slimes/nfts?sort=contract-type&filters=%7B%7D"
                    target="_blank"
                    rel="noreferrer"
                    {...menuItemAnimation}
                    variants={itemVariants}
                  >
                    buy a slime
                  </motion.a>
                  {/* design */}
                  {/* <Link href="/design"> */}
                  <motion.p
                    className="cursor-default py-1 whitespace-nowrap text-slimes-dark"
                    // {...menuItemAnimation}
                    variants={disabledItemVariants}
                  >
                    design notes (soon)
                  </motion.p>
                  {/* </Link> */}

                  {/* my slimes */}
                  <Link href="/my-slimes">
                    <motion.p
                      className="cursor-pointer py-1 whitespace-nowrap text-slimes-dark"
                      {...menuItemAnimation}
                      variants={itemVariants}
                    >
                      my slimes
                    </motion.p>
                  </Link>

                  {/* socials */}
                  <motion.a
                    className="cursor-pointer py-1"
                    href="https://twitter.com/MySlimes_"
                    target="_blank"
                    rel="noreferrer"
                    {...menuItemAnimation}
                    variants={itemVariants}
                  >
                    twitter
                  </motion.a>
                  <motion.a
                    className="cursor-pointer py-1"
                    href="https://discord.gg/DQBgFmTU"
                    target="_blank"
                    rel="noreferrer"
                    {...menuItemAnimation}
                    variants={itemVariants}
                  >
                    discord
                  </motion.a>
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
