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
import { StoreContext } from "@merch-constants";
import { getBearerToken, getUserSession } from "@merch-helpers";
import {
  Merch,
  Response,
  ResponseType,
  PreSession,
  ShippingSession,
} from "@merch-types";
import axios from "axios";
import { useWallet } from "@solana/wallet-adapter-react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const MerchModule: FC<Props> = (props: Props) => {
  const { children, className, ...componentProps } = props;

  //state
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
  const [cart, setCart] = useState<Merch[]>([]);
  const [step, setStep] = useState<number>(0);
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

  //handle order modal
  useEffect(() => {
    if (step > 4) setShowOrderModal(true);
    else setShowOrderModal(false);
  }, [setShowOrderModal, step]);

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

  //fetch bearer token
  const handleSession = useCallback(async () => {
    if (typeof bearerToken !== "string" || !publicKey) return;

    const response = await getUserSession(
      bearerToken as string,
      publicKey.toBase58()
    );

    if (response && response.type === ResponseType.Success) {
      console.log("response ", response);

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

  useEffect(() => {
    if (sessionId) console.log("sessionId ", sessionId);
  }, [sessionId]);
  useEffect(() => {
    if (preSession) console.log("preSession ", preSession);
  }, [preSession]);
  useEffect(() => {
    if (shippingSession) console.log("shippingSession ", shippingSession);
  }, [shippingSession]);

  return (
    <StoreContext.Provider value={value}>
      {children}
      {/* store */}
      <AnimatePresence mode="wait">
        {showStore && (
          <StoreModal cart={cart} setCart={setCart} bearerToken={bearerToken} />
        )}
      </AnimatePresence>
      {/* order */}
      <AnimatePresence mode="wait">
        {showOrderModal && (
          <OrderModal cart={cart} setCart={setCart} bearerToken={bearerToken} />
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
