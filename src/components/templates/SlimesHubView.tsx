import { Dispatch, FC, SetStateAction, useState } from "react";
import { motion } from "framer-motion";
import { Button, SlimesHubFooter, YourSlimes } from "@components";
import { enterAnimation } from "@constants";
import Image from "next/image";

interface Props {
  setAssets?: Dispatch<SetStateAction<boolean[]>>;
}
const SlimesHubView: FC<Props> = (props: Props) => {
  const { setAssets } = props;

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center">
      <YourSlimes />
      <SlimesHubFooter />
    </div>
  );
};

export default SlimesHubView;
