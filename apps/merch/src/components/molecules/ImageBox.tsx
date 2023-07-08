import { BuyRacksView, ImageShimmer } from "apps/merch/src/components";
import { FC } from "react";
import Image from "next/image";
import { RackStatus, RackStatusName } from "../../types/RackStatus";

interface ImageProps {
  src: string;
  caption: string;
  activeStatus: RackStatus;
  wallet: string;
}
const ImageBox: FC<ImageProps> = (props: ImageProps) => {
  const { src, caption, activeStatus, wallet } = props;

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
          className="relative scale-40 md:scale-90 lg:scale-100"
        />
        {isRaffle ? (
          <>
            <div
              className="absolute top-10 md:top-14 left-3.5 w-[285px] uppercase font-bold text-xs sm:text-[15px] scale-40 md:scale-90 lg:scale-100"
              dangerouslySetInnerHTML={{ __html: caption }}
            />
            <div className="link absolute top-24 left-3.5 w-[285px] uppercase font-bold text-[15px] break-all">
              {/* {activeStatus.name === RackStatusName.Raffle && ( */}
              <a
                href={`https://solana.fm/address/${wallet}?cluster=mainnet-qn1`}
                rel="noreferrer"
                target="_blank"
                className="text-xs sm:text-[15px]"
              >
                {`${wallet.slice(0, 4)}...${wallet.slice(-4)}`}
              </a>
            </div>
          </>
        ) : (
          <div
            className="absolute top-12 left-3.5 w-[285px] uppercase font-bold scale-40 md:scale-90 lg:scale-100"
            dangerouslySetInnerHTML={{ __html: caption }}
          />
        )}
      </div>
    </div>
  );
};

export default ImageBox;
