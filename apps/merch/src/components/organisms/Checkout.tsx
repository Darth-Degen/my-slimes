import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, FC, SetStateAction } from "react";
import {
  CartActions,
  CheckoutCart,
  ShippingForm,
  ShippingDetails,
} from "@merch-components";
import { Merch, ShippingInfo } from "@merch-types";
import toast from "react-hot-toast";
import { fastExitAnimation } from "@merch-constants";

interface Props {
  cart: Merch[];
  step: number;
  setStep: (value: number) => void;
  updateCart: Dispatch<SetStateAction<Merch[]>>;
  shipping: ShippingInfo;
  setShipping: Dispatch<SetStateAction<ShippingInfo>>;
  racks: number;
  // const shippingFee = 2;
  shippingFee: number;
  solPrice: number;
  getNfts: () => Promise<void>;
  placeOrder: () => void;
}
//step 2 = cart, step 3 = shipping info, step 4 = review
const Checkout: FC<Props> = (props: Props) => {
  const {
    cart,
    step,
    setStep,
    updateCart,
    shipping,
    setShipping,
    racks,
    shippingFee,
    solPrice,
    getNfts,
    placeOrder,
  } = props;

  //TODO: what id shipping fee
  // const shippingFee = 2;

  const calculateRacks = (): number => {
    if (cart.length === 0) return 0;
    //calculate total
    return cart.reduce((total, item) => {
      return total + item.cost;
    }, 0);
  };

  const handleCartCheckout = async () => {
    if (cart.length === 0) {
      toast.error("No items in cart");
      return;
    }
    //TODO: add getQuantities: () => Promise<void>;

    // console.log(calculateRacks(), racks);
    if (racks < calculateRacks()) {
      toast.error("Not enough racks");
      return;
    }
    //verify all sizes & colors
    const totalItems = cart.length;
    let totalColors = 0;
    let totalSizes = 0;

    cart.forEach((item) => {
      // console.log(item?.colors, item?.size);
      if (item?.color) totalColors += 1;
      if (item?.size) totalSizes += 1;
    });
    if (totalItems !== totalColors || totalItems !== totalSizes) {
      toast.error("Select all sizes and colors");
      // console.log("totalItems ", totalItems, totalColors, totalSizes);
      return;
    }
    setStep(3);
  };
  // console.log("step ", step);
  return (
    <div className="flex flex-col gap-3 lg:h-[76%] w-full px-6 lg:px-12 mb-5 self-start z-10">
      {/* title */}
      <div className="flex flex-col gap-1 text-m-mid-gray">
        <h3 className="font-neuebit-bold uppercase text-4xl">
          cart - {cart.length} items
        </h3>
      </div>
      {/* row */}
      <div
        className={`flex flex-col xl:flex-row h-dull ${
          step === 4 ? "gap-48" : "gap-20"
        } lg:gap-10`}
      >
        {/* left side */}
        <div className="xl:h-[55vh] max-h-[550px] flex flex-col items-center xl:items-start justify-start gap-3">
          <CheckoutCart cart={cart} updateCart={updateCart} step={step} />
          <AnimatePresence mode="wait">
            {step > 3 && (
              <motion.div
                key="orderinfo"
                className="flex flex-col items-center xl:items-start justify-start gap-3 w-full"
                {...fastExitAnimation}
              >
                <div className="whitespace-no-wrap w-full xl:w-1/2 lg:min-w-[580px] xl:min-w-[650px] flex flex-col md:flex-row justify-between px-8 py-3 bg-white font-neuebit-bold uppercase text-4xl text-m-mid-gray">
                  <p>Cost</p>
                  <p>{calculateRacks()} racks</p>
                </div>
                <div className="w-full xl:w-1/2 lg:min-w-[580px] xl:min-w-[650px] flex flex-col md:flex-row justify-between px-8 py-3 bg-white font-neuebit-bold uppercase text-4xl text-m-mid-gray">
                  <p>shipping</p>
                  <p>
                    {Number((shippingFee / solPrice).toFixed(2))} SOL
                    {/* or $
                    {shippingFee} USDC */}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="w-full xl:w-1/2 lg:min-w-[580px] xl:min-w-[650px] flex flex-col md:flex-row justify-between px-8 py-3 bg-white font-neuebit-bold uppercase text-4xl text-m-mid-gray">
            <p>total</p>
            <p>
              {calculateRacks()} racks{" "}
              {step > 3 &&
                ` + ${Number((shippingFee / solPrice).toFixed(2))}  SOL`}
            </p>
          </div>
        </div>
        {/* right side */}
        <AnimatePresence mode="wait">
          {step === 2 && (
            <CartActions
              setStep={setStep}
              handleCheckout={handleCartCheckout}
            />
          )}
          {step === 3 && (
            <ShippingForm
              setStep={setStep}
              shipping={shipping}
              setShipping={setShipping}
            />
          )}
          {step > 3 && (
            <ShippingDetails
              setStep={setStep}
              shipping={shipping}
              placeOrder={placeOrder}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Checkout;
