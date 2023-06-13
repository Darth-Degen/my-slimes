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
}

enum DimensionType {
  String,
  Number,
}

const GalleryItem: FC<GiProps> = (props: GiProps) => {
  const {
    item,
    parentRef,
    index,
    isFixed,
    setIsFixed,
    // handleIsInView,
    setDidHover,
    startY,
    scrollDirection,
  } = props;
  const [didLoad, setDidLoad] = useState<boolean>(false);

  const { setGalleryModalId } = useContext(ViewContext);
  const [winWidth, winHeight] = useWindowSize();
  const childRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress, scrollY } = useScroll({
    target: parentRef,
  });

  const src = `/images/small-pfp/${item.tag}.webp`;
  const isInView = useInView(childRef);

  const translateY = useTransform(
    scrollYProgress,
    [0, 0.2],
    [item.topValue, winWidth > 3000 ? 200 : winWidth > 2000 ? 50 : 0]
  );

  // const startY = winHeight * 4;
  // const startYAuto = scrollY.get();
  // console.log("startYAuto ", startYAuto);
  //[3904, ]

  //TODO:uncomment if need to revert
  const [show, setShow] = useState<boolean>(false);
  // const translateY: MotionValue<number> = useTransform(
  //   scrollY,
  //   [startY, startY + winHeight],
  //   [
  //     scrollDirection === "down" && show ? item.topValue * 1.5 : 0,
  //     winWidth > 3000 ? 200 : winWidth > 2000 ? 50 : 0,
  //   ]
  // );

  // useMotionValueEvent(scrollY, "change", (latest) => {
  //   if (index === 0) console.log("scrollY  ", latest, startY);
  // });

  // if (index === 0) console.log("scrollDirection ", scrollDirection);
  useMotionValueEvent(translateY, "change", (latest) => {
    // if (index === 0) console.log("child item  ", Math.abs(latest));
    // if (index === 0)
    //   console.log("gallery item  ", latest, isInView, parentRef.current);

    // if (index === 0) console.log("translateY ", latest);
    if (Math.abs(latest) < 10) setIsFixed(true);
    else setIsFixed(false);
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // if (index === 0) console.log("YProgress  ", latest);

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
    return type === DimensionType.String ? "h-[600px]" : 600;
  };

  const hoverWidth = (): number => {
    // console.log("isFixed ", isFixed);
    return isFixed
      ? (height(DimensionType.Number) as number)
      : (width(DimensionType.Number) as number);
  };

  //tell parent final child is in view
  // useEffect(() => {
  //   if (isInView) handleIsInView(index);
  // }, [isInView, handleIsInView, index]);

  return (
    <motion.div
      onClick={() => setGalleryModalId(index)}
      // onMouseEnter={() => setDidHover(true)}
      // onMouseLeave={() => setDidHover(false)}
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

export default GalleryItem;
