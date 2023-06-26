import {
  Modal,
  Store,
  ItemDetail,
  Checkout,
  Header,
  Footer,
} from "@merch-components";
import { StoreContext, merch } from "@merch-constants";
import { Merch, Quantities } from "@merch-types";
import { getNftsByOwner } from "@merch-helpers";
import { FC, useCallback, useContext, useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import axios from "axios";
import toast from "react-hot-toast";
import "dotenv/config";
//TODO: method isnt fetching devnet nfts, need to solve and add test edition mint address below
const _mintAddress = "2i2Riyru1bKjSpqmiX4wyVTxVu61ixVduyBPTreePiVr";

//TODO: replace with api data
const _quantities: Quantities = {
  crewneck: {
    id: "crewneck",
    quantity: 0,
  },
  tee: {
    id: "tee",
    quantity: 1,
  },
  hat: {
    id: "hat",
    quantity: 10,
  },
  pack: {
    id: "pack",
    quantity: 0,
  },
};

const StoreModal: FC = () => {
  const { showStore, setShowExitModal } = useContext(StoreContext);

  //step 0 = store list, step 1 = item details, step 2 = cart, step 3 = shipping info, step 4 = review
  const [step, setStep] = useState<number>(0);
  const [cart, setCart] = useState<Merch[]>([]);
  const [storeItem, setStoreItem] = useState<Merch>();
  const [nfts, setNfts] = useState<unknown[]>([]);

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

      //fetch metadata
      const jsonArr: Metadata[] = [];
      await Promise.all(
        tokens.map(async (token, index) => {
          //@ts-ignore
          if (token.mintAddress.toBase58() === _mintAddress) {
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
    // const accessToken = "SHMxG54Cyd@hU";
    // const url = "https://slimes.expapi.link/products";

    axios
      .get(`${apiUrl}/products`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          access_token: apiKey,
        },
      })
      .then((response) => {
        // Handle the response data
        console.log(response.data);
      })
      .catch((error) => {
        // Handle the error
        console.error(error);
      });

    // let config = {
    //   method: "get",
    //   maxBodyLength: Infinity,
    //   url: `${apiUrl}/products`,
    //   headers: {
    //     access_token: apiKey,
    //   },
    // };

    // axios
    //   .request(config)
    //   .then((response) => {
    //     console.log(JSON.stringify(response.data));
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  }, []);

  useEffect(() => {
    getQuantities();
  }, [getQuantities]);

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
      // className="w-[90%] lg:w-5/6 2xl:w-[72%] 3xl:w-1/2 h-[93%] lg:h-3/4 "
      className="w-[90%] lg:w-5/6 xl:w-[1285px] 3xl:w-1/2 h-[93%] lg:h-[800px] px-4 py-2"
    >
      <div className="flex flex-col items-center justify-between lg:h-full w-full text-3xl">
        {/* header */}
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
            quantities={_quantities}
            addToCart={addToCart}
            handleImageClick={handleImageClick}
          />
        )}
        {/* item detail view */}
        {step === 1 && storeItem && (
          <ItemDetail
            item={storeItem}
            addToCart={addToCart}
            setStep={setStep}
          />
        )}
        {/* TODO: handle step 1-3 view inside Checkout */}
        {step > 1 && <Checkout step={step} />}
        {/* footer  */}
        <Footer step={step} />
      </div>
    </Modal>
  );
};

export default StoreModal;
