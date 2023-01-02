import { FC, SVGProps, useState } from "react";
import { motion } from "framer-motion";

interface Props extends SVGProps<SVGSVGElement> {
  fillHover?: string;
}

const LogoIcon: FC<Props> = (props: Props) => {
  const { fillHover = "#121212", className, fill = "white" } = props;

  const menuAnimation = {
    // whileHover: { scale: 1.05 },
    whileTap: { scale: 0.9 },
    transition: { duration: 0.3, ease: "easeInOut" },
  };

  return (
    <motion.svg
      width="107"
      height="67"
      viewBox="0 0 107 67"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} w-10 h-8 cursor-pointer`}
      {...menuAnimation}
    >
      <g clip-path="url(#clip0_1_51)">
        <path
          d="M3.02441 3.02441H103.975"
          stroke={fill}
          stroke-width="10"
          stroke-miterlimit="10"
          stroke-linecap="round"
        />
        <path
          d="M3.02441 33.3535H103.975"
          stroke={fill}
          stroke-width="10"
          stroke-miterlimit="10"
          stroke-linecap="round"
        />
        <path
          d="M3.02441 63.6895H103.975"
          stroke={fill}
          stroke-width="10"
          stroke-miterlimit="10"
          stroke-linecap="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1_51">
          <rect width="107" height="66.7139" fill={fill} />
        </clipPath>
      </defs>
    </motion.svg>
  );
};

export default LogoIcon;
