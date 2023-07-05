import React, { FC, HTMLAttributes, RefObject, useRef } from "react";
import {
  MotionValue,
  motion,
  useInView,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";

interface Props extends HTMLAttributes<HTMLVideoElement> {
  parentRef: RefObject<HTMLDivElement>;
  paddingBottom?: number;
  src: string;
}

const VideoScroll: FC<Props> = (props: Props) => {
  const { parentRef, paddingBottom = 1000, src, className } = props;

  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({ target: parentRef });
  // const isInView = useInView(videoRef);

  const opacity: MotionValue<number> = useTransform(
    scrollYProgress,
    [0, 0.01, 0.38, 0.45],
    [0, 1, 1, 0]
  );

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // console.log("scrollYProgress ", latest);
    if (!videoRef.current) return;
    const videoElement = videoRef.current;
    // Calculate the current progress based on scrollYProgress and the video duration
    const progress = latest * videoElement.duration;
    // Set the current time of the video to match the progress
    if (!isNaN(progress)) videoElement.currentTime = progress;
  });

  return (
    <>
      <motion.div className="sticky top-0 " style={{ opacity }}>
        <video
          ref={videoRef}
          className={`h-screen w-screen ${className}`}
          muted
          style={{ objectFit: "cover" }}
        >
          <source src={src} type="video/mp4" />
        </video>
      </motion.div>
      {/* needed to scroll while in sticky position */}
      <div style={{ paddingBottom: paddingBottom }} />
    </>
  );
};
export default VideoScroll;
