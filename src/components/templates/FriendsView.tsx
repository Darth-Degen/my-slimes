import {
  Dispatch,
  FC,
  SetStateAction,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import {} from "@components";
import {} from "@constants";

interface Props {
  setAssets?: Dispatch<SetStateAction<boolean[]>>;
}
const FriendsView: FC<Props> = (props: Props) => {
  const { setAssets } = props;

  const videoRef = useRef<HTMLVideoElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
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
    <div
      className="relative w-full min-h-screen flex flex-col items-center"
      id="friends"
      ref={parentRef}
    >
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
      <div className="mb-[1500px]" />
    </div>
  );
};

export default FriendsView;
