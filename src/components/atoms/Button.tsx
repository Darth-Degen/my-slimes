import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LoadCircle } from "@components";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isLoading?: boolean;
}

const Button: FC<Props> = (props: Props) => {
  const { children, isLoading = false, className, ...componentProps } = props;
  const styles: string = "w-48 md:w-56 h-12 bg-dark text-white text-sm";

  return (
    <motion.div
      whileHover={{ scale: componentProps.disabled ? 1 : 1.015 }}
      whileTap={{ scale: componentProps.disabled ? 1 : 0.99 }}
    >
      <button
        className={`${styles} transition-colors duration-500 relative flex justify-center items-center rounded text-center bg-custom-green ${className} ${
          componentProps.disabled ? "cursor-not-allowed  opacity-80" : " "
        }`}
        {...componentProps}
        disabled={componentProps.disabled}
      >
        <AnimatePresence mode="wait">
          {isLoading ? <LoadCircle color="white" /> : <p>{children}</p>}
        </AnimatePresence>
      </button>
    </motion.div>
  );
};

export default Button;
