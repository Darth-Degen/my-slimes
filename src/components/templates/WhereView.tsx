import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { motion, useInView } from "framer-motion";
import { LinkFire } from "@components";
import {} from "@constants";

interface Props {
  setAssets: Dispatch<SetStateAction<boolean[]>>;
  id: string;
  setCurrentPage: Dispatch<SetStateAction<string>>;
  showLoop: boolean;
}
const WhereView: FC<Props> = (props: Props) => {
  const { setAssets, id, setCurrentPage, showLoop } = props;

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);
  // //auto scroll
  // useEffect(() => {
  //   if (isInView) setCurrentPage(id);
  // }, [id, isInView, setCurrentPage]);

  return (
    <div
      className="relative w-full flex flex-col items-center h-full z-10"
      id="where"
      ref={ref}
    >
      <div className="sticky w-full top-[12%]">
        <LinkFire setAssets={setAssets} showLoop={showLoop} />
      </div>
    </div>
  );
};

export default WhereView;
