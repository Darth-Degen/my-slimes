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
  updateSessionCart: (racks: number) => Promise<void>;
  shippingFee: number;
  solPrice: number;
  shippingCurrency: string;
  setShippingCurrency: Dispatch<SetStateAction<string>>;
  txDividend: number;
}
const OrderModal: FC<Props> = (props: Props) => {
  const {
    cart,
    setCart,
    updateSessionCart,
    shippingFee,
    solPrice,
    shippingCurrency,
    setShippingCurrency,
    txDividend,
  } = props;
  const { showOrderModal, step, setStep } = useContext(StoreContext);

  const [isOrdering, setIsOrdering] = useState<boolean>(false);

  const handleToggle = () => {
    setShippingCurrency((prevValue) => (prevValue === "sol" ? "usdc" : "sol"));
  };

  const calculateRacks = (): number => {
    if (cart.length === 0) return 0;
    //calculate total
    return cart.reduce((total, item) => {
      return total + item.cost;
    }, 0);
  };

  const handleOrder = (): void => {
    updateSessionCart(calculateRacks());
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
        <h2 className="text-4xl md:text-[80px]  pb-10 lowercase">
          all in time
        </h2>
        <AnimatePresence mode="wait">
          {step === 5 && (
            <motion.div
              key="step-5"
              className="flex flex-col items-center gap-10"
              {...midExitAnimation}
            >
              <div className="flex flex-col items-center uppercase font-neuebit-bold text-xl md:text-3xl lg:w-full ">
                <p className="text-m-red text-4xl pb-3">attention</p>
                <p className="pb-5">
                  we will now be collecting your racks and shipping fees
                </p>

                <p className="pt-5">
                  **you can only place 1 order per wallet. Future purchases must
                  be made from a different wallet.
                </p>
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
              <div className="flex flex-col items-center uppercase font-neuebit-bold text-2xl md:text-3xl lg:w-full gap-10">
                <p key="step-6">
                  You will now be deducted ({calculateRacks()}) NFTs &
                  {Number((shippingFee / solPrice).toFixed(2))} SOL
                  {/* or $
                    {shippingFee} USDC for shipping */}
                </p>
                {/* <div className="flex items-center gap-2  uppercase font-neuebit-bold text-xl text-m-mid-gray">
                  <span>usdc</span>
                  <button
                    onClick={handleToggle}
                    className=" px-1 relative inline-flex flex-shrink-0 items-center h-[26px] w-[50px] rounded-full bg-gray-300 cursor-pointer focus:outline-none "
                  >
                    <span
                      className={`${
                        shippingCurrency === "sol"
                          ? "translate-x-[22px] bg-indigo-500"
                          : "translate-x-0 bg-indigo-500"
                      } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform transition ease-in-out duration-200`}
                    />
                  </button>
                  <span>sol</span>
                </div> */}
                {/* <p className="uppercase font-neuebit-bold text-lg text-m-mid-gray -mt-9">
                  choose how you want to pay for shipping
                </p> */}
                {calculateRacks() > txDividend ? (
                  <>
                    <p className="text-m-red text-2xl">
                      since your order is over {txDividend} racks
                      <br />
                      you will need to confirm (
                      {Math.ceil(calculateRacks() / txDividend)}) Transactions{" "}
                      <br /> this will take a few minutes
                    </p>
                  </>
                ) : (
                  <p className="text-m-red text-lg">all sales are final</p>
                )}
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
                <p className=" uppercase font-neuebit-bold text-xl text-m-mid-gray pt-1">
                  (place order)
                </p>
                <p className=" uppercase font-neuebit-bold text-xl text-m-mid-gray -mt-2">
                  (for real this time)
                </p>
              </div>
            </motion.div>
          )}
          {step === 7 && (
            <motion.div
              key="step-7"
              className="flex flex-col items-center gap-10"
              {...midExitAnimation}
            >
              <div className="flex flex-col items-center uppercase font-neuebit-bold text-xl md:text-3xl lg:w-full gap-10">
                <p>THANK YOU FOR YOUR ORDER!</p>

                <p>WE WILL UPDATE WITH SHIPPING INFORMATION VIA YOUR EMAIL.</p>

                <p>ALL IN TIME, MY SLIME.</p>
                <Image
                  src={`${process.env.NEXT_PUBLIC_CDN_URL}/images/hands.png`}
                  width={300}
                  height={300}
                  alt="Handshake"
                />
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
