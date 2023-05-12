import {
  Dispatch,
  FC,
  MutableRefObject,
  Ref,
  SetStateAction,
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  MotionValue,
  motion,
  useInView,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import {} from "@components";
import { ViewContext, collections } from "@constants";
import { Collection } from "@types";
import Image from "next/image";
import { useWindowSize } from "src/hooks";
interface Props {
  setAssets?: Dispatch<SetStateAction<boolean[]>>;
}
const WhoView: FC<Props> = (props: Props) => {
  const { setAssets } = props;
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative w-full min-h-screen bg-custom-primary py-10 lg:p-20 "
      id="who"
      ref={ref}
    >
      <div className="flex flex-col gap-20 items-center">
        <h3
          className="z-10 sticky top-[8%] md:top-[5%] text-center text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 3xl:text-[12rem] 4xl:text-[16rem] 
        font-black px-2 w-full"
        >
          MEET THE SLIMES
        </h3>
        <Gallery collections={collections} parentRef={ref} />
        <div className="pb-[1500px]" />
      </div>
    </div>
  );
};

interface GProps {
  collections: Collection[];
  parentRef: React.RefObject<HTMLDivElement>;
}
const Gallery: FC<GProps> = (props: GProps) => {
  const { collections, parentRef } = props;
  return (
    <div className="sticky top-[14%]">
      <div className="flex overflow-x-auto gap-3 3xl:gap-5 py-32 4xl:pb-[200px] bg-custom-primary px-5 min-w-full">
        {collections.map((slime, index) => (
          <GalleryItem
            item={slime}
            key={slime.name}
            parentRef={parentRef}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

interface GiProps {
  item: Collection;
  parentRef: React.RefObject<HTMLDivElement>;
  index: number;
}

/*
 * ------- 1. get image to expand full width
 * ------- 2. get other images move out of way
 * 3. show first image at start of page
 * 4. allow side scroll
 *
 *
 * */

enum DimensionType {
  "String",
  "Number",
}

const GalleryItem: FC<GiProps> = (props: GiProps) => {
  const { item, parentRef, index } = props;

  const { setGalleryModalId } = useContext(ViewContext);
  const [winWidth, winHeight] = useWindowSize();
  const { scrollYProgress, scrollY } = useScroll({
    target: parentRef,
  });
  const childRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(childRef);
  const src = `/images/wallpapers/pfp-crop/${item.tag}.png`;

  const max = Math.random() * (120 - 80) + 80; //120;
  const min = Math.random() * (-80 - -120) + -120; //-120;
  const starting = Math.random() * (max - min) + min;

  const [isFixed, setIsFixed] = useState<boolean>(false);
  const topPosition = useTransform(
    scrollYProgress,
    [0, 0.5],
    [starting, winWidth > 3000 ? 200 : winWidth > 2000 ? 50 : 0]
  );

  useMotionValueEvent(topPosition, "change", (latest) => {
    if (latest === 0) setIsFixed(true);
  });

  // useEffect(() => {
  //   console.log("isInView ", isInView);
  // }, [isInView]);

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
      className={`relative rounded-xl cursor-pointer
        ${width(DimensionType.String)} 
        ${height(DimensionType.String)} 
      `}
      style={{ top: topPosition }}
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
      />
    </motion.div>
  );
};

export default WhoView;
