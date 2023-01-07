import { FC, useEffect } from "react";
import { Logo, MenuController } from "@components";
import { motion, Variants } from "framer-motion";

interface Props {
  showHeader?: boolean;
  isStatic?: boolean;
}
const Header: FC<Props> = (props: Props) => {
  const { isStatic = true, showHeader = false } = props;
  const height = 104;
  const headerVariants: Variants = {
    show: {
      y: 0,
      transition: {
        delay: 0.5,
        duration: 0.69,
        ease: "easeInOut",
      },
    },
    hidden: {
      y: -height,
      transition: {
        delay: 0.5,
        duration: 0.69,
        ease: "easeInOut",
      },
    },
  };

  const Content = () => (
    <div className="w-screen px-4 sm:px-6 lg:px-10 py-6 flex justify-between items-center z-50 bg-custom-primary opacity-90">
      <Logo />
      <MenuController />
    </div>
  );

  return (
    <header className="fixed top-0 z-50">
      {isStatic ? (
        <Content />
      ) : (
        <motion.aside
          variants={headerVariants}
          initial={"hidden"}
          // initial="hidden"
          animate={showHeader ? "show" : "hidden"}
          // initial={{ y: 0 }}
          // animate={{ y: -height }}
          // transition={{
          //   duration: 2,
          //   ease: "easeInOut",
          // }}
        >
          <Content />
        </motion.aside>
      )}
    </header>
  );
};

export default Header;
