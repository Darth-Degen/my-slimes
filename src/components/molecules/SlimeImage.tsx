import { FC, useEffect, useRef } from "react";
import Image from "next/image";
import { fastExitAnimation } from "@constants";
import { motion } from "framer-motion";

interface Props {
  key: string;
  featuredImage: string | undefined;
  isDark: boolean;
  width?: number;
  height?: number;
  setImageLoading: (loading: boolean) => void;
}

const SlimeImage: FC<Props> = (props: Props) => {
  const {
    key,
    featuredImage,
    isDark,
    width = 500,
    height = 500,
    setImageLoading,
  } = props;

  const isFirstRender = useRef<boolean>(false);

  const animation = {
    initial: { opacity: isFirstRender.current ? 1 : 0 },
    animate: { opacity: 1 },
    exit: { opacity: isFirstRender.current ? 1 : 0 },
    transition: { duration: 0.25, ease: "easeInOut" },
  };

  // useEffect(() => {
  //   console.log("isFirstRender ", isFirstRender.current);
  //   isFirstRender.current = false;
  // }, []);
  return (
    <motion.div
      className="relative flex items-center justify-center w-full lg:h-[500px] lg:w-[500px] lg:mr-6"
      key={key}
      {...animation}
    >
      <Image
        src={
          isDark
            ? `${process.env.cloudflareStorage}/images/wallpapers/image/dark-kai.png`
            : featuredImage ??
              `${process.env.cloudflareStorage}/images/small-pfp/scum.webp`
        }
        width={width}
        height={height}
        alt="featured slime asset"
        className="rounded-xl overflow-hidden"
        onLoadingComplete={() => setImageLoading(false)}
      />
    </motion.div>
  );
};

export default SlimeImage;
