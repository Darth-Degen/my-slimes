import {
  Modal,
  Store,
  ItemDetail,
  Checkout,
  Header,
  Footer,
} from "@merch-components";
import { StoreContext } from "@merch-constants";
import {
  Merch,
  Quantity,
  ReturnedFundsBalances,
  ShippingInfo,
  ShippingSession,
} from "@merch-types";
import {
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import debounce from "lodash.debounce";

import ExitIcon from "../../../images/icons/close.svg";

interface Props {
  cart: Merch[];
  setCart: Dispatch<SetStateAction<Merch[]>>;
  nfts: unknown[];
  shipping: ShippingInfo;
  setShipping: Dispatch<SetStateAction<ShippingInfo>>;
  quantities: Quantity[];
  getQuantities: () => Promise<void>;
  shippingFee: number;
  setShowWarningModal: Dispatch<SetStateAction<boolean>>;
  shippingSession: ShippingSession | undefined;
  // transactPayment: () => Promise<string>;
  solPrice: number;
  getNfts: () => Promise<void>;
  fetchUserFunds: () => Promise<string | ReturnedFundsBalances | undefined>;
}
const StoreModal: FC<Props> = (props: Props) => {
  const {
    cart,
    setCart,
    nfts,
    shipping,
    setShipping,
    quantities,
    getQuantities,
    shippingFee,
    setShowWarningModal,
    shippingSession,
    // transactPayment,
    solPrice,
    getNfts,
    fetchUserFunds,
  } = props;
  const {
    showStore,
    showOrderModal,
    step,
    setShowExitModal,
    setShowOrderModal,
    setStep,
  } = useContext(StoreContext);

  //step 0 = store list, step 1 = item details, step 2 = cart, step 3 = shipping info, step 4 = review
  const [storeItem, setStoreItem] = useState<Merch>();

  const cartDebouncer = debounce((value: Merch, toastId: string) => {
    setCart((prevState) => [...prevState, value]);

    toast.success("Success", { id: toastId });
    isCartLoadingRef.current = false;
  }, 350);
  useEffect(() => {
    return () => {
      cartDebouncer.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //solana wallet
  const { connected, publicKey } = useWallet();
  const { setVisible } = useWalletModal();

  const atMerchItemCapacity = (id: string) => {
    let count = 0;

    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id === id) {
        count++;

        if (count === 2) {
          return true;
        }
      }
    }

    return false;
  };

  //add to cart
  const isCartLoadingRef = useRef<boolean>(false);
  const addToCart = async (item: Merch) => {
    //TODO: uncomment for shipping
    if (shippingSession && shippingSession?.stage_completed === "2") {
      setShowWarningModal(true);
      return;
    }
    if (isCartLoadingRef.current) return;
    if (!publicKey || !connected) {
      setVisible(true);
      return;
    }

    const toastId = toast.loading("Adding to cart...");
    if (atMerchItemCapacity(item.id)) {
      toast.error("Only two of each item", { id: toastId });
      return;
    }
    isCartLoadingRef.current = true;

    // console.log(item);
    // console.log("quantities ", quantities);

    await getQuantities();
    cartDebouncer(item, toastId);
  };

  //open cart
  const handleCartClick = (): void => {
    if (cart.length === 0) {
      toast.error("Add items to cart");
      return;
    }
    setStep(2);
  };
  //open detail view and save clicked item
  const handleImageClick = (item: Merch) => {
    setStoreItem(item);
    setStep(1);
  };

  const placeOrder = async () => {
    const _funds = (await fetchUserFunds()) as ReturnedFundsBalances;
    if (typeof _funds === undefined || !_funds?.sol) {
      toast.error("Error verifying shipping funds");
      setVisible(true);
      return;
    }

    if (Number((shippingFee / solPrice).toFixed(2)) > _funds?.sol) {
      toast.error("Not enough SOL for shipping");
      return;
    } else {
      setStep(5);
    }
  };

  //reset selected item
  useEffect(() => {
    if (step === 0) setStoreItem(undefined);
  }, [step]);

  return (
    <Modal
      show={showStore}
      onClick={() => {
        setShowExitModal(true);
      }}
      className="w-[90%] lg:w-5/6 xl:w-[1285px] 3xl:w-1/2 h-[93%] xl:h-[800px] lg:px-4 py-2 z-50"
    >
      <div
        className={`flex flex-col items-center justify-between w-full text-3xl ${
          step === 1 ? "xl:h-full" : "xl:h-full"
        }`}
      >
        {/* close icon */}

        <div
          className="absolute top-2 right-2 cursor-pointer scale-75 lg:scale-50 z-10 lg:hidden"
          onClick={() => {
            setShowExitModal(true);
          }}
        >
          <Image src={ExitIcon} alt="esc" width={35} height={35} />
        </div>
        <Header
          step={step}
          nfts={nfts.length}
          cart={cart}
          handleCartClick={handleCartClick}
          setStep={setStep}
          storeItem={storeItem}
        />
        {/* store items */}
        {step === 0 && (
          <Store
            quantities={quantities}
            addToCart={addToCart}
            handleImageClick={handleImageClick}
          />
        )}
        {/* item detail view */}
        {step === 1 && storeItem && (
          <ItemDetail
            quantities={quantities}
            item={storeItem}
            addToCart={addToCart}
            setStep={setStep}
            atMerchItemCapacity={atMerchItemCapacity}
            shippingSession={shippingSession}
            setShowWarningModal={setShowWarningModal}
          />
        )}
        {/* cart + checkout process */}
        {step > 1 && (
          <Checkout
            cart={cart}
            step={step}
            setStep={setStep}
            updateCart={setCart}
            shipping={shipping}
            setShipping={setShipping}
            racks={nfts.length}
            shippingFee={shippingFee}
            solPrice={solPrice}
            getNfts={getNfts}
            placeOrder={placeOrder}
          />
        )}
        <Footer step={step} />
      </div>
    </Modal>
  );
};

export default StoreModal;
