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
    <motion.div
      className="cursor-pointer p-3"
      // className="cursor-pointer p-3 hover:shadow hover:shadow-[#8BD2B9] transition-all duration-300 rounded"
      // {...menuAnimation}
    >
      <svg
        viewBox="0 0 129 129"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        id="menu-icon"
        // {...menuAnimation}
        className={`${className} w-10 h-10 `}
      >
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
      </svg>
    </motion.div>
  );
};

export default CloseIcon;
