import React, { FC, HTMLAttributes, RefObject, useRef } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";

interface Props extends HTMLAttributes<HTMLVideoElement> {
  parentRef: RefObject<HTMLDivElement>;
  paddingBottom?: number;
}

const VideoScroll: FC<Props> = (props: Props) => {
  const { parentRef, paddingBottom = 1000 } = props;

  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({ target: parentRef });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!videoRef.current) return;
    const videoElement = videoRef.current;
    // Calculate the current progress based on scrollYProgress and the video duration
    const progress = latest * videoElement.duration;
    // Set the current time of the video to match the progress
    videoElement.currentTime = progress;
  });

  return (
    <>
      <div className="sticky top-0 ">
        <video
          ref={videoRef}
          className="h-screen w-screen"
          muted
          style={{ objectFit: "cover" }}
        >
          <source src="/videos/handshake.mp4" type="video/mp4" />
        </video>
      </div>
      <div style={{ paddingBottom: paddingBottom }} />
    </>
  );
};
export default VideoScroll;
