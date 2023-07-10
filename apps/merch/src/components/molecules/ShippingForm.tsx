import { motion } from "framer-motion";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { midExitAnimation, countries } from "@merch-constants";
import { TextInput, Dropdown } from "@merch-components";
import { Country, ShippingInfo, ShippingSession } from "@merch-types";
import { updateUserSession } from "@merch-helpers";
import toast from "react-hot-toast";
import axios from "axios";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";

interface Props {
  shipping: ShippingInfo;
  setStep: (value: number) => void;
  setShipping: Dispatch<SetStateAction<ShippingInfo>>;
}

//step 2 = cart, step 3 = shipping info, step 4 = review
const ShippingForm: FC<Props> = (props: Props) => {
  const { setStep, shipping, setShipping } = props;

  const [countryDropdown, setCountryDropdown] = useState<boolean>(false);
  const [stateDropdown, setStateDropdown] = useState<boolean>(false);
  const [validEmail, setValidEmail] = useState<boolean>();

  const countryNames: string[] = countries.map((country) => country.name);

  //handle inputs

  const handleName = (name: string) => {
    setShipping((prevState) => ({ ...prevState, name }));
  };
  const handleEmail = (email: string) => {
    setShipping((prevState) => ({ ...prevState, email }));
  };
  const handleAddress = (address: string) => {
    setShipping((prevState) => ({ ...prevState, address }));
  };
  const handleAddress2 = (address2: string) => {
    setShipping((prevState) => ({ ...prevState, address2 }));
  };
  const handleCountry = (countryName: string) => {
    //find Country based on name
    const country: Country = countries.find(
      (item) => item.name === countryName
    ) ?? { name: "", code: "" };
    setShipping((prevState) => ({ ...prevState, country }));
  };
  const handleState = (state: string) => {
    setShipping((prevState) => ({ ...prevState, state }));
  };
  const handleCity = (city: string) => {
    setShipping((prevState) => ({ ...prevState, city }));
  };
  const handleZip = (zip: string) => {
    setShipping((prevState) => ({ ...prevState, zip }));
  };
  const handleCheckout = async () => {
    //verify all input fields
    if (
      shipping.name.trim().length < 2 ||
      shipping.email.length < 2 ||
      shipping.address.length < 2 ||
      // shipping.address2.length < 2 ||
      shipping.country.code.length < 2 ||
      shipping.city.length < 2 ||
      //TODO: finish zip
      // shipping.state.length < 2 ||
      shipping.zip.length < 2 ||
      !validEmail
    ) {
      toast.error("All fields required");
      return;
    }

    // if (!publicKey) {
    //   setVisible(true)
    //   return
    // }

    // const shipSesh:ShippingSession = {}
    // const response = await updateUserSession(publicKey.toBase58(), bearerToken as string, shipping)

    setStep(4);
  };

  //helpers
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  //validate email
  useEffect(() => {
    if (shipping?.email) setValidEmail(isValidEmail(shipping.email));
  }, [shipping.email]);

  // useEffect(() => {
  //   console.log("validZip ", validZip);
  // }, [validZip]);
  return (
    <motion.div
      className="flex flex-col items-center xl:items-start justify-between gap-3 uppercase font-neuebit-bold text-xl "
      key="shipping"
      {...midExitAnimation}
    >
      <p className="text-m-red">*all fields required</p>
      <TextInput
        placeholder={shipping.name.length > 0 ? shipping.name : "name"}
        handleInput={handleName}
      />
      <TextInput
        placeholder={shipping.email.length > 0 ? shipping.email : "email"}
        handleInput={handleEmail}
        type="email"
        error={validEmail === false}
      />
      <TextInput
        placeholder={shipping.address.length > 0 ? shipping.address : "address"}
        handleInput={handleAddress}
      />
      <TextInput
        placeholder={
          shipping.address2.length > 0 ? shipping.address2 : "address2"
        }
        handleInput={handleAddress2}
      />
      <Dropdown
        handleSelect={handleCountry}
        setShowDropdown={setCountryDropdown}
        showDropdown={countryDropdown}
        label={
          shipping.country.name.length > 0 ? shipping.country.name : `Country`
        }
        items={countryNames}
        className="text-m-mid-gray whitespace-nowrap text-ellipsis"
      />
      {/* TODO: add auto complete */}
      <TextInput
        placeholder={shipping.city.length > 0 ? shipping.city : "city"}
        handleInput={handleCity}
      />
      {/* TODO: states */}
      {/* <Dropdown
        handleSelect={handleState}
        setShowDropdown={setStateDropdown}
        showDropdown={stateDropdown}
        label={shipping.state.length > 0 ? shipping.state : `State`}
        items={countryNames}
        className="text-m-mid-gray whitespace-nowrap text-ellipsis"
      /> */}

      <TextInput
        placeholder={shipping.state.length > 0 ? shipping.state : "State"}
        handleInput={handleState}
      />
      <TextInput
        placeholder={shipping.zip.length > 0 ? shipping.zip : "zip"}
        handleInput={handleZip}
      />
      <button
        className="h-12 w-60 bg-m-green rounded-full uppercase font-neuebit-bold text-xl text-white pt-0.5 tracking-wide mt-3.5"
        onClick={handleCheckout}
      >
        finish checkout
      </button>
    </motion.div>
  );
};

export default ShippingForm;
