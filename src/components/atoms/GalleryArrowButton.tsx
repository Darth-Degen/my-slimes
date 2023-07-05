import { motion } from "framer-motion";
import { ButtonHTMLAttributes, FC } from "react";
import {} from "@components";
import Image from "next/image";
import { fastExitAnimation } from "src/constants";

interface ArrowProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  direction: string;
}

const GalleryArrowButton: FC<ArrowProps> = (props: ArrowProps) => {
  const { direction = "right", className, ...componentProps } = props;

  const midClickAnimation = {
    whileTap: { scale: componentProps.disabled ? 1 : 0.95 },
    transition: { duration: 0.15 },
  };

  return (
    <motion.div
      {...fastExitAnimation}
      whileTap={{ scale: 0.95 }}
      className="z-10"
    >
      <button
        {...componentProps}
        className={`h-min cursor-pointer transition-opacity duration-200 ${className}  ${
          componentProps.disabled
            ? "opacity-10 cursor-not-allowed"
            : "cursor-pointer "
        }`}
      >
        {/* <motion.div
        // {...midClickAnimation}
        // className={`z-10  ${
        //   direction === "right" ? "-right-0 md:-right-16" : "left-0 md:-left-16"
        // }
        ${
          componentProps.disabled
            ? "opacity-20 cursor-not-allowed"
            : "cursor-pointer "
        } transition-opacity duration-200  `}
      > */}
        {direction === "left" ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_CDN_URL}/images/icons/arrow_left.svg`}
            width={100}
            height={100}
            alt="Left Arrow"
          />
        ) : (
          <Image
            src={`${process.env.NEXT_PUBLIC_CDN_URL}/images/icons/arrow_right.svg`}
            width={100}
            height={100}
            alt="Right Arrow"
          />
        )}
        {/* </motion.div> */}
      </button>
    </motion.div>
  );
};

export default GalleryArrowButton;
