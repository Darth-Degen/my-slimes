import { Dispatch, FC, SetStateAction } from "react";
import { SlimesHubFooter, YourSlimes } from "@components";

interface Props {
  setAssets?: Dispatch<SetStateAction<boolean[]>>;
}
const SlimesHubView: FC<Props> = () => {
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center">
      <YourSlimes />
      <SlimesHubFooter />
    </div>
  );
};

export default SlimesHubView;
