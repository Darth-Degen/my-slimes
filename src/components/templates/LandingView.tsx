import { exitAnimation } from "@constants";
import { motion } from "framer-motion";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { FlowerVector, CrackVector, PaddleVector } from "@components";
interface Props {
  setAssets?: Dispatch<SetStateAction<boolean[]>>;
}
const LandingView: FC<Props> = (props: Props) => {
  const { setAssets } = props;

  return (
    <motion.div
      id="landing"
      key="landing"
      className="relative w-full h-screen flex flex-col items-center justify-end"
      {...exitAnimation}
    >
      {/* graphics */}
      <FlowerVector className="w-[280px] h-[280px] md:w-[380px] md:h-[380px] absolute left-1/2 top-[46%] transform -translate-x-1/2 -translate-y-1/2" />
      <CrackVector className="w-[340px] h-[340px] md:w-[520px] md:h-[520px] absolute left-1/2 top-[46%] transform -translate-x-1/2 -translate-y-1/2" />
      <PaddleVector className="w-[420px] h-[420px] md:w-[560px] md:h-[560px] absolute left-1/2 top-[46%] transform -translate-x-1/2 -translate-y-1/2" />
      {/* shadow */}
      <div className="w-[80px] h-[3px] bg-shadow shadow-circular mb-20 lg:mb-12 rounded-full lg:absolute lg:left-1/2 lg:top-[83%] 3xl:top-[79%] lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2" />
      {/*  footer */}
      <div className="uppercase font-black text-lg pb-4 3xl:pb-20">scroll</div>
      <div className="hidden lg:flex justify-between w-full pb-2 px-4 sm:px-6">
        <div className="w-1/3 uppercase">the whole squad here</div>
        <div className="w-1/3 uppercase flex justify-center">and</div>
        <div className="w-1/3 uppercase flex justify-end">everybody eats</div>
      </div>
    </motion.div>
  );
};

export default LandingView;
