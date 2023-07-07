import {
  Modal,
  Store,
  ItemDetail,
  Checkout,
  Header,
  Footer,
} from "@merch-components";
import { StoreContext, merch } from "@merch-constants";
import { Merch, Quantity, ShippingInfo } from "@merch-types";
import {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import debounce from "lodash.debounce";

import ExitIcon from "../../../images/icons/close.svg";
import { useWallet } from "@solana/wallet-adapter-react";

interface Props {
  cart: Merch[];
  setCart: Dispatch<SetStateAction<Merch[]>>;
  nfts: unknown[];
  shipping: ShippingInfo;
  setShipping: Dispatch<SetStateAction<ShippingInfo>>;
  quantities: Quantity[];
  getQuantities: () => Promise<void>;
  shippingFee: number;
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

  //solana wallet
  const { connected, publicKey } = useWallet();
  const { setVisible } = useWalletModal();

  const atMerchItemCapacity = (id: string) => {
    let count = 0;

    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id === id) {
        count++;

        if (count === 3) {
          return true;
        }
      }
    }

    return false;
  };

  //add to cart
  const addToCart = async (item: Merch) => {
    if (!publicKey || !connected) {
      setVisible(true);
      return;
    }
    if (atMerchItemCapacity(item.id)) {
      toast.error("Only three of each item");
      return;
    }
    // console.log(item);
    await getQuantities();
    // console.log("quantities ", quantities);
    setCart((prevState) => [...prevState, item]);
  };
  //open cart
  const handleCartClick = (): void => {
    setStep(2);
  };
  //open detail view and save clicked item
  const handleImageClick = (item: Merch) => {
    setStoreItem(item);
    setStep(1);
  };

  // const debounceWalletModal = debounce((value) => setVisible(value), 1500);
  // //unmount debounce
  // useEffect(() => {
  //   return () => {
  //     debounceWalletModal.cancel();
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

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
      className="w-[90%] lg:w-5/6 xl:w-[1285px] 3xl:w-1/2 h-[93%] xl:h-[800px] px-4 py-2 z-50"
    >
      <div className="flex flex-col items-center justify-between xl:h-full w-full text-3xl">
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
            racks={100} //TODO: {nfts.length}
            shippingFee={shippingFee}
          />
        )}
        <Footer step={step} />
      </div>
    </Modal>
  );
};

export default StoreModal;
