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
      className={`${className} w-10 h-10`}
    >
      <g clipPath="url(#clip0_1_240)" filter="url(#filter0_d_1_240)">
        <path
          d="M9 123.01L127.01 5"
          stroke="#8BD2B9"
          strokeWidth="10"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
        <path
          d="M9 5L127.01 123.01"
          stroke="#8BD2B9"
          strokeWidth="10"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_1_240"
          x="0"
          y="0"
          width="136.01"
          height="136.01"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_1_240"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1_240"
            result="shape"
          />
        </filter>
        <clipPath id="clip0_1_240">
          <rect
            width="128.01"
            height="128.01"
            fill="white"
            transform="translate(4)"
          />
        </clipPath>
      </defs>
    </motion.svg>
  );
};

export default CloseIcon;
