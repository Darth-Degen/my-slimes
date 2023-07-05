import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { VideoScroll, SFCGallery } from "@components";
import { midExitAnimation } from "@constants";
import { AnimatePresence, motion, useInView } from "framer-motion";

interface Props {
  setAssets?: Dispatch<SetStateAction<boolean[]>>;
  id: string;
  setCurrentPage: Dispatch<SetStateAction<string>>;
}
const FriendsView: FC<Props> = (props: Props) => {
  const { setAssets, id, setCurrentPage } = props;

  const [videoEnded, setVideoEnded] = useState<boolean>(false);

  const parentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(parentRef);
  const videoRef = useRef<HTMLVideoElement>(null);
  // //auto scroll
  // useEffect(() => {
  //   if (isInView) setCurrentPage(id);
  // }, [id, isInView, setCurrentPage]);

  return (
    <div
      className="relative w-full  flex flex-col items-center pb-20"
      id={`friends`}
      ref={parentRef}
    >
      {/* <div className="relative pb-20"> */}

      <div className="sticky top-[8%] lg:top-[4%] min-h-screen">
        <AnimatePresence mode="wait">
          {isInView && !videoEnded && (
            // <VideoScroll
            //   src={`${process.env.NEXT_PUBLIC_CDN_URL}/videos/handshake.mp4`}
            //   parentRef={parentRef}
            //   paddingBottom={700}
            // />
            <motion.video
              key="vids"
              ref={videoRef}
              className={`sticky top-[8%] h-screen w-screen`}
              autoPlay
              playsInline
              muted
              style={{ objectFit: "cover" }}
              onEnded={() => setVideoEnded(true)}
              {...midExitAnimation}
            >
              <source
                src={`${process.env.NEXT_PUBLIC_CDN_URL}/videos/handshake.mp4`}
                type="video/mp4"
              />
            </motion.video>
          )}
          {/* </div> */}
          {/* <div className="relative pb-20"> */}
          {videoEnded && <SFCGallery />}
        </AnimatePresence>
      </div>
      <div className="pb-[600px]" />
      {/* </div> */}
    </div>
  );
};

export default FriendsView;
