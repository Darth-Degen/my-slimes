import { useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";

export const useScrollDirection = () => {
  //state
  const [scrollDirection, setScrollDirection] = useState<string>("down");
  //refs
  const { scrollY } = useScroll();
  const prevScrollY = useRef<number>(0);
  //event handler
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrollDirection(latest > prevScrollY.current ? "down" : "up");
    prevScrollY.current = latest;
  });
  return scrollDirection
};
