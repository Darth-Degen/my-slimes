import {
  useScroll,
  useTransform,
  useMotionValueEvent,
  motion,
  useInView,
  MotionValue,
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
import { SFC } from "@types";
import Image from "next/image";

interface GiProps {
  item: SFC;
  parentRef: React.RefObject<HTMLDivElement>;
  index: number;
  // handleIsInView: (index: number) => void;
  // setDidHover: Dispatch<SetStateAction<boolean>>;
  // startY: number;
  scrollDirection: string;
  isFixed?: boolean;
  // setIsFixed?: Dispatch<SetStateAction<boolean>>;
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
    // handleIsInView,
    scrollDirection,
    // setDidHover,
    // startY,
    isFixed = false,
    // setIsFixed,
  } = props;
  const [didLoad, setDidLoad] = useState<boolean>(false);

  const { setSFCModalId } = useContext(ViewContext);
  const [winWidth, winHeight] = useWindowSize();
  const childRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress, scrollY } = useScroll({
    target: parentRef,
  });

  const src = `/images/sfc/${item.src}`;
  // const isInView = useInView(childRef);

  const width = (type: DimensionType): string | number => {
    if (winWidth > 3000) return "w-[280px]";
    else if (winWidth > 2000) return "w-[280px]";
    return "w-[280px]";
  };

  const height = (type: DimensionType): string | number => {
    if (winHeight < 800 || winWidth < 600)
      return type === DimensionType.String ? "h-[380px]" : 380;
    else if (winWidth > 3000 && winHeight > 1500)
      return type === DimensionType.String ? "h-[1000px]" : 1000;
    else if (winWidth > 2000 && winHeight > 1200)
      return type === DimensionType.String ? "h-[800px]" : 900;
    return type === DimensionType.String ? "h-[500px]" : 500;
  };

  // const width = (type: DimensionType): string | number => {
  //   if (winWidth > 3000) return "w-[160px]";
  //   else if (winWidth > 2000) return "w-[130px]";
  //   return "w-[200px]";
  // };

  // const height = (type: DimensionType): string | number => {
  //   if (winHeight < 800 || winWidth < 600)
  //     return type === DimensionType.String ? "h-[480px]" : 480;
  //   else if (winWidth > 3000 && winHeight > 1500)
  //     return type === DimensionType.String ? "h-[1200px]" : 1200;
  //   else if (winWidth > 2000 && winHeight > 1200)
  //     return type === DimensionType.String ? "h-[900px]" : 900;
  //   return type === DimensionType.String ? "h-[600px]" : 600;
  // };

  const hoverWidth = (): number => {
    // console.log("hoverWidth ", height(DimensionType.Number) as number);
    return (
      (height(DimensionType.Number) as number) * (item.width / item.height)
    );
    // console.log("isFixed ", isFixed);
    // return isFixed
    //   ? (height(DimensionType.Number) as number)
    //   : (width(DimensionType.Number) as number);
  };

  return (
    <motion.div
      onClick={() => setSFCModalId(item.id)}
      // onMouseEnter={() => setDidHover(true)}
      // onMouseLeave={() => setDidHover(false)}
      ref={childRef}
      className={`relative rounded-xl 
        ${width(DimensionType.String)} 
        ${height(DimensionType.String)} 
        ${isFixed ? "" : "cursor-pointer"}
      `}
      // style={{ translateY: didLoad ? translateY : 0 }}
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
        // imageClass="rounded-xl"
        onLoadingComplete={() => setDidLoad(true)}
        priority
      />
    </motion.div>
  );
};

export default SFCGalleryItem;
