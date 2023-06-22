import { FC, useEffect, useState } from "react";
import { Merch } from "@merch-types";
import Image from "next/image";
import { midExitAnimation } from "@merch-constants";
import { motion } from "framer-motion";
import { ImagePicker, Dropdown } from "@merch-components";

import arrows from "../../../images/icons/three-right-arrows.svg";
interface Props {
  item: Merch;
}
const ItemDetail: FC<Props> = (props: Props) => {
  const { item } = props;
  const path = `/images/merch/${item.id}/`;

  const [selected, setSelected] = useState<number>(0);
  const [colorDropdown, setColorDropdown] = useState<boolean>(false);
  const [sizeDropdown, setSizeDropdown] = useState<boolean>(false);
  const [color, setColor] = useState<string>();
  const [size, setSize] = useState<string>();

  const handleColorSelect = (color: string): void => {
    setColor(color);
  };
  const handleSizeSelect = (size: string): void => {
    setSize(size);
  };
  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start justify-start gap-10 h-full w-full px-12 lg:px-20 py-5">
      <ImagePicker
        images={item.images}
        path={path}
        selected={selected}
        setSelected={setSelected}
      />
      {/*  info + selection */}
      <motion.div
        className="flex flex-col gap-3 max-w-[375px] text-m-mid-gray text-xl"
        {...midExitAnimation}
      >
        <h3 className="font-neuebit-bold text-5xl pb-3">{item.name}</h3>
        <div className="bg-[#D9D9D9] w-full py-2 px-7 flex items-center gap-6">
          <Image src={arrows} alt="Arrows" width={154 / 5} height={66 / 5} />
          <p className="uppercase font-neuebit-bold pt-0.5">
            Hurry - only {item.maxSupply} ever made
          </p>
        </div>
        <p className="font-neuebit text-2xl leading-6"> {item.description}</p>
        <div className="flex justify-start w-full uppercase gap-14">
          <p className="font-neuebit-bold">cost - {item.cost}</p>
          <p className="font-neuebit-bold">qty made - {item.maxSupply}</p>
        </div>
        <div className="flex flex-col gap-2">
          <Dropdown
            handleSelect={handleColorSelect}
            setShowDropdown={setColorDropdown}
            showDropdown={colorDropdown}
            label={color ?? "COLOR:"}
            items={item.colors}
          />
          <Dropdown
            handleSelect={handleSizeSelect}
            setShowDropdown={setSizeDropdown}
            showDropdown={sizeDropdown}
            label={size ?? "SIZE:"}
            items={item.sizes}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default ItemDetail;
