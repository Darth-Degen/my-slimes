import { Modal, Store, ItemDetail, Checkout } from "@merch-components";
import { StoreContext } from "@merch-constants";
import { FC, useContext, useState } from "react";

const StoreModal: FC = () => {
  const { showStore, setShowExitModal } = useContext(StoreContext);

  //step 1 = store list, step 2 = item details
  const [step, setStep] = useState<number>(1);
  //step 1 = cart, step 2 = purchase, step 3 = review
  const [checkoutStep, setCheckoutStep] = useState<number>(0);

  return (
    <Modal
      show={showStore}
      onClick={() => {
        setShowExitModal(true);
      }}
      className="h-3/4 w-5/6"
    >
      <div className="flex flex-col items-center justify-center h-full w-full text-3xl">
        {step === 1 && checkoutStep === 0 && <Store />}
        {step === 2 && checkoutStep === 0 && <ItemDetail />}
        {/* TODO: handle step 1-3 view inside Checkout */}
        {checkoutStep > 0 && <Checkout step={checkoutStep} />}
      </div>
    </Modal>
  );
};

export default StoreModal;
