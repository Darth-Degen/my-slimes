import { motion } from "framer-motion";
import { FC, useEffect, useState } from "react";
import { midExitAnimation, countries } from "@merch-constants";
import { TextInput, Dropdown } from "@merch-components";
import { Country, ShippingInfo } from "@merch-types";

interface Props {
  handleCheckout: () => void;
}

//step 2 = cart, step 3 = shipping info, step 4 = review
const ShippingForm: FC<Props> = (props: Props) => {
  const { handleCheckout } = props;

  const [countryDropdown, setCountryDropdown] = useState<boolean>(false);
  const [validEmail, setValidEmail] = useState<boolean>();
  const [shipping, setShipping] = useState<ShippingInfo>({
    name: "",
    email: "",
    address: "",
    address2: "",
    country: { name: "", code: "" },
    city: "",
    state: "",
    zip: "",
  });

  const countryNames: string[] = countries.map((country) => country.name);

  //handle input

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

  //helpers
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // useEffect(() => {
  //   console.log("shipping ", shipping);
  // }, [shipping]);

  //validate email format
  useEffect(() => {
    if (shipping?.email) setValidEmail(isValidEmail(shipping.email));
  }, [shipping.email]);
  useEffect(() => {
    console.log("validEmail ", validEmail);
  }, [validEmail]);
  return (
    <motion.div
      className="flex flex-col gap-3 uppercase font-neuebit-bold text-xl"
      key="shipping"
      {...midExitAnimation}
    >
      <p className="text-m-red">*all fields required</p>
      <TextInput placeholder="name" handleInput={handleName} />
      <TextInput
        placeholder="email"
        handleInput={handleEmail}
        type="email"
        error={validEmail === false}
      />
      <TextInput placeholder="address" handleInput={handleAddress} />
      <TextInput placeholder="address2" handleInput={handleAddress2} />
      <Dropdown
        handleSelect={handleCountry}
        setShowDropdown={setCountryDropdown}
        showDropdown={countryDropdown}
        label={`Country: ${shipping.country.code}`}
        items={countryNames}
        className=""
      />
      <button
        className="h-12 w-60 bg-m-green rounded-full uppercase font-neuebit-bold text-xl text-white pt-0.5 tracking-wide"
        onClick={() => {
          handleCheckout();
        }}
      >
        finish checkout
      </button>
    </motion.div>
  );
};

export default ShippingForm;
