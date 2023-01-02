import { motion } from "framer-motion";
import { FC, ButtonHTMLAttributes, useEffect, useState } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  handleToggle: (value: boolean) => void;
}

const ButtonBar: FC<Props> = (props: Props) => {
  const { label, handleToggle, className, ...componentProps } = props;
  const [showLogo, setShowLogo] = useState<boolean>(false);

  const styles: string = "h-10 bg-dark text-[9px]";

  const green700 = "#15803d";
  const green600 = "#16a34a";
  const green500 = "#22c55e";

  const red700 = "#b91c1c";
  const red600 = "#dc2626";
  const red500 = "#ef4444";

  useEffect(() => {
    handleToggle(showLogo);
  }, [handleToggle, showLogo]);

  return (
    <div className="flex gap-2 items-center text-[11px]">
      <div
        className={`${className} coursrelative flex justify-between ${styles} transition-all duration-200 rounded items-center p-2 text-gray-400 ${
          componentProps.disabled
            ? "cursor-not-allowed bg-customDarkGray border-customDarkGray"
            : ""
        }`}
      >
        <p className="cursor-default">{label}</p>
      </div>
      <motion.button
        className={`w-14 rounded border-b-4 border-r-4 h-10 text-gray-50 ${
          componentProps.disabled ? "cursor-not-allowed " : ""
        }`}
        initial={{
          scale: showLogo || componentProps.disabled ? 0.97 : 1,
          backgroundColor:
            showLogo || componentProps.disabled ? green700 : green500,
          borderBottomColor: green600,
          borderRightColor: green700,
        }}
        whileTap={{ scale: 0.97, backgroundColor: green700 }}
        animate={{
          scale: showLogo || componentProps.disabled ? 0.97 : 1,
          backgroundColor:
            showLogo || componentProps.disabled ? green700 : green500,
          borderBottomColor:
            showLogo || componentProps.disabled ? green700 : green600,
        }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        onClick={() => setShowLogo(!showLogo)}
        disabled={componentProps.disabled}
      >
        Yes
      </motion.button>

      <motion.button
        className={`w-14 rounded border-b-4 border-r-4 h-10 text-gray-50 ${
          componentProps.disabled ? "cursor-not-allowed " : ""
        }`}
        initial={{
          scale: !showLogo || componentProps.disabled ? 0.97 : 1,
          backgroundColor:
            !showLogo || componentProps.disabled ? red700 : red500,
          borderBottomColor:
            !showLogo || componentProps.disabled ? red700 : red600,
          borderRightColor: red700,
        }}
        whileTap={{ scale: 0.97, backgroundColor: red700 }}
        animate={{
          scale: !showLogo || componentProps.disabled ? 0.97 : 1,
          backgroundColor:
            !showLogo || componentProps.disabled ? red700 : red500,
          borderBottomColor:
            !showLogo || componentProps.disabled ? red700 : red600,
        }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        onClick={() => setShowLogo(!showLogo)}
        disabled={componentProps.disabled}
      >
        No
      </motion.button>
    </div>
  );
};

export default ButtonBar;
