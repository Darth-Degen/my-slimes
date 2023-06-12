import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { motion, useInView } from "framer-motion";
import {} from "@components";
import {} from "@constants";

interface Props {
  setAssets?: Dispatch<SetStateAction<boolean[]>>;
  id: string;
  setCurrentPage: Dispatch<SetStateAction<string>>;
}
const WhereView: FC<Props> = (props: Props) => {
  const { setAssets, id, setCurrentPage } = props;

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);
  //auto scroll
  useEffect(() => {
    if (isInView) setCurrentPage(id);
  }, [id, isInView, setCurrentPage]);

  return (
    <div
      className="relative w-full h-screen flex flex-col items-center"
      id="where"
      ref={ref}
    >
      <p className="sticky top-[6%] xl:top-[10%] responsive-font lg:text-9xl 3xl:text-[12rem] 4xl:text-[16rem] text-v2-pink">
        where
      </p>
    </div>
  );
};

export default WhereView;
