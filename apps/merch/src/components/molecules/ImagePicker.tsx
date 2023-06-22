import { motion } from "framer-motion";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { midExitAnimation } from "@merch-constants";
import { ImageShimmer } from "@merch-components";

interface Props {
  images: string[];
  path?: string;
  selected: number;
  setSelected: Dispatch<SetStateAction<number>>;
}
const ImagePicker: FC<Props> = (props: Props) => {
  const { images, path, selected, setSelected } = props;

  const [src, setSrc] = useState<string>(images[0]);
  //update src on image click
  useEffect(() => {
    setSrc(images[selected]);
  }, [images, selected]);

  return (
    <motion.div className="flex flex-col gap-5" {...midExitAnimation}>
      <div className="overflow-hidden">
        <ImageShimmer
          src={`${path}${src}`}
          alt={"Main"}
          width={450}
          height={450}
          className="transition-all duration-[1250ms] ease-out hover:scale-150 cursor-pointer"
        />
      </div>
      <div className="flex gap-4 h-full">
        {images.length &&
          images.map((image, index) => {
            return (
              <ImageShimmer
                key={index}
                src={`${path}${image}`}
                alt="Gallery"
                width={75}
                height={75}
                className={`cursor-pointer ${
                  selected === index
                    ? "outline outline-m-mid-gray outline-offset-2"
                    : ""
                }`}
                onClick={() => setSelected(index)}
              />
            );
          })}
      </div>
    </motion.div>
  );
};

export default ImagePicker;
