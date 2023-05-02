import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion";
import { FC, HTMLAttributes, useState } from "react";
import Image from "next/image";
import { imageLoadAnimation } from "@constants";

enum ObjectFit {
  "contain",
  "cover",
  "fill",
  "none",
  "scale-down",
}

interface Props extends HTMLAttributes<HTMLDivElement> {
  src: string;
  width?: number; // width & height or fill & objectFit
  height?: number;
  alt: string;
  animation?: {
    initial?: any;
    animate?: any;
    transition?: any;
    exit?: any;
  };
  hover?: boolean;
  fill?: boolean; //fill & objectFit or width & height
  objectFit?: string;
  imageClass?: string;
}

const ImageShimmer: FC<Props> = (props: Props) => {
  const {
    src,
    width,
    height,
    alt,
    animation,
    hover = false,
    fill = false,
    objectFit = "cover",
    imageClass = "",
    className,
    ...componentProps
  } = props;

  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  return (
    <motion.div
      className={`relative rounded overflow-hidden ${className}`}
      initial={animation?.initial}
      animate={animation?.animate}
      transition={animation?.transition}
      exit={animation?.exit}
      onClick={componentProps.onClick}
    >
      <AnimatePresence mode="wait">
        {!imageLoaded && (
          <motion.div
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-custom-dark-gray via-custom-black to-custom-dark-gray rounded opacity-40"
            style={{
              backgroundSize: "200% 100%",
              animation: "shimmer 1.5s ease-in-out infinite",
            }}
            {...imageLoadAnimation(!imageLoaded)}
          />
        )}
      </AnimatePresence>
      <motion.div
        className={`${
          hover
            ? "transition-all duration-300 hover:scale-110 cursor-pointer"
            : ""
        }`}
        // {...imageLoadAnimation(imageLoaded)}
      >
        {fill && (
          <Image
            src={src}
            fill
            //@ts-ignore
            style={{ objectFit: objectFit }}
            alt={alt}
            className={`rounded ${imageClass}`}
            onLoadingComplete={() => setImageLoaded(true)}
          />
        )}
        {width && height && (
          <Image
            src={src}
            width={width}
            height={height}
            alt={alt}
            className={`rounded ${imageClass}`}
            onLoadingComplete={() => setImageLoaded(true)}
          />
        )}
      </motion.div>
    </motion.div>
  );
};
export default ImageShimmer;
