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

interface Content {
  title: string;
  src: string;
  textOne: string;
  textTwo: string;
}
const content: Content[] = [
  {
    title: "community",
    src: "community.png",
    textOne:
      "*lock scroll - jump to this block and animate before carousel activates.",
    textTwo:
      "*lock scroll - jump to this block and animate before carousel activates.",
  },
  {
    title: "culture",
    src: "culture.png",
    textOne:
      "*lock scroll - jump to this block and animate before carousel activates.",
    textTwo:
      "*lock scroll - jump to this block and animate before carousel activates.",
  },
  {
    title: "curation",
    src: "curation.png",
    textOne:
      "*lock scroll - jump to this block and animate before carousel activates.",
    textTwo:
      "*lock scroll - jump to this block and animate before carousel activates.",
  },
];

export default WhatView;
