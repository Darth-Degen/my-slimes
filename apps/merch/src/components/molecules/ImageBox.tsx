import { BuyRacksView, ImageShimmer } from "apps/merch/src/components";
import { FC } from "react";
import Image from "next/image";

interface ImageProps {
  src: string;
  caption: string;
}
const ImageBox: FC<ImageProps> = (props: ImageProps) => {
  const { src, caption } = props;

  const isRaffle = src.includes("yoda");

  return (
    <div className="flex h-auto relative mb-14">
      <ImageShimmer
        src={src}
        width={2032 / 4.5}
        height={1355 / 4.5}
        alt="All in Time"
      />
      <div
        className={`absolute  ${
          isRaffle ? "left-14 top-[45%]" : "-left-10 top-1/2"
        }`}
      >
        <Image
          src={`${process.env.NEXT_PUBLIC_CDN_URL}/images/ait/speech-box.png`}
          width={303}
          height={151}
          alt="All in Time"
        />
        {isRaffle ? (
          <>
            <div
              className="absolute top-14 left-3.5 w-[285px] uppercase font-bold text-[15px]"
              dangerouslySetInnerHTML={{ __html: caption }}
            />
            <div className="link absolute top-24 left-3.5 w-[285px] uppercase font-bold text-[15px] break-all">
              {/* TODO: update url and display to winner address */}
              <a
                href="https://solana.fm/address/yxJHJXqmo5vmJUGqizHRJyPezrGsv8Ze7YyQr3sKpf3?cluster=mainnet-qn1"
                rel="noreferrer"
                target="_blank"
              >
                yxJHJXqmo5vmJUGqizHRJyPezrGsv8Ze7YyQr3sKpf3
              </a>
            </div>
          </>
        ) : (
          <div
            className="absolute top-12 left-3.5 w-[285px] uppercase font-bold"
            dangerouslySetInnerHTML={{ __html: caption }}
          />
        )}
      </div>
    </div>
  );
};

export default ImageBox;
