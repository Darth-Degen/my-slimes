import {
  useScroll,
  useTransform,
  useMotionValueEvent,
  motion,
  useInView,
  MotionValue,
  Variant,
} from "framer-motion";
import {
  Dispatch,
  SetStateAction,
  FC,
  useContext,
  useRef,
  useState,
  useEffect,
} from "react";
import { ViewContext } from "@constants";
import { useWindowSize } from "@hooks";
import { Collection } from "@types";
import Image from "next/image";

interface GiProps {
  item: Collection;
  parentRef: React.RefObject<HTMLDivElement>;
  index: number;
  isFixed: boolean;
  setIsFixed: Dispatch<SetStateAction<boolean>>;
  // handleIsInView: (index: number) => void;
  setDidHover: Dispatch<SetStateAction<boolean>>;
  startY: number;
  scrollDirection: string;
  animateRefValue: number;
  variant: Variant;
}

enum DimensionType {
  String,
  Number,
}

const GalleryItem: FC<GiProps> = (props: GiProps) => {
  const { item, parentRef, index, isFixed, setIsFixed, variant } = props;
  const [didLoad, setDidLoad] = useState<boolean>(false);

  const { setGalleryModalId } = useContext(ViewContext);
  const [winWidth, winHeight] = useWindowSize();
  const childRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: parentRef,
  });

  const src = `${process.env.cloudflareStorage}/images/wallpapers/image/${item.tag}.png`;

  const translateY = useTransform(
    scrollYProgress,
    [0, 0.2],
    [item.topValue, winWidth > 3000 ? 200 : winWidth > 2000 ? 50 : 0]
  );

  const [show, setShow] = useState<boolean>(false);

  useMotionValueEvent(translateY, "change", (latest) => {
    if (Math.abs(latest) < 10) setIsFixed(true);
    else setIsFixed(false);
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    //used to hide header on scroll down/up
    if (!show && latest < 0.8) setShow(true);
    if (latest > 0.96 || latest < 0.01) setIsFixed(false);
    else setIsFixed(true);
  });

  const width = (type: DimensionType): string | number => {
    if (winWidth > 3000) return "w-[160px]";
    else if (winWidth > 2000) return "w-[130px]";
    return "w-[100px]";
  };

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
    // console.log("isFixed ", isFixed);
    return isFixed
      ? (height(DimensionType.Number) as number)
      : (width(DimensionType.Number) as number);
  };

  return (
    <motion.div
      key={index}
      //@ts-ignore
      variants={variant}
    >
      <motion.div
        onClick={() => setGalleryModalId(item.id)}
        ref={childRef}
        className={`relative rounded-xl 
        ${width(DimensionType.String)} 
        ${height(DimensionType.String)} 
        ${isFixed ? "cursor-pointer" : ""}
      `}
        whileHover={{
          width: hoverWidth(),
        }}
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

export default GalleryItem;
