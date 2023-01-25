import { Dispatch, FC, SetStateAction } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CloseIcon } from "@components";
import Link from "next/link";
import { useWindowSize } from "@hooks";
import { midExitAnimation } from "@constants";

const sideVariants = {
  closed: {
    opacity: 0,
    transition: {
      // staggerChildren: 0.15,
      // staggerDirection: -1,
    },
  },
  open: {
    opacity: 1,
    transition: {
      delay: 1.4,
      // staggerChildren: 0.15,
      // staggerDirection: 1,
    },
  },
};
const itemVariants = {
  closed: {
    opacity: 0,
  },
  open: { opacity: 1 },
};

interface Props {
  toggleMenu: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}

const Menu: FC<Props> = (props: Props) => {
  const { toggleMenu, open } = props;
  const [winWidth, winHeight] = useWindowSize();

  const isTablet: boolean = winWidth < 800;

  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        {open && (
          // <motion.div
          //   className="min-h-screen w-screen absolute inset-0 bg-black bg-opacity-10 duration-500"
          //   key="main-menu"
          //   {...midExitAnimation}
          //   onMouseLeave={() => toggleMenu(false)}
          // >
          <motion.aside
            key="main-menu"
            onMouseLeave={() => toggleMenu(false)}
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: isTablet ? winWidth : 768, opacity: 1 }}
            exit={{
              width: 0,
              transition: { duration: 0.5 },
              opacity: 1,
            }}
            transition={{ duration: 0.7 }}
            className="bg-white fixed top-0 right-0 z-100 shadow-xl rounded-l-lg overflow-y-auto bg-opacity-95"
            onClick={() => toggleMenu(false)}
          >
            <motion.div
              className={`px-4 sm:px-6 lg:px-10 py-6 h-screen `}
              // initial="closed"
              // animate="open"
              // variants={sideVariants}
            >
              <div className="flex w-full justify-end items-center">
                <div
                  onClick={() => toggleMenu(false)}
                  className="cursor-pointer"
                >
                  <CloseIcon />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-rows-2 md:grid-cols-2 gap-10 gap-y-14 pl-7 pt-6 pb-20 md:pb-8 md:pl-auto overflow-y-auto">
                {menuData.map((group, index) => (
                  <MenuGroup key={index} group={group} />
                ))}
              </div>
            </motion.div>
          </motion.aside>
          // </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const menuData = [
  {
    name: "For my Slimes",
    data: [
      {
        title: "My Slimes",
        description: "Wallpapers, PFPs, and more",
        src: "/my-slimes",
        isInternal: true,
      },
      {
        title: "About",
        description: "Information about Scum and the project",
        src: "/about",
        isInternal: true,
      },
    ],
  },
  {
    name: "Socials",
    data: [
      {
        title: "Discord",
        description: "The home of all Slimes",
        src: "https://discord.gg/DQBgFmTU",
        isInternal: false,
      },
      {
        title: "Twitter",
        description: "Slimes can be social too, right?",
        src: "https://twitter.com/MySlimes_",
        isInternal: false,
      },
    ],
  },
  {
    name: "Secondary",
    data: [
      {
        title: "Exchange Art",
        description: "Buy a Slime on our primary marketplace",
        src: "https://exchange.art/series/Slimes/nfts?sort=contract-type&filters=%7B%7D",
        isInternal: false,
      },
    ],
  },
  {
    name: "Collab",
    data: [
      {
        title: "Collaboration Form",
        description: "We use Subber, check out our form",
        src: "https://www.subber.xyz/slimes/giveaways/collab-request",
        isInternal: false,
      },
    ],
  },
];

interface MenuItems {
  title: string;
  description: string;
  src: string;
  isInternal: boolean;
}
interface MenuGroup {
  name: string;
  data: MenuItems[];
}
interface mgProps {
  group: MenuGroup;
}

const MenuGroup: FC<mgProps> = (props: mgProps) => {
  const { group } = props;
  return (
    <motion.div
      className="font-primary flex flex-col gap-3 min-w-[200px]"
      variants={itemVariants}
    >
      <h3 className=" text-3xl  ">{group.name}</h3>
      {group.data.map((item, index) => {
        if (item.isInternal) {
          return (
            <Link href={item.src} key={index}>
              <MenuItem item={item} />
            </Link>
          );
        }
        return (
          <motion.a
            className="cursor-pointer py-1"
            href={item.src}
            target="_blank"
            rel="noreferrer"
            key={index}
          >
            <MenuItem item={item} />
          </motion.a>
        );
      })}
    </motion.div>
  );
};

interface miProps {
  item: MenuItems;
}
const MenuItem: FC<miProps> = (props: miProps) => {
  const { item } = props;
  return (
    <div className="flex flex-col cursor-pointer">
      <div className="text-custom-primary text-xl relative hover:underline">
        {item.title}
      </div>
      <p className="text-custom-gray ">{item.description}</p>
    </div>
  );
};

export default Menu;
