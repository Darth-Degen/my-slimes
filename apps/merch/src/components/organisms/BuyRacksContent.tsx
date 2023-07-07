import {
  Dispatch,
  FC,
  SetStateAction,
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
import { useInView } from "framer-motion";
//local
import {
  ImageBox,
  BuyRacksForm,
  TextBox,
  Countdown,
  MerchModule,
} from "@merch-components";
import { rackStatus, StoreContext } from "@merch-constants";
import { RackStatus, RackStatusName } from "@merch-types";
import { EditionSaleContract } from "src/lib/exchange-art/types/contract.interfaces";
import { EditionsContractService } from "src/lib/exchange-art";
import { EDITIONS_PROGRAM_ID } from "src/lib/exchange-art/utils";
import { COLLECTION_API_URL } from "src/constants";
import editionsContractIdl from "src/lib/exchange-art/idl/editions_program_solana.json";
import toast from "react-hot-toast";
import * as slimesPayment from "src/lib/slimes-payment";
import { Metaplex, Nft } from "@metaplex-foundation/js";
import { PublicKey } from "@solana/web3.js";

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

  useEffect(() => {
    (async function () {
      try {
        const editionInfo = await fetch(COLLECTION_API_URL).then((data) =>
          data.json()
        );
        // console.log('editionInfo: ', editionInfo);

        if (
          editionInfo?.contractGroups.length &&
          editionInfo?.contractGroups[0].availableContracts.editionSales.length
        ) {
          setEditionSaleData(
            editionInfo?.contractGroups[0].availableContracts.editionSales[0]
          );
        } else {
          // TODO error toast
          toast.error("Error fetching edition sale data. Data is wrong");
          console.error("Error fetching edition sale data. Data is wrong");
        }
      } catch (e) {
        // TODO error toast
        toast.error("Error fetching edition sale data");
        console.error("Error fetching edition sale data.: ", e);
      }
    })();
  }, []);

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
    if (!editionSaleData) {
      // TODO error toast
      toast.error("Cannot get edition sale data.");
      console.error("Cannot get edition sale data.");
      return;
    }
    // editionContract.buyMultipleEditions(editionSaleData, amountToMint);
    const metaplex = new Metaplex(connection);
    const nftToBurn = await metaplex.nfts().findByMint({
      mintAddress: new PublicKey("3YKQW6sA2q9rn85HrC8aueYH1BhYL6GN6etGkaoXL2sP")
    });
    await slimesPayment.pay(
      connection,
      wallet,
      [nftToBurn],
      0.05,
      1
    );
  };
  // console.log("id ", id);
  return (
    <div
      className={`w-full min-h-screen flex flex-col items-center justify-center bg-ait-teal`}
      id={id}
      ref={ref}
    >
      <div className="py-20" />
      <div className="sticky lg:top-[10%] xl:top-[15%] justify-center flex flex-col gap-0 w-full items-center">
        <div
          className="flex flex-col gap-4 lg:flex-row justify-center items-center rounded-[1.75rem] md:rounded-full h-auto lg:h-[75vh] w-[98%] md:w-[90%] lg:w-[95%] xl:w-[90%] bg-ait-black"
          ref={innerRef}
        >
          <div className="absolute -top-20 lg:-top-20 left-1/2 transform -translate-x-1/2 lg:left-auto lg:right-10">
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
                <ImageBox
                  src={activeStatus.src}
                  caption={activeStatus.caption}
                />
                {activeStatus.name === RackStatusName.Buy && (
                  <BuyRacksForm
                    handleMint={(amountToMint: number) =>
                      handleMint(amountToMint)
                    }
                  />
                )}
                {activeStatus.name === RackStatusName.Raffle && (
                  <TextBox text={activeStatus.text} />
                )}
              </div>
              <Countdown
                futureDate={activeStatus.endDate}
                caption={activeStatus.timerCaption}
                className="pb-10  self-center lg:pb-0 lg:absolute lg:bottom-24 lg:left-[46.9%] lg:-translate-x-1/2 lg:transform"
                handleDateEnd={handleDateEnd}
              />
            </>
          )}
        </div>
        {activeStatus.name !== RackStatusName.End && (
          // <a
          //   href="https://allintime.xyz/"
          //   rel="noreferrer"
          //   target="_blank"
          //   className="link uppercase font-bold py-10 self-center"
          // >
          <div
            className="link uppercase font-bold py-10 self-center"
            onClick={() => setShowStore(true)}
          >
            see ticket value
          </div>
          // </a>
        )}
      </div>
      <div className="lg:pb-[500px]" />
    </div>
  );
};

export default BuyRacksContent;
