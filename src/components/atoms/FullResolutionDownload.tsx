import { FC } from "react";
import { toast } from "react-hot-toast";

interface Props {
  imageUrl: string | undefined;
  color: string;
}

const FullResolutionDownload: FC<Props> = ({ imageUrl, color }: Props) => {
  if (!imageUrl) {
    toast.error("Error: No image found");
    return null;
  }
  return (
    <a
      className="mt-[14px] flex flex-row justify-center items-center"
      href={imageUrl}
      rel="noreferrer"
      target="_blank"
    >
      <div className="flex flex-row text-center justif-center items-start gap-1">
        <h3 className="text-sm font-bold" style={{ color: color }}>
          Download Full Resolution Image
        </h3>
      </div>
    </a>
  );
};

export default FullResolutionDownload;
