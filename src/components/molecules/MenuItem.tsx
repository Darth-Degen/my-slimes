import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, FC, useContext, useState } from "react";
import { ViewContext, midExitAnimation } from "@constants";
import { useWindowSize } from "@hooks";
import { useRouter } from "next/router";
import { scrollToSection } from "@helpers";
interface MenuItems {
  title: string;
  subtitle: string;
  src: string;
  isLanding: boolean;
}
interface miProps {
  item: MenuItems;
  toggleMenu: Dispatch<React.SetStateAction<boolean>>;
}
const MenuItem: FC<miProps> = (props: miProps) => {
  const { item, toggleMenu } = props;

  const [hover, setHover] = useState<boolean>(false);
  const [winWidth, winHeight] = useWindowSize();
  const router = useRouter();

  const { setDidMenuClick } = useContext(ViewContext);

  const handleClick = (): void => {
    if (item.title !== "slimes" && winWidth < 1024) return;
    setDidMenuClick(true);
    if (!item.isLanding) router.push(item.src);
    else scrollToSection(item.title);
    toggleMenu(false);
  };

  return (
    <div
      className="flex flex-col lg:flex-row lg:items-end lg:gap-1.5 cursor-pointer uppercase font-black"
      onMouseEnter={() => winWidth >= 1024 && setHover(true)}
      onMouseLeave={() => winWidth >= 1024 && setHover(false)}
      onClick={() => handleClick()}
    >
      <div
        className={`responsive-font lg:text-9xl 2xl:text-[9rem] 3xl:text-[12rem] 4xl:text-[16rem] relative transition-colors duration-500 ${
          hover ? "text-v2-green" : "text-custom-primary "
        } ${item.title !== "slimes" && winWidth < 1024 && "opacity-50"}`}
      >
        {item.title}
      </div>
      {winWidth < 1024 ? (
        <motion.p
          key="subtitle"
          className={`text-v2-green text-2xl whitespace-nowrap self-start -mt-4 ml-1 ${
            item.title !== "slimes" && "!opacity-50"
          }`}
          {...midExitAnimation}
        >
          {item.subtitle}
        </motion.p>
      ) : (
        <AnimatePresence mode="wait">
          {hover && (
            <motion.p
              key="subtitle"
              className="text-custom-primary text-2xl 2xl:text-4xl whitespace-normal w-10 self-end pb-2.5 2xl:pb-3 pl-1"
              {...midExitAnimation}
            >
              {item.subtitle}
            </motion.p>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

export default MenuItem;
