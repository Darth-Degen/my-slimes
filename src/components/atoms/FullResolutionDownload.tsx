import { FC } from "react";
import Image from "next/image";
import { toast } from "react-hot-toast";

interface Props {
  imageUrl: string | undefined;
}

const FullResolutionDownload: FC<Props> = ({ imageUrl }: Props) => {
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
        {/* <Image
          src="/shared/icons/download.svg"
          alt=""
          width={16}
          height={16}
          priority
        /> */}
        <h3 className="text-sm font-bold text-v2-green">
          Download Full Resolution Image
        </h3>
      </div>
    </a>
  );
};

export default FullResolutionDownload;
