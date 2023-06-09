import { Dispatch, FC, SetStateAction, useEffect, useRef } from "react";
import { VideoScroll } from "@components";
import {} from "@constants";
import { useInView } from "framer-motion";

interface Props {
  setAssets?: Dispatch<SetStateAction<boolean[]>>;
  id: string;
  setCurrentPage: Dispatch<SetStateAction<string>>;
}
const FriendsView: FC<Props> = (props: Props) => {
  const { setAssets, id, setCurrentPage } = props;

  const parentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(parentRef);
  //auto scroll
  useEffect(() => {
    if (isInView) setCurrentPage(id);
  }, [id, isInView, setCurrentPage]);

  return (
    <div
      className="relative w-full min-h-screen flex flex-col items-center"
      id="friends"
      ref={parentRef}
    >
      <VideoScroll
        src={"/videos/handshake.mp4"}
        parentRef={parentRef}
        paddingBottom={800}
      />
    </div>
  );
};

export default FriendsView;
