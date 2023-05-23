import { useScroll, motion, useSpring } from "framer-motion";
import { FC } from "react";

interface Props {
  backgroundColor?: string;
}
const ScrollProgress: FC<Props> = (props: Props) => {
  const { backgroundColor = "bg-v2-green" } = props;
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className={`fixed top-0 inset-x-0 z-20 h-2.5 ${backgroundColor}`}
      style={{ scaleX, originX: 0 }}
    ></motion.div>
  );
};

export default ScrollProgress;
