import { FC, SVGProps } from "react";
import { motion } from "framer-motion";

interface Props extends SVGProps<SVGSVGElement> {
  fillHover?: string;
}

const CloseIcon: FC<Props> = (props: Props) => {
  const { fillHover = "#121212", className, fill = "white" } = props;

  const menuAnimation = {
    // whileHover: { scale: 1.05 },
    whileTap: { scale: 0.93 },
    transition: { duration: 0.2, ease: "easeInOut" },
  };

  return (
    <motion.svg
      viewBox="0 0 129 129"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      id="menu-icon"
      {...menuAnimation}
      className={`${className} w-6 h-6`}
    >
      <g clipPath="url(#clip0_1_176)">
        <path
          d="M5 123.01L123.01 5"
          stroke="#8BD2B9"
          strokeWidth="10"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
        <path
          d="M5 5L123.01 123.01"
          stroke="#8BD2B9"
          strokeWidth="10"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
      </g>
      <rect x="0.5" y="0.5" width="127.01" height="127.01" stroke="white" />
      <defs>
        <clipPath id="clip0_1_176">
          <rect width="128.01" height="128.01" fill="white" />
        </clipPath>
      </defs>
    </motion.svg>
  );
};

export default CloseIcon;
