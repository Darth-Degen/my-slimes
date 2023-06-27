import { FC } from "react";
import Image from "next/image";

interface Props {
  imageUrl: string;
}

const FullResolutionDownload: FC<Props> = ({ imageUrl }: Props) => {
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
