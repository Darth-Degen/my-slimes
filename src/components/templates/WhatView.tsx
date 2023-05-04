import { Dispatch, FC, SetStateAction, useState } from "react";
import { motion } from "framer-motion";
import {} from "@components";
import {} from "@constants";

interface Props {
  setAssets?: Dispatch<SetStateAction<boolean[]>>;
}
const WhatView: FC<Props> = (props: Props) => {
  const { setAssets } = props;

  return (
    <div
      id="what"
      className="relative w-full h-screen flex flex-col items-center"
    >
      <p className="responsive-font lg:text-9xl 3xl:text-[12rem] 4xl:text-[16rem] text-v2-pink">
        what
      </p>
    </div>
  );
};

export default WhatView;
