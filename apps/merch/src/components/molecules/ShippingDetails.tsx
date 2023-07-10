import { motion } from "framer-motion";
import { FC } from "react";
import { midExitAnimation } from "@merch-constants";
import { ShippingInfo } from "@merch-types";

interface Props {
  shipping: ShippingInfo;
  setStep: (value: number) => void;
  placeOrder: () => void;
}

//step 2 = cart, step 3 = shipping info, step 4 = review
const ShippingForm: FC<Props> = (props: Props) => {
  const { setStep, shipping, placeOrder } = props;

  return (
    <motion.div
      className="relative flex flex-col items-center xl:items-start justify-between uppercase font-neuebit-bold text-xl text-m-mid-gray tracking-wide leading-tight"
      key="shipping"
      {...midExitAnimation}
    >
      <h3 className="text-4xl xl:absolute xl:-top-[51px] -left-0.5 whitespace-nowrap">
        shipping info
      </h3>
      <div className="flex flex-col items-center xl:items-start justify-start">
        <p className="text-3xl pt-8">{shipping.name}</p>
        <p>{shipping.email}</p>
        <p>
          {shipping.address} {shipping.address2}
        </p>
        <p>{shipping.country.name}</p>
        <p>
          {shipping.city}, {shipping.state} {shipping.zip}
        </p>
      </div>
      <div className="flex flex-col">
        <button
          className="h-12 w-60 bg-m-green rounded-full uppercase font-neuebit-bold text-xl text-white pt-0.5 tracking-wide mt-3.5"
          onClick={() => placeOrder()}
        >
          place Order
        </button>
        <p className="text-sm pt-3 text-center leading-none">
          checkout will require a few transactions
        </p>
      </div>
    </motion.div>
  );
};

export default ShippingForm;
