import { FC, HTMLAttributes, ReactNode, useEffect, useState } from "react";
import { StoreModal, ExitModal } from "@merch-components";
import { AnimatePresence } from "framer-motion";
import { StoreContext } from "@merch-constants";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const MerchModule: FC<Props> = (props: Props) => {
  const { children, className, ...componentProps } = props;

  //context variables
  const [showStore, setShowStore] = useState<boolean>(false);
  const [showExitModal, setShowExitModal] = useState<boolean>(false);
  const value = {
    showStore,
    setShowStore,
    showExitModal,
    setShowExitModal,
  };

  useEffect(() => {
    console.log("parent showStore ", showStore);
  }, [showStore]);

  return (
    <StoreContext.Provider value={value}>
      {children}
      <AnimatePresence mode="wait">
        {showStore && <StoreModal />}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {showExitModal && <ExitModal />}
      </AnimatePresence>
    </StoreContext.Provider>
  );
};
export default MerchModule;
