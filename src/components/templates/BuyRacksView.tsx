import {
  Dispatch,
  FC,
  HTMLAttributes,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import { ImageShimmer, NumberInput, ConnectButton } from "@components";
import { tapAnimation } from "@constants";
import Image from "next/image";
import { useWindowSize } from "@hooks";
import {
  WalletMultiButton,
  useWalletModal,
} from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
/*
 * page flow
 * 1. buy now
 * 2. raffle live
 *     - win
 *     - lose
 * 3. end
 */

interface Status {
  name: StatusName;
  text: string;
  endDate: Date;
  src: string;
  caption: string;
  timerCaption: string;
}
enum StatusName {
  Buy,
  Raffle,
  End,
}

const initialStatus: Status[] = [
  {
    name: StatusName.Buy,
    text: "BUY NOW!!!",
    endDate: new Date(2023, 5, 3, 9, 10, 50),
    src: "/images/ait/pika.png",
    caption:
      "RACKS = one raffle ticket for the newest <span class='link'><a href='' rel='noreferrer' target='_blank' >slime</a></span> and the currency used to buy  <span class='link'><a href='' rel='noreferrer' target='_blank'>all in time</a></span> clothes and items. ",
    timerCaption: "time left to buy racks",
  },
  {
    name: StatusName.Raffle,
    text: "RAFFLE LIVE ",
    endDate: new Date("6/5/23"),
    src: "/images/ait/yoda.png",
    caption: "the lucky mfr who won a slime is:",
    timerCaption: "winner chosen in:",
  },
  {
    name: StatusName.End,
    text: "",
    endDate: new Date(),
    src: "",
    caption: "",
    timerCaption: "",
  },
];

interface Props {
  setIsInView: Dispatch<SetStateAction<boolean>>;
}
const BuyRacksView: FC<Props> = (props: Props) => {
  const { setIsInView } = props;
  const [activeStatus, setActiveStatus] = useState<Status>(initialStatus[0]);

  const { connected, publicKey } = useWallet();
  const { setVisible } = useWalletModal();

  const ref = useRef<HTMLDivElement>(null);
  const [winWidth, winHeight] = useWindowSize();
  const { scrollYProgress, scrollY } = useScroll({ target: ref });

  const y = useTransform(scrollYProgress, [0, 0.4, 0.75, 0.9], [0, 0, 0, -100]);

  const isInView = useInView(ref);
  useEffect(() => {
    setIsInView(isInView);
  }, [isInView, setIsInView]);

  // useMotionValueEvent(scrollYProgress, "change", (latest) => {
  //   console.log("scrollYProgress ", latest);
  // });

  const handleDateEnd = () => {
    if (activeStatus.name === StatusName.Buy) {
      setActiveStatus(initialStatus[1]);
    } else if (activeStatus.name === StatusName.Raffle) {
      setActiveStatus(initialStatus[2]);
    }
  };

  const handleMint = () => {
    if (!connected) setVisible(true);
  };

  return (
    <div
      className={`w-full min-h-screen flex flex-col items-center justify-end bg-ait-teal`}
      id="buyracks"
      ref={ref}
    >
      <div className="py-20" />
      <motion.div
        className="sticky flex flex-col gap-4 lg:flex-row justify-center items-center lg:top-[10%] xl:top-[15%] rounded-full h-auto lg:h-[75vh] w-[90%] lg:w-[95%] xl:w-[90%] bg-ait-black"
        style={{
          y: winWidth >= 1024 ? y : 0,
        }}
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
        {activeStatus.name !== StatusName.End && (
          <>
            {/* content */}
            <div className="flex flex-col lg:flex-row justify-between items-center w-full h-full px-[10%]">
              <TextBox text={activeStatus.text} />
              <ImageBox src={activeStatus.src} caption={activeStatus.caption} />
              {activeStatus.name === StatusName.Buy && (
                <BuyRacks handleMint={handleMint} />
              )}
              {activeStatus.name === StatusName.Raffle && (
                <TextBox text={activeStatus.text} />
              )}
            </div>
            <Countdown
              // status={activeStatus}
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
      </motion.div>
      <div className="pt-20 lg:pt-0 lg:pb-[500px]" />
    </div>
  );
};

interface BuyRacksProps extends HTMLAttributes<HTMLDivElement> {
  handleMint: () => void;
}
const BuyRacks: FC<BuyRacksProps> = (props: BuyRacksProps) => {
  const { handleMint } = props;

  const handleInput = (amount: number) => {
    console.log("amount ", amount);
  };

  return (
    <div className="flex flex-col items-center lg:items-start gap-3 font-neuebit-bold">
      <p className="text-ait-teal text-4xl md:text-5xl">QTY:</p>
      <NumberInput supply={100} handleInput={handleInput} />
      <p className="text-ait-teal text-4xl">TOTAL: 11.5 SOL</p>

      <motion.button
        className="my-2 flex pt-1 items-center justify-center rounded-full w-48 h-14 bg-ait-teal text-4xl  transition-all duration-300 hover:bg-ait-black hover:text-v2-dark-green hover:border hover:border-v2-green"
        {...tapAnimation}
        onClick={() => handleMint()}
      >
        BUY RACKS
      </motion.button>
    </div>
  );
};

interface CountdownProps extends HTMLAttributes<HTMLDivElement> {
  futureDate: Date;
  caption: string;
  handleDateEnd: () => void;
}

const Countdown: FC<CountdownProps> = (props: CountdownProps) => {
  const { futureDate, caption, handleDateEnd, className } = props;
  const [didStart, setDidStart] = useState<boolean>(false);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      const timeDifference = futureDate.getTime() - currentTime;

      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds });

      if (timeDifference < 0) {
        clearInterval(interval);
      }
      setDidStart(true);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [futureDate]);

  useEffect(() => {
    if (futureDate < new Date()) {
      handleDateEnd();
    }
  }, [countdown, didStart, futureDate, handleDateEnd]);

  return (
    <div
      className={`flex flex-col justify-center text-ait-teal whitespace-nowrap ${className}`}
    >
      {caption === initialStatus[1].timerCaption && (
        <p className="uppercase pb-1 flex justify-center text-xl">{caption}</p>
      )}
      <div className="flex justify-start items-start gap-0 text-7xl max-w-[290px]">
        <CountdownItem value={countdown.days} />
        {":"}
        <CountdownItem value={countdown.hours} />
        {":"}
        <CountdownItem value={countdown.minutes} />
        {":"}
        <CountdownItem value={countdown.seconds} />
      </div>
      {caption === initialStatus[0].timerCaption && (
        <p className="uppercase pb-1 flex justify-center text-xl">{caption}</p>
      )}
    </div>
  );
};

interface CountdownItemProps {
  value: number;
}

const CountdownItem: React.FC<CountdownItemProps> = (
  props: CountdownItemProps
) => {
  const { value } = props;
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 150 }}
    >
      <div className="">{value > 0 ? value : 0}</div>
    </motion.div>
  );
};

interface TextProps {
  text: string;
}
const TextBox: FC<TextProps> = (props: TextProps) => {
  const { text } = props;
  return (
    <div className="flex flex-col gap-0">
      {[...Array(5)].map((item) => (
        <p
          className="text-ait-teal text-4xl md:text-5xl lg:text-4xl xl:text-6xl font-neuebit-bold"
          key={item}
        >
          {text}
        </p>
      ))}
    </div>
  );
};
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
          src={"/images/ait/speech-box.png"}
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

export default BuyRacksView;
