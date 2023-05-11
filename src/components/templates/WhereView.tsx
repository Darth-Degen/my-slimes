import { Dispatch, FC, SetStateAction, useState } from "react";
import { motion } from "framer-motion";
import {} from "@components";
import {} from "@constants";

interface Props {
  setAssets?: Dispatch<SetStateAction<boolean[]>>;
}
const WhereView: FC<Props> = (props: Props) => {
  const { setAssets } = props;

  return (
    <div
      className="relative w-full h-screen flex flex-col items-center"
      id="where"
    >
      <p className="sticky top-[6%] xl:top-[10%] responsive-font lg:text-9xl 3xl:text-[12rem] 4xl:text-[16rem] text-v2-pink">
        where
      </p>
    </div>
  );
};

export default WhereView;
