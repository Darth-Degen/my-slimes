import { FC, SVGProps, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
interface Props extends SVGProps<SVGSVGElement> {
  fillHover?: string;
}

const LogoIcon: FC<Props> = (props: Props) => {
  const { fillHover = "#121212", className, fill = "white" } = props;

  const menuAnimation = {
    // whileHover: { scale: 1.05 },
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    // whileTap: { scale: 0.9 },
    transition: { duration: 0.3, ease: "easeInOut" },
  };

  return (
    <motion.div
      className="cursor-pointer p-3 hover:shadow hover:shadow-white transition-shadow duration-300 rounded"
      {...menuAnimation}
    >
      <svg
        width="83"
        height="52"
        viewBox="0 0 83 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${className} w-[41.5px] h-[26px]`}
        id="exit-icon"
      >
        <path
          d="M2.69633 3.03906H80.302"
          stroke="#F3F1EA"
          strokeWidth="3"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
        <path
          d="M2.69633 26.354H80.302"
          stroke="#F3F1EA"
          strokeWidth="3"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
        <path
          d="M2.69633 49.6748H80.302"
          stroke="#F3F1EA"
          strokeWidth="3"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
      </svg>
    </motion.div>
  );
};

export default LogoIcon;
