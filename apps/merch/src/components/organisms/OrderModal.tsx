import { Modal } from "@merch-components";
import { StoreContext, midExitAnimation } from "@merch-constants";
import { Dispatch, FC, SetStateAction, useContext, useState } from "react";
import Image from "next/image";
import { Merch } from "@merch-types";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-hot-toast";
import OrderIcon from "../../../images/icons/close.svg";
interface Props {
  cart: Merch[];
  setCart: Dispatch<SetStateAction<Merch[]>>;
}
const OrderModal: FC<Props> = (props: Props) => {
  const { cart, setCart } = props;
  const { showOrderModal, step, setStep } = useContext(StoreContext);

  const [isOrdering, setIsOrdering] = useState<boolean>(false);

  //TODO: what is shipping fee
  const shippingFee = 2;

  const calculateRacks = (): number => {
    if (cart.length === 0) return 0;
    //calculate total
    return cart.reduce((total, item) => {
      return total + item.cost;
    }, 0);
  };

  const handleOrder = (): void => {
    // const toastId = setIsOrdering(true);
    // toast.loading("Ordering...");
    // toast.dismiss();
    //setStep(7);
  };

  return (
    <Modal
      show={showOrderModal}
      onClick={() => {
        setStep(4);
      }}
      className="w-[80%] lg:w-2/3  3xl:w-1/2 h-[93%] xl:h-[800px]"
    >
      <div className="relative self-center flex flex-col items-center px-20 py-[30%] md:py-[15%] lg:justify-start h-full w-full  text-center gap-10">
        {/* content */}
        <h2 className="text-4xl md:text-[80px] text-ait-teal pb-14 lowercase">
          all in time
        </h2>
        <AnimatePresence mode="wait">
          {step === 5 && (
            <motion.div
              key="step-5"
              className="flex flex-col items-center gap-10"
              {...midExitAnimation}
            >
              <div className="flex flex-col items-center uppercase font-neuebit-bold text-2xl md:text-4xl lg:w-1/2 gap-10">
                <p>
                  At this point of the checkout process we are going to be
                  collecting your RACKS (nfts) + the shipping cost for your
                  merch (sol).
                </p>
                <p className="text-m-red text-lg">all sales are final</p>
              </div>

              <div className="flex flex-col items-center gap-2">
                <button
                  className="h-12 w-60 bg-ait-teal rounded-full uppercase font-neuebit-bold text-xl text-white pt-0.5 tracking-wide"
                  onClick={() => {
                    setStep(6);
                  }}
                >
                  Ok ok I get it
                </button>
              </div>
            </motion.div>
          )}
          {step === 6 && (
            <motion.div
              key="step-6"
              className="flex flex-col items-center gap-10"
              {...midExitAnimation}
            >
              <div className="flex flex-col items-center uppercase font-neuebit-bold text-2xl md:text-4xl lg:w-full gap-10">
                <p key="step-6">
                  You will now be deducted ({calculateRacks()}) NFTs & (
                  {shippingFee}) sol
                </p>
                <p className="text-m-red text-lg">all sales are final</p>
              </div>

              <div className="flex flex-col items-center gap-2">
                <button
                  className="h-12 w-60 bg-ait-teal rounded-full uppercase font-neuebit-bold text-xl text-white pt-0.5 tracking-wide disabled:cursor-not-allowed"
                  onClick={() => {
                    handleOrder();
                  }}
                  disabled={isOrdering}
                >
                  {isOrdering ? "running it..." : "run it"}
                </button>
                <p className="text-ait-teal uppercase font-neuebit-bold text-xl">
                  (place order)
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* close icon */}
        <div
          className="absolute top-5 right-5 cursor-pointer"
          onClick={() => {
            setStep(4);
          }}
        >
          <Image src={OrderIcon} alt="esc" width={35} height={35} />
        </div>
      </div>
    </Modal>
  );
};

export default OrderModal;
