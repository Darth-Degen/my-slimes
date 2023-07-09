import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Merch, Quantity, ShippingSession } from "@merch-types";
import Image from "next/image";
import { midExitAnimation } from "@merch-constants";
import { motion } from "framer-motion";
import { ImagePicker, Dropdown } from "@merch-components";
import { verifyItemInStock } from "@merch-helpers";
import toast from "react-hot-toast";

import arrows from "../../../images/icons/three-right-arrows.svg";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
interface Props {
  item: Merch;
  quantities: Quantity[];
  addToCart: (item: Merch) => void;
  setStep: (value: number) => void;
  atMerchItemCapacity: (id: string) => boolean;
  shippingSession: ShippingSession | undefined;
  setShowWarningModal: Dispatch<SetStateAction<boolean>>;
}
const ItemDetail: FC<Props> = (props: Props) => {
  const {
    item,
    quantities,
    addToCart,
    setStep,
    atMerchItemCapacity,
    shippingSession,
    setShowWarningModal,
  } = props;
  const path = `${process.env.NEXT_PUBLIC_CDN_URL}/images/merch/${item.id}/`;

  const [selected, setSelected] = useState<number>(0);
  const [colorDropdown, setColorDropdown] = useState<boolean>(false);
  const [sizeDropdown, setSizeDropdown] = useState<boolean>(false);
  const [color, setColor] = useState<string>();
  const [size, setSize] = useState<string>();
  const [failedColor, setFailedColor] = useState<boolean>(false);
  const [failedSize, setFailedSize] = useState<boolean>(false);
  const [cartItem, setCartItem] = useState<Merch>(item);
  const [isInStock, setIsInStock] = useState<boolean>(false);

  //solana wallet
  const { connected, publicKey } = useWallet();
  const { setVisible } = useWalletModal();

  //handle drop downs
  const handleColorSelect = (color: string): void => {
    setColor(color);
  };
  const handleSizeSelect = (size: string): void => {
    setSize(size);
  };

  //handle form error
  const verifySelections = (): boolean => {
    if (cartItem?.size) {
      setFailedSize(false);
    } else {
      setFailedSize(true);
    }
    if (cartItem?.color) {
      setFailedColor(false);
    } else {
      setFailedColor(true);
    }

    if (cartItem?.size && cartItem?.color) return true;
    else return false;
  };

  //actions
  const handleAddToCart = (): void => {
    if (verifySelections()) addToCart(cartItem);
  };
  const handleBuyNow = (): void => {
    if (!publicKey || !connected) {
      setVisible(true);
      return;
    }

    if (verifySelections()) {
      if (atMerchItemCapacity(item.id)) {
        toast.error("Only two of each item");
        return;
      }
      if (shippingSession && shippingSession?.stage_completed === "2") {
        setShowWarningModal(true);
        return;
      }

      setStep(3);
      addToCart(cartItem);
    }
  };

  //update selection on size/color change
  useEffect(() => {
    if (size) setCartItem((prevState) => ({ ...prevState, size }));
  }, [size]);
  useEffect(() => {
    if (color) setCartItem((prevState) => ({ ...prevState, color }));
  }, [color]);

  //set color if only one
  useEffect(() => {
    if (item.colors.length === 1) setColor(item.colors[0]);
  }, [item.colors]);

  //set size if only one
  useEffect(() => {
    if (item.sizeChart.length === 1) setSize(item.sizeChart[0]);
  }, [item.sizeChart]);

  //resets error indication
  useEffect(() => {
    if (cartItem?.size) setFailedSize(false);
  }, [cartItem?.size]);
  useEffect(() => {
    if (cartItem?.color) setFailedColor(false);
  }, [cartItem?.color]);

  //check items in stock
  useEffect(() => {
    // console.log(
    //   "*** ",
    //   cartItem?.size,
    //   ",",
    //   cartItem?.color,
    //   verifyItemInStock(item, quantities, cartItem?.size, cartItem?.color)
    // );
    if (item)
      setIsInStock(
        verifyItemInStock(item, quantities, cartItem?.size, cartItem?.color)
      );
  }, [cartItem?.color, cartItem?.size, color, item, quantities]);

  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start justify-start gap-12 xl:gap-16 h-full w-full px-12 py-5">
      <ImagePicker
        images={item.images}
        path={path}
        selected={selected}
        setSelected={setSelected}
      />
      {/*  info + selection */}
      <motion.div
        className="flex flex-col items-center lg:items-start gap-3 max-w-[375px] text-m-mid-gray text-xl -translate-y-2"
        {...midExitAnimation}
      >
        <h3 className="font-neuebit-bold text-5xl pb-3 uppercase">
          {item.name}
        </h3>
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
        <div className="flex flex-col gap-2 pb-3">
          <div
            className={`transition-all ${
              failedColor ? "outline outline-2 outline-m-red" : ""
            }`}
          >
            <Dropdown
              handleSelect={handleColorSelect}
              setShowDropdown={setColorDropdown}
              showDropdown={colorDropdown}
              label={color ?? "COLOR:"}
              items={item.colors}
              expandUI={true}
            />
          </div>
          <div
            className={`transition-all  ${
              failedSize ? "outline outline-2 outline-m-red" : ""
            }`}
          >
            <Dropdown
              handleSelect={handleSizeSelect}
              setShowDropdown={setSizeDropdown}
              showDropdown={sizeDropdown}
              label={size ?? "SIZE:"}
              items={item.sizeChart}
              expandUI={true}
            />
          </div>
        </div>
        {isInStock ? (
          <div className="w-[300px] h-12 bg-[#D9D9D9] border border-m-mid-gray rounded-full font-neuebit-bold text-xl">
            <button
              className="w-[57%] h-full bg-m-green rounded-full text-white uppercase"
              onClick={handleBuyNow}
            >
              buy for: {item.cost} racks
            </button>
            <button
              className="w-[43%] h-full text-m-mid-gray uppercase"
              onClick={handleAddToCart}
            >
              add to cart
            </button>
          </div>
        ) : (
          <button className="w-44 h-12 text-white rounded-full font-neuebit-bold text-xl bg-red-500 opacity-70 uppercase tracking-wider cursor-not-allowed">
            sold out
          </button>
        )}
      </motion.div>
    </div>
  );
};

export default ItemDetail;
