import { Dispatch, FC, SetStateAction, useState } from "react";
import { Dropdown } from "@merch-components";
import { Merch } from "@merch-types";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { fastExitAnimation } from "@merch-constants";

interface Props {
  item: Merch;
  index: number;
  step: number;
  handleCartClick?: () => void;
  updateCart: Dispatch<SetStateAction<Merch[]>>;
}
const CheckoutCart: FC<Props> = (props: Props) => {
  const { item, index, step, updateCart } = props;

  const [colorDropdown, setColorDropdown] = useState<boolean>(false);
  const [sizeDropdown, setSizeDropdown] = useState<boolean>(false);

  const handleColorSelect = (color: string): void => {
    updateCart((prevState) => {
      return [
        ...prevState.slice(0, index),
        { ...prevState[index], color },
        ...prevState.slice(index + 1),
      ];
    });
  };
  const handleSizeSelect = (size: string): void => {
    updateCart((prevState) => {
      return [
        ...prevState.slice(0, index),
        { ...prevState[index], size },
        ...prevState.slice(index + 1),
      ];
    });
  };
  const handleRemove = () => {
    updateCart((prevState) => prevState.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col md:flex-row gap-3 font-neuebit-bold border-b divide-y-custom-gray w-full z-20">
      <div className="flex flex-col sm:flex-row gap-3 ">
        {/* image */}
        <AnimatePresence mode="wait">
          {item?.color === "white" && item?.id === "tee" ? (
            <motion.div className="" key="im1" {...fastExitAnimation}>
              <Image
                src={`${process.env.NEXT_PUBLIC_CDN_URL}/images/merch/${item.id}/image2.png`}
                width={90}
                height={90}
                alt="Merch"
              />
            </motion.div>
          ) : (
            <motion.div className="" key="im2" {...fastExitAnimation}>
              <Image
                src={`${process.env.NEXT_PUBLIC_CDN_URL}/images/merch/${item.id}/image.png`}
                width={90}
                height={90}
                alt="Merch"
              />
            </motion.div>
          )}
        </AnimatePresence>
        {/* info */}
        <div className="flex flex-col gap-0 text-m-mid-gray whitespace-nowrap uppercase w-[150px]">
          <p className="text-xl leading-none">{item.name}</p>
          <p className="text-base text-custom-gray leading-none">
            {item?.color ?? <span className="text-m-red">select color</span>}
          </p>
          <p className="text-base text-custom-gray leading-none">
            {item?.size ?? <span className="text-m-red">select size</span>}
          </p>
        </div>
      </div>
      {/* dropdowns */}
      <div className="flex flex-col gap-2 pb-3 z-0">
        {/* <div
          className={`transition-all ${
            !item?.color ? "outline outline-1 outline-m-red" : ""
          }`}
        > */}
        <Dropdown
          handleSelect={handleColorSelect}
          setShowDropdown={setColorDropdown}
          showDropdown={colorDropdown}
          label={`COLOR: ${item?.color ?? ""}`}
          items={item.colors}
          className="!w-48 !h-8 bg-m-light-gray !text-base"
          disabled={item.colors.length === 1 || step > 2}
          expandUI={true}
        />
        {/* </div>
        <div
          className={`transition-all  ${
            !item?.size ? "outline outline-1 outline-m-red" : ""
          }`}
        > */}
        <Dropdown
          handleSelect={handleSizeSelect}
          setShowDropdown={setSizeDropdown}
          showDropdown={sizeDropdown}
          label={`SIZE: ${item?.size ?? ""}`}
          items={item.sizeChart}
          className="!w-48 !h-8 bg-m-light-gray !text-base"
          disabled={item.sizeChart.length === 1 || step > 2}
          expandUI={true}
        />
        {/* </div> */}
      </div>
      <div className="md:self-center pb-1">
        <p className="text-2xl leading-none uppercase">{item.cost} racks</p>
        <p
          className="whitespace-nowrap text-2xl text-m-red underline uppercase cursor-pointer leading-none"
          onClick={() => handleRemove()}
        >
          remove
        </p>
      </div>
    </div>
  );
};

export default CheckoutCart;
