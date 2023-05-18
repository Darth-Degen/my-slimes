import { Dispatch, FC, SetStateAction, useState } from "react";
import { motion } from "framer-motion";
import {} from "@components";
import {} from "@constants";

interface Props {
  setAssets?: Dispatch<SetStateAction<boolean[]>>;
}
const SlimesView: FC<Props> = (props: Props) => {
  const { setAssets } = props;

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center bg-v2-dark text-custom-primary"></div>
  );
};

export default SlimesView;
