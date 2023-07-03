import { FC, HTMLAttributes, ReactNode, useEffect, useState } from "react";
import { StoreModal, ExitModal, OrderModal } from "@merch-components";
import { AnimatePresence } from "framer-motion";
import { StoreContext } from "@merch-constants";
import { Merch } from "@merch-types";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const MerchModule: FC<Props> = (props: Props) => {
  const { children, className, ...componentProps } = props;

  //context variables
  const [showStore, setShowStore] = useState<boolean>(false);
  const [showExitModal, setShowExitModal] = useState<boolean>(false);
  const [showOrderModal, setShowOrderModal] = useState<boolean>(false);
  const [cart, setCart] = useState<Merch[]>([]);
  const [step, setStep] = useState<number>(0);
  const value = {
    showStore,
    setShowStore,
    showExitModal,
    setShowExitModal,
    showOrderModal,
    setShowOrderModal,
    step,
    setStep,
  };

  //handle order modal
  useEffect(() => {
    if (step > 4) setShowOrderModal(true);
    else setShowOrderModal(false);
  }, [setShowOrderModal, step]);

  return (
    <StoreContext.Provider value={value}>
      {children}
      {/* store */}
      <AnimatePresence mode="wait">
        {showStore && <StoreModal cart={cart} setCart={setCart} />}
      </AnimatePresence>
      {/* order */}
      <AnimatePresence mode="wait">
        {showOrderModal && <OrderModal cart={cart} setCart={setCart} />}
      </AnimatePresence>
      {/* exit */}
      <AnimatePresence mode="wait">
        {showExitModal && <ExitModal />}
      </AnimatePresence>
    </StoreContext.Provider>
  );
};
export default MerchModule;
