import { AnimatePresence, motion } from "framer-motion";
import { FC, useState } from "react";
import { midExitAnimation } from "@constants";
import { useWindowSize } from "@hooks";

interface MenuItems {
  title: string;
  subtitle: string;
  src: string;
  isLanding: boolean;
}
interface miProps {
  item: MenuItems;
}
const MenuItem: FC<miProps> = (props: miProps) => {
  const { item } = props;

  const [hover, setHover] = useState<boolean>(false);
  const [winWidth, winHeight] = useWindowSize();

  return (
    <div
      className="flex flex-col lg:flex-row lg:items-end lg:gap-1.5 cursor-pointer uppercase font-black"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className={`responsive-font lg:text-9xl 3xl:text-[12rem] 4xl:text-[16rem] relative transition-colors duration-500 ${
          hover ? "text-v2-green" : "text-custom-primary "
        }`}
      >
        {item.title}
      </div>
      {winWidth < 1024 ? (
        <motion.p
          key="subtitle"
          className="text-v2-green text-2xl whitespace-nowrap self-start -mt-4 ml-1 "
          {...midExitAnimation}
        >
          {item.subtitle}
        </motion.p>
      ) : (
        <AnimatePresence mode="wait">
          {hover && (
            <motion.p
              key="subtitle"
              className="text-custom-primary text-2xl whitespace-normal w-10 self-end pb-2.5 pl-1"
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
