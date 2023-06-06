import { Dispatch, FC, SetStateAction, useRef } from "react";
import { VideoScroll } from "@components";
import {} from "@constants";

interface Props {
  setAssets?: Dispatch<SetStateAction<boolean[]>>;
}
const FriendsView: FC<Props> = (props: Props) => {
  const { setAssets } = props;

  const parentRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative w-full min-h-screen flex flex-col items-center"
      id="friends"
      ref={parentRef}
    >
      <VideoScroll parentRef={parentRef} paddingBottom={1000} />
    </div>
  );
};

export default FriendsView;
