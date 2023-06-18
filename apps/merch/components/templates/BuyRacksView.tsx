import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { useInView } from "framer-motion";
import { ImageBox, BuyRacksForm, TextBox, Countdown } from "@merch-components";
import { rackStatus } from "@merch-constants";
import { RackStatus, RackStatusName } from "@merch-types";
import {
  WalletMultiButton,
  useWalletModal,
} from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";

//SEARCH FOR "TODO: needed for merch module reuse" in my-slimes TO REUSE

/*
 * page flow
 * 1. buy now
 * 2. raffle live
 *     - win
 *     - lose
 * 3. end
 */

interface Props {
  setIsInView: Dispatch<SetStateAction<boolean>>;
  id: string;
  setCurrentPage: Dispatch<SetStateAction<string>>;
}
const BuyRacksView: FC<Props> = (props: Props) => {
  const { setIsInView, id, setCurrentPage } = props;
  const [activeStatus, setActiveStatus] = useState<RackStatus>(rackStatus[0]);

  const { connected, publicKey } = useWallet();
  const { setVisible } = useWalletModal();

  const ref = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLHeadingElement>(null);

  //auto scroll
  const isInView = useInView(innerRef);
  useEffect(() => {
    if (isInView) setCurrentPage(id);
  }, [id, isInView, setCurrentPage]);
  useEffect(() => {
    setIsInView(isInView);
  }, [isInView, setIsInView]);

  const handleDateEnd = () => {
    if (activeStatus.name === RackStatusName.Buy) {
      setActiveStatus(rackStatus[1]);
    } else if (activeStatus.name === RackStatusName.Raffle) {
      setActiveStatus(rackStatus[2]);
    }
  };

  const handleMint = () => {
    if (!connected) setVisible(true);
  };

  return (
    <div
      className={`w-full min-h-screen flex flex-col items-center justify-center bg-ait-teal`}
      id={id}
      ref={ref}
    >
      <div className="py-20" />
      <div
        className="sticky flex flex-col gap-4 lg:flex-row justify-center items-center lg:top-[10%] xl:top-[15%] rounded-full h-auto lg:h-[75vh] w-[90%] lg:w-[95%] xl:w-[90%] bg-ait-black"
        ref={innerRef}
      >
        <div className="absolute -top-16 lg:-top-20 right-10 lg:right-10">
          <WalletMultiButton
            startIcon={undefined}
            className="  !text-ait-black !flex !justify-center !px-0 !h-14 !w-[150px] md:!w-[170px] !text-2xl !rounded-full !font-neuebit-bold !bg-[#E8E8E8]"
          >
            {publicKey
              ? publicKey.toBase58().slice(0, 4) +
                ".." +
                publicKey.toBase58().slice(-4)
              : "Connect"}
          </WalletMultiButton>
        </div>
        {/* header */}
        <h2
          className="z-10 text-ait-teal text-center pt-20 lg:pt-0 lg:text-transparent lg:bg-clip-text lg:bg-ait-gradient font-primary leading-none
    text-[70px] sm:text-[80px] lg:text-[100px] xl:text-[150px] lg:absolute lg:-top-[63px] xl:-top-[95px] "
        >
          all in time
        </h2>
        {activeStatus.name !== RackStatusName.End && (
          <>
            {/* content */}
            <div className="flex flex-col lg:flex-row justify-between items-center w-full h-full px-[10%]">
              <TextBox text={activeStatus.text} className="hidden lg:flex" />
              <ImageBox src={activeStatus.src} caption={activeStatus.caption} />
              {activeStatus.name === RackStatusName.Buy && (
                <BuyRacksForm handleMint={handleMint} />
              )}
              {activeStatus.name === RackStatusName.Raffle && (
                <TextBox text={activeStatus.text} />
              )}
            </div>
            <Countdown
              futureDate={activeStatus.endDate}
              caption={activeStatus.timerCaption}
              className="pb-10 lg:pb-0 lg:absolute bottom-0"
              handleDateEnd={handleDateEnd}
            />
            {/* TODO: this will take you to the market place so you can see what each item is worth in racks */}
            <a
              href=""
              rel="noreferrer"
              target="_blank"
              className="link uppercase absolute -bottom-10 font-bold"
            >
              see ticket value
            </a>
          </>
        )}
      </div>
      <div className="pt-20 lg:pt-0 lg:pb-[500px]" />
    </div>
  );
};

export default BuyRacksView;
