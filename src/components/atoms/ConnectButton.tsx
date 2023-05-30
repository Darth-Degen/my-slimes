import { FC } from "react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { WalletButton } from "@components";

const ConnectButton: FC = () => {
  const { setVisible } = useWalletModal();

  return (
    <WalletButton
      className="relative min-w-[195px]"
      onClick={() => setVisible(true)}
      loadingText=""
    >
      Connect Wallet
    </WalletButton>
  );
};

export default ConnectButton;
