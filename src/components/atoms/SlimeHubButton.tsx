import { FC } from "react";
import { smallClickAnimation } from "@merch-constants";
import { motion } from "framer-motion";

interface Props {
  text: string;
  className?: string;
  onClick?: () => void;
}

const SlimeHubButton: FC<Props> = ({
  text,
  className = "",
  onClick = undefined,
}) => {
  return (
    <motion.button
      className={`${className} bg-v2-green text-sm min-w-[190px] h-[60px] rounded-lg 
      font-secondary text-slimes-black uppercase line-through disabled:cursor-not-allowed`}
      {...smallClickAnimation}
      disabled={true}
      onClick={onClick}
    >
      {text}
    </motion.button>
  );
};

export default SlimeHubButton;
