import {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  WalletMultiButton,
  useWalletModal,
} from "@solana/wallet-adapter-react-ui";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { AnimatePresence, motion, useInView } from "framer-motion";
//local
import {
  ImageBox,
  BuyRacksForm,
  TextBox,
  Countdown,
  MerchModule,
} from "@merch-components";
import {
  calculateItemQuantity,
  getAllProducts,
  getBearerToken,
} from "@merch-helpers";
import { merch, rackStatus, StoreContext } from "@merch-constants";
import {
  Merch,
  Quantity,
  RackStatus,
  RackStatusName,
  ResponseType,
} from "@merch-types";
import { EditionSaleContract } from "src/lib/exchange-art/types/contract.interfaces";
import { EditionsContractService } from "src/lib/exchange-art";
import { EDITIONS_PROGRAM_ID } from "src/lib/exchange-art/utils";
// import { COLLECTION_API_URL } from "src/constants";
import editionsContractIdl from "src/lib/exchange-art/idl/editions_program_solana.json";
// import toast from "react-hot-toast";
// import * as slimesPayment from "src/lib/slimes-payment";
// import { Metaplex, Nft } from "@metaplex-foundation/js";
// import { PublicKey } from "@solana/web3.js";
import Image from "next/image";
import splashIcon from "../../../images/raffle_splash.png";
import { connected } from "process";

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
  id: string;
  setIsInView: Dispatch<SetStateAction<boolean>>;
  setCurrentPage: Dispatch<SetStateAction<string>>;
}
const BuyRacksContent: FC<Props> = (props: Props) => {
  const { setIsInView, id, setCurrentPage } = props;
  const [activeStatus, setActiveStatus] = useState<RackStatus>(rackStatus[0]);
  const [editionSaleData, setEditionSaleData] = useState<EditionSaleContract>();
  const [storeOpenView, setStoreOpenView] = useState<boolean>(true);
  const [quantities, setQuantities] = useState<Quantity[]>([]);
  const [bearerToken, setBearerToken] = useState<
    string | unknown | undefined
  >();

  const { connection } = useConnection();

  //wallet
  const wallet = useWallet();
  const { connected, publicKey } = wallet;
  const { setVisible } = useWalletModal();

  //refs
  const ref = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLHeadingElement>(null);

  //store module
  const { setShowStore, showStore } = useContext(StoreContext);

  // Setup Exchange Art program
  const editionContract = new EditionsContractService(
    wallet,
    connection,
    //@ts-ignore
    editionsContractIdl,
    EDITIONS_PROGRAM_ID
  );

  const winnerWallet = "62fFigHfUyhToRZuRGwcn9f87SqPt2ztU8zWUWPugMga";

  //fetch bearer token
  const handleAuthToken = useCallback(async () => {
    const response = await getBearerToken();
    if (response && response.type === ResponseType.Success) {
      setBearerToken(response.data);
    }
  }, []);

  useEffect(() => {
    handleAuthToken();
  }, [handleAuthToken]);
  //fetch merch quantities
  const getQuantities = useCallback(async (): Promise<void> => {
    if (typeof bearerToken !== "string") return;
    //TODO: check qtys right before final order
    const response = await getAllProducts(bearerToken as string);

    let _quantities: Quantity[] = [];
    // if (false) {
    if (response && response.type === ResponseType.Success) {
      //@ts-ignore
      response.data.forEach((item) => {
        _quantities.push({
          productid: item.productid,
          name: item.name,
          cost: item.cost,
          sizes: item.sizes,
        });
      });
    } else {
      merch.forEach((item: Merch) => {
        _quantities.push({
          productid: item.id,
          name: item.name,
          cost: item.cost,
          sizes: item.sizes,
        });
      });
    }
    // console.log("_quantities ", _quantities);
    setQuantities(_quantities);
    // });
  }, [bearerToken, showStore]);

  useEffect(() => {
    getQuantities();
  }, [getQuantities]);

  // useEffect(() => {
  //   (async function () {
  //     try {
  //       const editionInfo = await fetch(COLLECTION_API_URL).then((data) =>
  //         data.json()
  //       );
  //       // console.log('editionInfo: ', editionInfo);

  //       if (
  //         editionInfo?.contractGroups.length &&
  //         editionInfo?.contractGroups[0].availableContracts.editionSales.length
  //       ) {
  //         setEditionSaleData(
  //           editionInfo?.contractGroups[0].availableContracts.editionSales[0]
  //         );
  //       } else {
  //         // TODO error toast
  //         toast.error("Error fetching edition sale data. Data is wrong");
  //         console.error("Error fetching edition sale data. Data is wrong");
  //       }
  //     } catch (e) {
  //       // TODO error toast
  //       toast.error("Error fetching edition sale data");
  //       console.error("Error fetching edition sale data.: ", e);
  //     }
  //   })();
  // }, []);

  //auto scroll
  const isInView = useInView(innerRef);
  useEffect(() => {
    if (isInView) setCurrentPage(id);
  }, [id, isInView, setCurrentPage]);
  useEffect(() => {
    // console.log("isInView ", isInView);
    setIsInView(isInView);
  }, [isInView, setIsInView]);

  const handleDateEnd = () => {
    if (activeStatus.name === RackStatusName.Buy) {
      setActiveStatus(rackStatus[1]);
    } else if (activeStatus.name === RackStatusName.Raffle) {
      setActiveStatus(rackStatus[2]);
    }
  };

  const handleMint = async (amountToMint: number) => {
    if (!connected) {
      setVisible(true);
      return;
    }
    // if (!editionSaleData) {
    //   // TODO error toast
    //   toast.error("Cannot get edition sale data.");
    //   console.error("Cannot get edition sale data.");
    //   return;
    // }
    // editionContract.buyMultipleEditions(editionSaleData, amountToMint);
    // const metaplex = new Metaplex(connection);

    // mainnet edition - 9D9UBwZ5L6Mr5JJJ8Y5cTvJJ6vGW4zCjDbPGmd6XTy7f
    // https://exchange.art/editions/9D9UBwZ5L6Mr5JJJ8Y5cTvJJ6vGW4zCjDbPGmd6XTy7f
    // devnet edition - D93LTqjTm8nww5dPnzAuPnWUrKw8d89fViwZvTPuWF35
    // https://ssr.staging.exchange.art/editions/D93LTqjTm8nww5dPnzAuPnWUrKw8d89fViwZvTPuWF35

    // const nftToBurn = await metaplex.nfts().findByMint({
    //   mintAddress: new PublicKey(
    //     "7CV3uRPstbVu31irQiZb5FymkEc9DCUd18zCg53zifSQ"
    //   ),
    // });
    // const nftToBurn2 = await metaplex.nfts().findByMint({
    //   mintAddress: new PublicKey(
    //     "EsWCqKmgaY2aYVdtEWsz8juNSXqyTVwV5KBuZfdfULLk"
    //   ),
    // });
    // const txsSignatures = await slimesPayment.pay(
    //   connection,
    //   wallet,
    //   [nftToBurn, nftToBurn2],
    //   0.05,
    //   1
    // );

    // console.log('txsSignatures: ', txsSignatures);
  };

  return (
    <div
      className={`relative w-full min-h-screen flex flex-col items-center justify-center bg-ait-teal`}
      id={id}
      ref={ref}
    >
      <div className="py-20" />
      <div className="sticky lg:top-[10%] xl:top-[15%] justify-center flex flex-col gap-0 w-full items-center">
        {/* <div className="absolute z-[50] -top-20 lg:-top-10 left-1/2 lg:left-auto lg:right-0 -translate-x-1/2">
          <WalletMultiButton
            startIcon={undefined}
            className="!text-ait-black !flex !justify-center !px-0 !h-14 !w-[150px] lg:!w-[170px] !text-2xl !rounded-full !font-neuebit-bold !bg-[#E8E8E8]"
          >
            {publicKey
              ? publicKey.toBase58().slice(0, 4) +
                ".." +
                publicKey.toBase58().slice(-4)
              : "Connect"}
          </WalletMultiButton>
        </div> */}
        <div
          className="flex flex-col gap-4 lg:flex-row justify-center items-center rounded-[1.75rem] lg:rounded-full h-auto lg:h-[75vh] w-[98%] md:w-[90%] lg:w-[95%] xl:w-[90%] bg-ait-black overflow-hidden"
          ref={innerRef}
        >
          {/* <div className="absolute -top-20 lg:-top-20 left-1/2 transform -translate-x-1/2 lg:left-auto lg:right-10"> */}
          {/* <WalletMultiButton
              startIcon={undefined}
              className="  !text-ait-black !flex !justify-center !px-0 !h-14 !w-[150px] md:!w-[170px] !text-2xl !rounded-full !font-neuebit-bold !bg-[#E8E8E8]"
            >
              {publicKey
                ? publicKey.toBase58().slice(0, 4) +
                  ".." +
                  publicKey.toBase58().slice(-4)
                : "Connect"}
            </WalletMultiButton> */}
          {/* </div> */}
          {/* header */}
          <h2
            className="z-10 text-ait-teal text-center pt-10 lg:pt-0 lg:text-transparent lg:bg-clip-text lg:bg-ait-gradient font-primary leading-none
            text-[70px] sm:text-[80px] lg:text-[100px] xl:text-[150px] lg:absolute lg:-top-[63px] xl:-top-[95px] "
          >
            all in time
          </h2>
          <AnimatePresence mode="wait">
            {!storeOpenView ? (
              // TODO: set up framer motion slide in animations for outgoing & incoming
              <motion.div className="relative w-full h-full">
                {/* content */}
                <div className="flex flex-col lg:flex-row justify-between items-center w-full h-full px-[10%] overflow-hidden">
                  {activeStatus.name === RackStatusName.Raffle && (
                    <div className="w-[250px]">
                      {!publicKey ? (
                        ""
                      ) : publicKey?.toBase58() === winnerWallet ? (
                        <p className="text-ait-teal text-4xl md:text-5xl lg:text-4xl xl:text-7xl 2xl:text-8xl font-neuebit-bold text-center">
                          YOU WON!
                        </p>
                      ) : (
                        <p className="text-ait-teal text-4xl md:text-5xl lg:text-4xl xl:text-7xl 2xl:text-8xl font-neuebit-bold text-center">
                          YOU LOST
                        </p>
                      )}
                    </div>
                  )}
                  <ImageBox
                    src={activeStatus.src}
                    caption={activeStatus.caption}
                    activeStatus={activeStatus}
                    wallet={winnerWallet}
                  />
                  {activeStatus.name === RackStatusName.Buy && (
                    <BuyRacksForm
                      handleMint={(amountToMint: number) =>
                        handleMint(amountToMint)
                      }
                    />
                  )}
                  {activeStatus.name === RackStatusName.Raffle && (
                    <div className="w-[250px]">
                      {!publicKey ? (
                        ""
                      ) : publicKey?.toBase58() === winnerWallet ? (
                        <p className="text-ait-teal text-4xl md:text-5xl lg:text-4xl xl:text-7xl 2xl:text-8xl font-neuebit-bold text-center">
                          YOU WON!
                        </p>
                      ) : (
                        <p className="text-ait-teal text-4xl md:text-5xl lg:text-4xl xl:text-7xl 2xl:text-8xl font-neuebit-bold text-center">
                          YOU LOST
                        </p>
                      )}
                    </div>
                  )}
                  <div
                    className="absolute bottom-20 lg:top-1/2 lg:-translate-y-1/2 right-4
                    px-3 py-1 flex items-center gap-3 cursor-pointer"
                    onClick={() => setStoreOpenView(true)}
                  >
                    <p className="text-white font-neuebit-bold text-3xl leading-6 text-center">
                      SHOP
                      <br />
                      NOW
                    </p>
                    <svg
                      width="16"
                      height="29.4"
                      viewBox="0 0 107 196"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="rotate-180"
                    >
                      <path
                        d="M102 5L9 98L102 191"
                        stroke="#E5E5E5"
                        strokeWidth="12"
                      />
                    </svg>
                  </div>
                </div>
                {activeStatus.name === RackStatusName.Buy && (
                  <Countdown
                    futureDate={activeStatus.endDate}
                    caption={activeStatus.timerCaption}
                    className="pb-10 self-center lg:pb-0 lg:absolute lg:bottom-24 lg:left-[46.9%] lg:-translate-x-1/2 lg:transform"
                    handleDateEnd={handleDateEnd}
                  />
                )}
              </motion.div>
            ) : (
              <div className="relative w-full h-[640px] lg:h-full">
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: "100%",
                    width: "100%",
                    backgroundImage: `url(${process.env.cloudflareStorage}/images/ait/shop.png)`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    opacity: 0.5,
                  }}
                ></div>

                <p
                  className="absolute top-[25%] -translate-y-[75%] left-1/2 -translate-x-1/2
                  text-white font-neuebit-bold text-6xl lg:text-8xl"
                >
                  !!!
                </p>
                <p
                  className="absolute top-[30%] -translate-y-[70%] left-1/2 -translate-x-1/2 
                  text-white font-neuebit-bold text-3xl lg:text-5xl"
                >
                  STORE OPEN
                </p>
                <div
                  className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 
                  py-4 px-8 bg-white flex justify-center items-center"
                >
                  {/* <div
                    className="underline text-[#2764FF] font-neuebit-bold text-3xl lg:text-5xl cursor-pointer"
                    onClick={() => setShowStore(true)}
                  > */}
                  <a
                    href="https://allintime.xyz/"
                    rel="noreferrer"
                    target="_blank"
                    className="underline text-[#2764FF] font-neuebit-bold text-3xl lg:text-5xl cursor-pointer"
                  >
                    SHOP NOW
                  </a>
                  {/* </div> */}
                </div>
                <div
                  className="absolute bottom-20 md:bottom-4 left-1/2 -translate-x-1/2 text-m-ait-green
                  font-neuebit-bold text-2xl md:text-3xl flex flex-col gap-0 items-center justify-center uppercase"
                >
                  <p className="leading-snug text-4xl md:text-[52px] pb-2 whitespace-nowrap">
                    QTYs remaining
                  </p>
                  <div className="flex flex-col ">
                    <p className="leading-none">
                      crewneck..........{" "}
                      {calculateItemQuantity("crewneck", quantities)}/188
                    </p>
                    <p className="leading-none">
                      hat............................{" "}
                      {calculateItemQuantity("hat", quantities)}/190
                    </p>
                    <p className="leading-none">
                      Graphic tee......{" "}
                      {calculateItemQuantity("tee", quantities)}
                      /221
                    </p>
                    <p className="leading-none">
                      builder pack....{" "}
                      {calculateItemQuantity("pack", quantities)}
                      /190
                    </p>
                  </div>
                </div>
                <div
                  className="absolute bottom-0 lg:top-1/2 lg:-translate-y-1/2 left-4
                  px-3 py-1 flex items-center gap-3 cursor-pointer"
                  onClick={() => setStoreOpenView(false)}
                >
                  <svg
                    width="16"
                    height="29.4"
                    viewBox="0 0 107 196"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M102 5L9 98L102 191"
                      stroke="#E5E5E5"
                      strokeWidth="12"
                    />
                  </svg>

                  <p className="text-white font-neuebit-bold text-3xl leading-6 text-center">
                    RAFFLE
                    <br />
                    WINNER
                  </p>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
        {activeStatus.name !== RackStatusName.End && (
          <div
            className={`${
              storeOpenView && "invisible"
            } link uppercase font-bold py-10 self-center`}
            onClick={() => setShowStore(true)}
          >
            see ticket value
          </div>
        )}
        {activeStatus.name === RackStatusName.Raffle && !storeOpenView && (
          <div className="absolute bottom-[3%] left-[3%] hidden lg:block ">
            <Image src={splashIcon} width={300} height={300} alt="splash" />
          </div>
        )}
      </div>
      <div className="lg:pb-[500px]" />
    </div>
  );
};

export default BuyRacksContent;
