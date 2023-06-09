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
  id: string;
  setCurrentPage: Dispatch<SetStateAction<string>>;
}
const WhoView: FC<Props> = (props: Props) => {
  const { setAssets, id, setCurrentPage } = props;
  //state
  const [isGalleryFixed, setIsGalleryFixed] = useState<boolean>(false);
  const [isHeaderFixed, setIsHeaderFixed] = useState<boolean>(false);
  //refs
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);
  //auto scroll
  useEffect(() => {
    if (isInView) setCurrentPage(id);
  }, [id, isInView, setCurrentPage]);

  useEffect(() => {
    console.log("isGalleryFixed ", isGalleryFixed);
  }, [isGalleryFixed]);
  useEffect(() => {
    console.log("isInView ", isInView);
  }, [isInView]);

  return (
    <div className="relative w-full min-h-screen mt-32" id="who" ref={ref}>
      <div className="h-[300px] sticky top-[8%] lg:top-[0%]">
        <AnimatePresence mode="wait">
          {isGalleryFixed && isInView && (
            <WordFall
              word="MEET THE SLIMES"
              className="text-center font-black px-2 responsive-text"
              setIsFixed={setIsHeaderFixed}
              isFixed={isGalleryFixed}
            />
          )}
        </AnimatePresence>
      </div>
      {/* <div className="py-32 -z-10 bg-red-500" /> */}
      {/* <AnimatePresence mode="wait">
        {isInView && ( */}
      <Gallery
        collections={collections}
        parentRef={ref}
        setIsFixed={setIsGalleryFixed}
        isFixed={isGalleryFixed || isHeaderFixed}
      />
      {/* )}
      </AnimatePresence> */}

      <div className="pb-[700px] 3xl:pb-[900px]" />
    </div>
  );
};

export default WhoView;
