import { Dispatch, FC, SetStateAction, useState } from "react";
import { Dropdown } from "@merch-components";
import { Merch } from "@merch-types";
import Image from "next/image";

interface Props {
  item: Merch;
  index: number;
  handleCartClick?: () => void;
  updateCart: Dispatch<SetStateAction<Merch[]>>;
}
const CheckoutCart: FC<Props> = (props: Props) => {
  const { item, index, updateCart } = props;

  const [colorDropdown, setColorDropdown] = useState<boolean>(false);
  const [sizeDropdown, setSizeDropdown] = useState<boolean>(false);

  const handleColorSelect = (color: string): void => {
    updateCart((prevState) => [
      ...prevState.slice(0, index),
      { ...prevState[0], color },
      ...prevState.slice(index + 1),
    ]);
  };
  const handleSizeSelect = (size: string): void => {
    updateCart((prevState) => [
      ...prevState.slice(0, index),
      { ...prevState[0], size },
      ...prevState.slice(index + 1),
    ]);
  };

  return (
    <div className="flex gap-3 font-neuebit-bold border-b divide-y-custom-gray w-full">
      {/* image */}
      <div className="">
        <Image
          src={`/images/merch/${item.id}/image.png`}
          width={90}
          height={90}
          alt="Merch"
        />
      </div>
      {/* info */}
      <div className="flex flex-col gap-0 text-m-mid-gray whitespace-nowrap uppercase w-[150px]">
        <p className="text-xl leading-none">{item.name}</p>
        <p className="text-base text-custom-gray leading-none">
          {item?.size ?? <span className="text-m-red">select size</span>}
        </p>
        <p className="text-base text-custom-gray leading-none">
          {item?.color ?? <span className="text-m-red">select color</span>}
        </p>
      </div>
      {/* dropdowns */}
      <div className="flex flex-col gap-2 pb-3">
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
          className="!w-44 !h-8 bg-m-light-gray !text-base"
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
          className="!w-44 !h-8 bg-m-light-gray !text-base"
        />
        {/* </div> */}
      </div>
    </div>
  );
};

export default CheckoutCart;
