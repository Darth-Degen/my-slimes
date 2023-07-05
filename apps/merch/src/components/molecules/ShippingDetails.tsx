import { motion } from "framer-motion";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { midExitAnimation, countries } from "@merch-constants";
import { TextInput, Dropdown } from "@merch-components";
import { Country, ShippingInfo } from "@merch-types";
import toast from "react-hot-toast";

interface Props {
  shipping: ShippingInfo;
  setStep: (value: number) => void;
}

//step 2 = cart, step 3 = shipping info, step 4 = review
const ShippingForm: FC<Props> = (props: Props) => {
  const { setStep, shipping } = props;

  return (
    <motion.div
      className="relative flex flex-col items-center xl:items-start justify-between uppercase font-neuebit-bold text-xl text-m-mid-gray tracking-wide leading-tight"
      key="shipping"
      {...midExitAnimation}
    >
      <h3 className="text-4xl lg:absolute lg:-top-[51px] -left-0.5 whitespace-nowrap">
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
          onClick={() => setStep(5)}
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
