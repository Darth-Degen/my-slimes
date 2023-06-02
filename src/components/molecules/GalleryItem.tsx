import {
  useScroll,
  useTransform,
  useMotionValueEvent,
  motion,
  useInView,
} from "framer-motion";
import {
  Dispatch,
  SetStateAction,
  FC,
  useContext,
  useRef,
  useState,
} from "react";
import { ViewContext } from "@constants";
import { useWindowSize } from "@hooks";
import { Collection } from "@types";
import Image from "next/image";
import { ImageShimmer } from "@components";

interface GiProps {
  item: Collection;
  parentRef: React.RefObject<HTMLDivElement>;
  index: number;
  isFixed: boolean;
  setIsFixed: Dispatch<SetStateAction<boolean>>;
}

enum DimensionType {
  String,
  Number,
}

const GalleryItem: FC<GiProps> = (props: GiProps) => {
  const { item, parentRef, index, isFixed, setIsFixed } = props;
  const [didLoad, setDidLoad] = useState<boolean>(false);

  const { setGalleryModalId } = useContext(ViewContext);
  const [winWidth, winHeight] = useWindowSize();
  const childRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: parentRef,
  });

  const src = `/images/small-pfp/${item.tag}.webp`;
  const isInView = useInView(parentRef);

  const translateY = useTransform(
    scrollYProgress,
    [0, 0.3],
    [item.topValue, winWidth > 3000 ? 200 : winWidth > 2000 ? 50 : 0]
  );

  useMotionValueEvent(translateY, "change", (latest) => {
    // if (index === 0) console.log("parent item  ", isInView, parentRef);
    // if (index === 0)
    //   console.log("gallery item  ", latest, isInView, parentRef.current);
    if (latest === 0) setIsFixed(true);
    else setIsFixed(false);
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
    return type === DimensionType.String ? "h-[600px]" : 600;
  };

  const hoverWidth = (): number => {
    // console.log("isFixed ", isFixed);
    return isFixed
      ? (height(DimensionType.Number) as number)
      : (width(DimensionType.Number) as number);
  };

  return (
    <motion.div
      onClick={() => setGalleryModalId(index)}
      ref={childRef}
      className={`relative rounded-xl 
        ${width(DimensionType.String)} 
        ${height(DimensionType.String)} 
        ${isFixed ? "cursor-pointer" : ""}
      `}
      style={{ translateY: didLoad ? translateY : 0 }}
      whileHover={{
        width: hoverWidth(),
      }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <Image
        src={src}
        alt={item.name}
        fill
        style={{ objectFit: "cover" }}
        className="rounded-xl"
        // imageClass="rounded-xl"
        onLoadingComplete={() => setDidLoad(true)}
        priority
      />
    </motion.div>
  );
};

export default GalleryItem;
