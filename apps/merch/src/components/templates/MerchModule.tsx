import {
  FC,
  HTMLAttributes,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { StoreModal, ExitModal, OrderModal } from "@merch-components";
import { AnimatePresence } from "framer-motion";
import { StoreContext, merch } from "@merch-constants";
import {
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
  const [nfts, setNfts] = useState<unknown[]>([]);
  const [quantities, setQuantities] = useState<Quantity[]>([]);
  const [shipping, setShipping] = useState<ShippingInfo>(_shipping);
  const [shippingFee, setShippingFee] = useState<number>(0);

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
  const [showStore, setShowStore] = useState<boolean>(false);
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

  const { publicKey } = useWallet();
  const { connection } = useConnection();

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
      //fetch metadata
      await Promise.all(
        tokens.map(async (token, index) => {
          if (
            token?.updateAuthorityAddress?.toBase58() ===
              editionUpdateAuthority &&
            token?.name === editionName
          ) {
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

  //update user session (cart + shipping + stage)
  const updateSessionCart = async (racks: number): Promise<void> => {
    if (typeof bearerToken !== "string" || !publicKey || !shipping?.address)
      return;
    const toastId = toast.loading("Running it");
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

    // console.log("response ", response);
    if (response.type === ResponseType.Success) {
      toast.success("Systems updated. 1/3 complete");
      //TODO: ANSEL send racks to wallet (racks are param in this function)
      //TODO: on success update stage_1 completed
      sessionData.stage_completed = 1;
      sessionData.nft_send_txn_id = "12345"; //TODO: add txn id
      const stageOneResponse = await updateUserSession(
        bearerToken as string,
        publicKey.toBase58(),
        sessionData
      );
      if (stageOneResponse.type === ResponseType.Success) {
        toast.success("Racks burned. 2/3 complete");
        //TODO: ANSEL send sol to wallet, if racks and sol can be sent in same tx then we can jump straight to "sessionData.stage_completed = 2"
        //TODO: on success update stage_1 completed
        sessionData.stage_completed = 2;
        sessionData.sol_send_txn_id = "12345"; //TODO: add txn id
        const stageTwoResponse = await updateUserSession(
          bearerToken as string,
          publicKey.toBase58(),
          sessionData
        );
        if (stageTwoResponse.type === ResponseType.Success) {
          console.log("stageTwoResponse ", stageTwoResponse);
          toast.success("Sol sent. 3/3 complete", { id: toastId });
        } else {
          toast.error(response.data as string, { id: toastId });
        }
      } else {
        toast.error(response.data as string, { id: toastId });
      }
    } else {
      toast.error(response.data as string, { id: toastId });
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

  //empty state on modal close
  useEffect(() => {
    if (!showStore) {
      setShipping(_shipping);
      setCart([]);
      setStep(0);
    }
  }, [showStore]);

  //calculate shipping fee
  /*
    US Domestic: 
      Crewneck  14$
      T Shirts / Hat / Culture Builder 9$
      Multiple + 4$ for 1st additional, 1$ for 2nd

      So i.e. Crewneck + Tshirt = 18
      Tshirt + Hat = 13
      Crewneck + T + Hat = 19
      T + Hat + culture = 14

    Intl
      Crewneck  19$
      T Shirts / Hat / Culture Builder 16$
      Multiple + 7$ for 1st additional, 2$ for 2nd

      So i.e. Crewneck + Tshirt = 26
      Tshirt + Hat = 23
      Crewneck + T + Hat = 28
      T + Hat + culture = 25
*/
  useEffect(() => {
    if (shipping?.country && cart.length > 0) {
      const isUS = shipping?.country.code === "US";
      let _fee: number = 0;
      console.log("cart ", cart);
      cart.map((item, index) => {
        // console.log("item. ", item);
        switch (item.id) {
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
        if (index === 1) _fee += isUS ? 4 : 7;
        if (index > 1) _fee += isUS ? 1 : 2;
      });

      setShippingFee(_fee);
    }
  }, [cart, shipping]);

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
          />
        )}
      </AnimatePresence>
      {/* exit */}
      <AnimatePresence mode="wait">
        {showExitModal && <ExitModal />}
      </AnimatePresence>
    </StoreContext.Provider>
  );
};
export default MerchModule;
