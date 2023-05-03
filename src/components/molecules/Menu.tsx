import { Dispatch, FC, SetStateAction } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MenuItem } from "@components";
import { useWindowSize } from "@hooks";
interface Props {
  toggleMenu: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}

const Menu: FC<Props> = (props: Props) => {
  const { toggleMenu, open } = props;
  const [winWidth, winHeight] = useWindowSize();

  //breakpoints
  const isMd: boolean = winWidth > 768 - 1;
  const isLg: boolean = winWidth > 1024 - 1;
  const isXl: boolean = winWidth > 1260 - 1;

  const getWidth = (): number => {
    if (isXl) return winWidth * 0.55;
    if (isLg) return winWidth * 0.69;
    if (isMd) return winWidth * 0.79;
    return winWidth - 15;
  };

  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        {open && (
          <motion.aside
            key="main-menu"
            // onMouseLeave={() => toggleMenu(false)}
            initial={{ width: 0, opacity: 0 }}
            animate={{
              // width: isLg ? winWidth - 15 : winWidth * 0.55,
              width: getWidth(),
              opacity: 1,
            }}
            exit={{
              width: 0,
              transition: { duration: 0.5 },
              opacity: 1,
            }}
            transition={{ duration: 0.7 }}
            className="fixed top-0 right-0 z-100 shadow-xl  overflow-y-auto bg-custom-tertiary"
            onClick={() => toggleMenu(false)}
          >
            <motion.div className="flex flex-col justify-around px-4 sm:px-6 lg:px-10 py-6 h-screen overflow-x-hidden">
              {menuData.map((item, index) => (
                <MenuItem key={index} item={item} />
              ))}
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

const menuData = [
  {
    title: "what",
    subtitle: "we're doing",
    src: "",
    isLanding: true,
  },
  {
    title: "who",
    subtitle: "we are",
    src: "",
    isLanding: true,
  },
  {
    title: "friends",
    subtitle: "with benifits",
    src: "",
    isLanding: true,
  },
  {
    title: "where",
    subtitle: "to buy",
    src: "",
    isLanding: true,
  },
  {
    title: "slimes",
    subtitle: "only",
    src: "/slimes",
    isLanding: false,
  },
];

export default Menu;
