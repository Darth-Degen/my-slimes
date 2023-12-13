import { useScroll, motion, Variant } from "framer-motion";
import { FC, useContext, useRef, useState } from "react";
import { ViewContext } from "@constants";
import { useWindowSize } from "@hooks";
import { SFC } from "@types";
import Image from "next/image";

interface GiProps {
  item: SFC;
  parentRef: React.RefObject<HTMLDivElement>;
  index: number;
  scrollDirection: string;
  isFixed?: boolean;
  variant: Variant;
}

enum DimensionType {
  String,
  Number,
}

const SFCGalleryItem: FC<GiProps> = (props: GiProps) => {
  const {
    item,
    parentRef,
    index,
    scrollDirection,
    isFixed = false,
    variant,
  } = props;
  const [didLoad, setDidLoad] = useState<boolean>(false);

  const { setSFCModalId } = useContext(ViewContext);
  const [winWidth, winHeight] = useWindowSize();
  const childRef = useRef<HTMLDivElement>(null);
  const src = `${process.env.cloudflareStorage}/images/sfc/${item.src}`;

  const width = (type: DimensionType): string | number => {
    if (winWidth > 3000) return "w-[280px]";
    else if (winWidth > 2000) return "w-[280px]";
    return "w-[280px]";
  };

  // };
  const height = (type: DimensionType): string | number => {
    if (winHeight < 800 || winWidth < 600)
      return type === DimensionType.String ? "h-[480px]" : 480;
    else if (winWidth > 3000 && winHeight > 1500)
      return type === DimensionType.String ? "h-[1200px]" : 1200;
    else if (winWidth > 2000 && winHeight > 1200)
      return type === DimensionType.String ? "h-[900px]" : 900;
    else if (winHeight > 950)
      return type === DimensionType.String ? "h-[600px]" : 600;
    return type === DimensionType.String ? "h-[500px]" : 500;
  };

  const hoverWidth = (): number => {
    return (
      (height(DimensionType.Number) as number) * (item.width / item.height)
    );
  };

  return (
    <motion.div
      key={index}
      //@ts-ignore
      variants={variant}
    >
      <motion.div
        onClick={() => setSFCModalId(item.id)}
        ref={childRef}
        className={`relative rounded-xl 
        ${width(DimensionType.String)} 
        ${height(DimensionType.String)} 
        ${isFixed ? "" : "cursor-pointer"}
      `}
        whileHover={{
          width: hoverWidth(),
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <Image
          src={src}
          alt={item.name}
          fill
          style={{ objectFit: "cover" }}
          className="rounded-xl"
          onLoadingComplete={() => setDidLoad(true)}
          priority
        />
      </motion.div>
    </motion.div>
  );
};

export default SFCGalleryItem;
