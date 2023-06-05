import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, useInView } from "framer-motion";
import { collections } from "@constants";
import { Gallery, WordFall } from "@components";
interface Props {
  setAssets?: Dispatch<SetStateAction<boolean[]>>;
}
const WhoView: FC<Props> = (props: Props) => {
  const { setAssets } = props;
  const [isGalleryFixed, setIsGalleryFixed] = useState<boolean>(false);
  const [isHeaderFixed, setIsHeaderFixed] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);

  return (
    <div
      className="relative w-full min-h-screen bg-custom-primary py-10 "
      id="who"
      ref={ref}
    >
      <AnimatePresence mode="wait">
        {isGalleryFixed && isInView && (
          <WordFall
            word="MEET THE SLIMES"
            className="text-center font-black px-2 responsive-text"
            // className="text-center font-black px-2 text-[2.5rem] sm:text-6xl md:text-[5rem] lg:text-[7rem] xl:text-[9rem] 2xl:text-[10rem] 3xl:text-[12rem] 4xl:text-[16rem]"
            setIsFixed={setIsHeaderFixed}
            isFixed={isGalleryFixed}
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {isInView && (
          <Gallery
            collections={collections}
            parentRef={ref}
            setIsFixed={setIsGalleryFixed}
            isFixed={isGalleryFixed && isHeaderFixed}
          />
        )}
      </AnimatePresence>

      <div className="pb-[2100px]" />
    </div>
  );
};

export default WhoView;
