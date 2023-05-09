import { Dispatch, FC, SetStateAction, useState } from "react";
import { motion } from "framer-motion";
import {} from "@components";
import {} from "@constants";

interface Props {
  setAssets?: Dispatch<SetStateAction<boolean[]>>;
}
const WhoView: FC<Props> = (props: Props) => {
  const { setAssets } = props;

  return (
    <div
      id="who"
      className="relative w-full h-screen flex flex-col items-center bg-custom-primary"
    >
      <p className="responsive-font lg:text-9xl 3xl:text-[12rem] 4xl:text-[16rem] text-v2-pink">
        who
      </p>
    </div>
  );
};

export default WhoView;
