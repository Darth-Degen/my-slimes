import { Modal, Store, ItemDetail, Checkout } from "@merch-components";
import { StoreContext } from "@merch-constants";
import { FC, useContext, useEffect, useState } from "react";
import { Merch } from "@merch-types";

const StoreModal: FC = () => {
  const { showStore, setShowExitModal } = useContext(StoreContext);

  //step 1 = store list, step 2 = item details
  const [step, setStep] = useState<number>(1);
  //step 1 = cart, step 2 = purchase, step 3 = review
  const [checkoutStep, setCheckoutStep] = useState<number>(0);
  const [cart, setCart] = useState<Merch[]>([]);

  const addToCart = (item: Merch) => {
    setCart((prevState) => [...prevState, item]);
  };

  useEffect(() => {
    console.log("cart ", cart);
  }, [cart]);

  return (
    <Modal
      show={showStore}
      onClick={() => {
        setShowExitModal(true);
      }}
      className="w-[90%] lg:w-5/6 h-[93%] lg:h-3/4  3xl:w-1/2"
    >
      <div className="flex flex-col items-center justify-center h-full w-full text-3xl">
        {step === 1 && checkoutStep === 0 && (
          <Store
            step={step}
            checkoutStep={checkoutStep}
            addToCart={addToCart}
          />
        )}
        {step === 2 && checkoutStep === 0 && <ItemDetail />}
        {/* TODO: handle step 1-3 view inside Checkout */}
        {checkoutStep > 0 && <Checkout step={checkoutStep} />}
      </div>
    </Modal>
  );
};

export default StoreModal;
