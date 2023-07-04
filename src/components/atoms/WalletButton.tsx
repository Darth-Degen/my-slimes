import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import {
  midTapAnimation,
  fastExitAnimation,
  smallClickAnimation,
} from "@constants";
import { AnimatePresence, motion } from "framer-motion";
import { LoadCircle } from "@components";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isLoading?: boolean;
  loadingText?: string;
}

const WalletButton: FC<Props> = (props: Props) => {
  const { visible } = useWalletModal();
  const { connecting } = useWallet();

  const { children, className, isLoading, loadingText, ...componentProps } =
    props;

  return (
    // <motion.div {...midTapAnimation}>
    <button
      className={`relative h-14 w-52 text-2xl rounded-full border font-neuebit-bold border-black bg-[#E8E8E8] ${className}`}
      {...componentProps}
      {...smallClickAnimation}
    >
      <AnimatePresence mode="wait">
        {visible || connecting || isLoading ? (
          <motion.div
            className="flex items-center justify-center"
            key="spinner"
            {...fastExitAnimation}
          >
            <LoadCircle color="#312A29" />
            {/* {loadingText && <p key="connect-btn-loading"> {loadingText}</p>} */}
          </motion.div>
        ) : (
          <motion.div
            key="connect-btn-standard"
            className=""
            {...fastExitAnimation}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </button>
    // </motion.div>
  );
};

export default WalletButton;
