import Image from "next/image";
import { exitAnimation } from "@constants";
import { motion } from "framer-motion";
import { Dispatch, FC, SetStateAction, useState } from "react";
//assets
import bg from "public/images/slimes-gang.png";
interface Props {
  setAssets?: Dispatch<SetStateAction<boolean[]>>;
}
const LandingPage: FC<Props> = (props: Props) => {
  const { setAssets } = props;

  return (
    <motion.div
      key="landing-page"
      className="w-full h-full flex flex-col items-center justify-center"
      {...exitAnimation}
    >
      <Image
        src={bg.src}
        height={766}
        width={2371}
        alt="My Slimes Banner"
        priority
        onLoadingComplete={() =>
          setAssets && setAssets((prevState) => [(prevState[0] = true)])
        }
      />
      <Image
        src={bg.src}
        height={766}
        width={2371}
        alt="My Slimes Banner"
        priority
        onLoadingComplete={() =>
          setAssets && setAssets((prevState) => [(prevState[0] = true)])
        }
      />
    </motion.div>
  );
};

export default LandingPage;
