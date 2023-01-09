import { FC, useState } from "react";
import { LogoIcon } from "@components";
import Link from "next/link";
import { motion } from "framer-motion";

const Logo: FC = () => {
  const [animate, setAnimate] = useState<boolean>(false);

  const containerAnimation = {
    animate: {
      opacity: 1,
      rotate: animate ? -360 : 0,
      scale: animate ? 1.35 : 1,
    },
    exit: { opacity: 0 },
    transition: { duration: 0.5, ease: "easeInOut" },
  };

  return (
    <div className="my-0 flex items-center gap-2 text-gray-200 transition-colors ease-in-out duration-500 cursor-pointer">
      <motion.div
        className="rounded"
        {...containerAnimation}
        onMouseEnter={() => setAnimate(true)}
        onMouseLeave={() => setAnimate(false)}
      >
        <Link href="/">
          <LogoIcon fill={"#FFFFFF"} fillHover={"#FFFFFF"} />
        </Link>
      </motion.div>
    </div>
  );
};
export default Logo;
