import { Dispatch, SetStateAction, FC } from "react";
import { GalleryItem } from "@components";
import { Collection } from "@types";

interface GProps {
  collections: Collection[];
  parentRef: React.RefObject<HTMLDivElement>;
  isFixed: boolean;
  setIsFixed: Dispatch<SetStateAction<boolean>>;
  inView: boolean;
}
const Gallery: FC<GProps> = (props: GProps) => {
  const { collections, parentRef, isFixed, setIsFixed, inView } = props;

  return (
    <div className="sticky top-0 md:top-[8%] lg:top-[14%] flex flex-col w-screen items-center overflow-x-scroll  ">
      <div className="flex overflow-x-scroll gap-3 3xl:gap-5 py-44 4xl:pb-[200px] px-5 min-w-full ml-[2300px] sm:ml-[2100px] md:ml-[1900px] lg:ml-[1600px] xl:ml-[1400px] 2xl:ml-[800px] 3xl:ml-[1100px] 4xl:ml-[600px]">
        {collections.map((slime, index) => (
          <GalleryItem
            item={slime}
            key={slime.name}
            parentRef={parentRef}
            index={index}
            setIsFixed={setIsFixed}
            isFixed={isFixed}
            inView={inView}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
