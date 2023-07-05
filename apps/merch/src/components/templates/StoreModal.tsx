import {
  Modal,
  Store,
  ItemDetail,
  Checkout,
  Header,
  Footer,
} from "@merch-components";
import { StoreContext, merch } from "@merch-constants";
import { Merch, Quantity } from "@merch-types";
import { getNftsByOwner } from "@merch-helpers";
import {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import axios from "axios";
import toast from "react-hot-toast";
// import "dotenv/config";
import Image from "next/image";
import ExitIcon from "../../../images/icons/close.svg";

interface Props {
  cart: Merch[];
  setCart: Dispatch<SetStateAction<Merch[]>>;
}
const StoreModal: FC<Props> = (props: Props) => {
  const { cart, setCart } = props;
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
  const [nfts, setNfts] = useState<unknown[]>([]);
  const [quantities, setQuantities] = useState<Quantity[]>([]);

  //solana wallet
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  //add to cart
  const addToCart = (item: Merch) => {
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

  //fetch users nfts
  const getNfts = useCallback(async () => {
    if (!connection || !publicKey) return;

    try {
      //fetch tokens
      const tokens = await getNftsByOwner(connection, publicKey);
      if (!tokens || typeof tokens === "string") return;

      const editionUpdateAuthority = process.env.editionUpdateAuthority;
      const editionName = process.env.editionName;

      //fetch metadata
      await Promise.all(
        tokens.map(async (token, index) => {
          // console.log(
          //   "nft \n",
          //   token?.updateAuthorityAddress.toBase58(),
          //   "\n",
          //   token?.address.toBase58(),
          //   "\n",
          //   //@ts-ignore
          //   token?.mintAddress.toBase58(),
          //   token
          // );

          if (
            token?.updateAuthorityAddress?.toBase58() ===
              editionUpdateAuthority &&
            token?.name === editionName
          ) {
            setNfts((prevState) => [...prevState, token]);
          }
          // const uri = token.uri;
          // try {
          //   await axios.get(uri).then((r) => {
          //     // @ts-ignore
          //     r.data.mintAddress = token.mintAddress;
          //     jsonArr.push(r.data);
          //   });
          // } catch (e: any) {
          //   console.error(e.message);
          // }
        })
      );
    } catch (e: any) {
      console.error(e.message);
      toast.error(`Error ${e.message}`);
    }
  }, [connection, publicKey]);

  useEffect(() => {
    getNfts();
  }, [getNfts]);

  //fetch merch quantities
  const getQuantities = useCallback(() => {
    if (!process.env.apiKey || !process.env.apiUrl) return;

    const apiKey = process.env.apiKey;
    const apiUrl = process.env.apiUrl;

    // axios
    //   .get(`${apiUrl}/products`, {
    //     headers: {
    //       "Content-Type": "application/json",
    //       "Access-Control-Allow-Origin": "*",
    //       access_token: apiKey,
    //     },
    //   })
    //   .then((response) => {
    //     // Handle the response data
    //     console.log(response.data);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     // Handle the error
    let _quantities: Quantity[] = [];
    merch.forEach((item: Merch) => {
      _quantities.push({
        productid: item.id,
        name: item.name,
        cost: item.cost,
        sizes: item.sizes,
      });
    });
    setQuantities(_quantities);
    // });
  }, []);

  useEffect(() => {
    getQuantities();
  }, [getQuantities]);

  //reset selected item
  useEffect(() => {
    if (step === 0) setStoreItem(undefined);
  }, [step]);

  //console outputs
  useEffect(() => {
    if (cart.length > 0) console.log("cart ", cart);
  }, [cart]);
  useEffect(() => {
    if (nfts.length > 0) console.log("racks ", nfts.length);
  }, [nfts]);

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
          className="absolute top-2 right-2 cursor-pointer scale-75 lg:scale-50 z-10"
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
          />
        )}
        <Footer step={step} />
      </div>
    </Modal>
  );
};

export default StoreModal;
