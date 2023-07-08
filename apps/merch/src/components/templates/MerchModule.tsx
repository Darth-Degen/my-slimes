import {
  FC,
  HTMLAttributes,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  StoreModal,
  ExitModal,
  OrderModal,
  WarningModal,
} from "@merch-components";
import { AnimatePresence } from "framer-motion";
import { StoreContext, merch } from "@merch-constants";
import {
  fetchSolanaTokenPrice,
  getAllProducts,
  getBearerToken,
  getNftsByOwner,
  getUserSession,
  updateUserSession,
} from "@merch-helpers";
import {
  Merch,
  Response,
  ResponseType,
  PreSession,
  ShippingSession,
  ShippingInfo,
  ShippingCart,
  Quantity,
} from "@merch-types";
import axios from "axios";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import toast from "react-hot-toast";
import {
  Metaplex,
  Nft,
  NftWithToken,
  Sft,
  SftWithToken,
} from "@metaplex-foundation/js";
import { PublicKey } from "@solana/web3.js";
import * as slimesPayment from "src/lib/slimes-payment";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const _shipping: ShippingInfo = {
  name: "",
  email: "",
  address: "",
  address2: "",
  country: { name: "", code: "" },
  city: "",
  state: "",
  zip: "",
};

const MerchModule: FC<Props> = (props: Props) => {
  const { children, className, ...componentProps } = props;

  //state
  const [cart, setCart] = useState<Merch[]>([]);
  const [step, setStep] = useState<number>(0);
  const [nfts, setNfts] = useState<(Nft | Sft | SftWithToken | NftWithToken)[]>(
    []
  );
  const [quantities, setQuantities] = useState<Quantity[]>([]);
  const [shipping, setShipping] = useState<ShippingInfo>(_shipping);
  const [shippingFee, setShippingFee] = useState<number>(0);
  const [showWarningModal, setShowWarningModal] = useState<boolean>(false);
  const [solPrice, setSolPrice] = useState<number>(21.69);
  const [shippingCurrency, setShippingCurrency] = useState("sol");

  const [bearerToken, setBearerToken] = useState<
    string | unknown | undefined
  >();
  //first session
  const [sessionId, setSessionId] = useState<string | undefined>();
  //pre shipment session
  const [preSession, setPreSession] = useState<PreSession | undefined>();
  const [shippingSession, setShippingSession] = useState<
    ShippingSession | undefined
  >();

  //context variables
  const [showStore, setShowStore] = useState<boolean>(true);
  const [showExitModal, setShowExitModal] = useState<boolean>(false);
  const [showOrderModal, setShowOrderModal] = useState<boolean>(false);
  const value = {
    showStore,
    setShowStore,
    showExitModal,
    setShowExitModal,
    showOrderModal,
    setShowOrderModal,
    step,
    setStep,
  };

  //wallet
  const wallet = useWallet();
  const { connected, publicKey } = wallet;
  const { setVisible } = useWalletModal();
  const { connection } = useConnection();

  //cost of cart in racks
  const calculateRacks = (): number => {
    if (cart.length === 0) return 0;
    //calculate total
    return cart.reduce((total, item) => {
      return total + item.cost;
    }, 0);
  };

  //fetch users nfts
  const getNfts = useCallback(async () => {
    if (!connection || !publicKey) {
      return;
    }

    try {
      //fetch tokens
      const tokens = await getNftsByOwner(connection, publicKey);
      if (!tokens || typeof tokens === "string") return;

      const editionUpdateAuthority = process.env.editionUpdateAuthority;
      const editionName = process.env.editionName;
      // console.log("mint info ", editionName, editionUpdateAuthority);
      //fetch metadata
      await Promise.all(
        tokens.map(async (token, index) => {
          // console.log("token ", token.name);
          //fetch metadata
          if (
            token?.updateAuthorityAddress?.toBase58() ===
              editionUpdateAuthority &&
            token?.name === editionName
          ) {
            //@ts-ignore
            setNfts((prevState) => [...prevState, token]);
          }
        })
      );
    } catch (e: any) {
      console.error(e.message);
      toast.error(`Error ${e.message}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connection, publicKey]);

  useEffect(() => {
    getNfts();
  }, [getNfts]);

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

  //fetch user session info
  const handleSession = useCallback(async () => {
    if (typeof bearerToken !== "string" || !publicKey) return;

    const response = await getUserSession(
      bearerToken as string,
      publicKey.toBase58()
    );

    if (response && response.type === ResponseType.Success) {
      // console.log("response ", response.data);

      //step 1: save session
      //@ts-ignore
      if (!response?.data?.session_id) {
        //first session
        setSessionId(response?.data as string);
        //@ts-ignore
      } else if (!response?.data?.address) {
        //pre shipping info
        setPreSession(response?.data as PreSession);
      } else {
        setShippingSession(response?.data as ShippingSession);
      }
    }
  }, [publicKey, bearerToken]);

  useEffect(() => {
    handleSession();
  }, [handleSession]);

  // console.log("Error with USDC, check balance and try again".slice(0, 5));

  //update user session (cart + shipping + stage)
  const updateSessionCart = async (racks: number): Promise<void> => {
    if (typeof bearerToken !== "string" || !publicKey || !shipping?.address)
      return;
    const toastId = toast.loading("Running it...");

    try {
      const _cart: ShippingCart[] = cart.map((item) => {
        return {
          productid: item.id,
          color: item.color as string,
          size: item.size as string,
          quantity: 1,
        };
      });

      const sessionData: ShippingSession = {
        address: shipping.address,
        city: shipping.city,
        country: shipping.country.code,
        email: shipping.email,
        first_name: shipping.name,
        geo_state: shipping.state,
        last_name: "",
        // nft_send_txn_id?: null,
        // phone: shipping.number,
        session_id: shippingSession?.session_id ?? preSession?.session_id,
        // sol_send_txn_id?: null,
        stage_completed: 0,
        wallet_address: publicKey.toBase58(),
        zip: shipping.zip,
        cart: _cart,
      };
      console.log("sessionData ", sessionData);
      const response = await updateUserSession(
        bearerToken as string,
        publicKey.toBase58(),
        sessionData
      );

      // // console.log("response ", response);
      // if (response.type === ResponseType.Success) {
      //   toast.success("Systems updated. 1/3 complete");
      //   //TODO: ANSEL send racks to wallet (racks are param in this function)
      //   //TODO: on success update stage_1 completed
      //   sessionData.stage_completed = 1;
      //   sessionData.nft_send_txn_id = "12345"; //TODO: add txn id
      //   const stageOneResponse = await updateUserSession(
      //     bearerToken as string,
      //     publicKey.toBase58(),
      //     sessionData
      //   );
      if (response.type === ResponseType.Success) {
        // toast.success("Racks burned. 2/3 complete");
        //TODO: ANSEL send sol to wallet, if racks and sol can be sent in same tx then we can jump straight to "sessionData.stage_completed = 2"
        //TODO: on success update stage_1 completed

        const transactions = await transactPayment();
        // console.log("transactions ", transactions);
        if (transactions.slice(0, 5) === "Error") {
          throw new Error(transactions);
        } else {
          sessionData.stage_completed = 2;
          sessionData.nft_send_txn_id = transactions;
          sessionData.sol_send_txn_id = "";

          const stageTwoResponse = await updateUserSession(
            bearerToken as string,
            publicKey.toBase58(),
            sessionData
          );

          if (stageTwoResponse.type === ResponseType.Success) {
            toast.success("Success", { id: toastId });
            setStep(7);
          } else {
            toast.error(("stage 2 " + response.data) as string, {
              id: toastId,
            });
            console.log("stage 2 ", response.data as string);
          }
        }
      } else {
        toast.error(("stage 0 " + response.data) as string, { id: toastId });
        console.log("stage 0 ", response.data as string);
      }
      // } else {
      //   toast.error(response.data as string, { id: toastId });
      // }}
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Transaction Failed. Check balnaces and try again";
      console.error("purchase ", message);
      toast.error(message, {
        id: toastId,
      });
    }
  };

  const transactPayment = async (): Promise<string> => {
    if (!connection || !publicKey) {
      setVisible(true);
    }

    const _racks = calculateRacks();

    // console.log("nftsToBurn ", nftsToBurn);
    //TODO: cahnge to 26
    const dividend = 26;

    if (_racks > dividend) {
      const numBatches = Math.ceil(_racks / dividend);
      const txsSignatures: string[] = [];

      for (let i = 0; i < numBatches; i++) {
        const startIndex = i * dividend;
        const endIndex = Math.min(startIndex + dividend, _racks);

        const nftsToBurn = nfts.slice(startIndex, endIndex);

        const isLastBatch = i === numBatches - 1;

        const txs = await slimesPayment.pay(
          connection,
          wallet,
          nftsToBurn,
          shippingCurrency === "sol"
            ? Number((shippingFee / solPrice).toFixed(2))
            : 0,
          shippingCurrency === "usdc" ? shippingFee : 0,
          !isLastBatch
        );

        txsSignatures.push(txs);
      }

      console.log("txsSignatures: ", txsSignatures);
      return txsSignatures.join(",");
    } else {
      const nftsToBurn = nfts.slice(0, _racks);
      const txsSignatures = await slimesPayment.pay(
        connection,
        wallet,
        nftsToBurn,
        shippingCurrency === "sol"
          ? Number((shippingFee / solPrice).toFixed(2))
          : 0,
        shippingCurrency === "usdc" ? shippingFee : 0
      );
      console.log("txsSignatures: ", txsSignatures);
      return txsSignatures;
    }
  };

  //fetch merch quantities
  const getQuantities = useCallback(async (): Promise<void> => {
    if (typeof bearerToken !== "string") return;

    const response = await getAllProducts(bearerToken as string);

    let _quantities: Quantity[] = [];
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
  }, [bearerToken]);

  useEffect(() => {
    getQuantities();
  }, [getQuantities]);

  //handle order modal
  useEffect(() => {
    if (step > 4) setShowOrderModal(true);
    else setShowOrderModal(false);
  }, [setShowOrderModal, step]);

  const resetStore = useCallback(() => {
    setShipping(_shipping);
    setCart([]);
    setShippingFee(0);
  }, []);

  //empty state on modal close
  useEffect(() => {
    if (!showStore) {
      resetStore();
      setStep(0);
    }
  }, [showStore, resetStore]);
  console.log(cart);
  //calculate shipping fee
  useEffect(() => {
    if (shipping?.country && cart.length > 0) {
      const isUS = shipping?.country.code === "US";
      let _fee: number = 0;
      // console.log("cart ", cart);

      if (cart.length > 1) {
        const hasCrewneck = cart.some((item) => item.id === "crewneck");
        if (hasCrewneck) _fee += isUS ? 14 : 19;
        else _fee += isUS ? 9 : 16;
      } else {
        switch (cart[0].id) {
          case "crewneck":
            _fee += isUS ? 14 : 19;
            break;
          case "tee":
            _fee += isUS ? 9 : 16;
            break;
          case "pack":
            _fee += isUS ? 9 : 16;
            break;
          case "hat":
            _fee += isUS ? 9 : 16;
            break;
        }
      }

      cart.map((item, index) => {
        if (index === 1) _fee += isUS ? 4 : 7;
        if (index > 1) _fee += isUS ? 1 : 2;
      });

      if (cart.length > 7) {
        _fee += 10;
      }

      setShippingFee(_fee);
    }
  }, [cart, shipping]);

  //reset store after purchase
  useEffect(() => {
    if (step === 7) {
      resetStore();
    }
  }, [resetStore, step]);

  //fetch solana price
  const fetchSolanaToken = useCallback(async (): Promise<void> => {
    const sol = await fetchSolanaTokenPrice();
    setSolPrice(sol);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  useEffect(() => {
    fetchSolanaToken();
  }, [fetchSolanaToken]);

  return (
    <StoreContext.Provider value={value}>
      {children}
      {/* store */}
      <AnimatePresence mode="wait">
        {showStore && (
          <StoreModal
            cart={cart}
            setCart={setCart}
            nfts={nfts}
            shipping={shipping}
            setShipping={setShipping}
            quantities={quantities}
            getQuantities={getQuantities}
            shippingFee={shippingFee}
            setShowWarningModal={setShowWarningModal}
            shippingSession={shippingSession}
            solPrice={solPrice}
            getNfts={getNfts}
          />
        )}
      </AnimatePresence>
      {/* order */}
      <AnimatePresence mode="wait">
        {showOrderModal && (
          <OrderModal
            cart={cart}
            setCart={setCart}
            updateSessionCart={updateSessionCart}
            shippingFee={shippingFee}
            solPrice={solPrice}
            shippingCurrency={shippingCurrency}
            setShippingCurrency={setShippingCurrency}
          />
        )}
      </AnimatePresence>
      {/* exit */}
      <AnimatePresence mode="wait">
        {showExitModal && <ExitModal />}
      </AnimatePresence>
      {/* exit */}
      <AnimatePresence mode="wait">
        {showWarningModal && (
          <WarningModal
            showWarningModal={showWarningModal}
            setShowWarningModal={setShowWarningModal}
          />
        )}
      </AnimatePresence>
    </StoreContext.Provider>
  );
};
export default MerchModule;
