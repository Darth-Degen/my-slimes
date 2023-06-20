import { Modal, Store, ItemDetail, Checkout } from "@merch-components";
import { StoreContext } from "@merch-constants";
import { FC, useCallback, useContext, useEffect, useState } from "react";
import { Merch } from "@merch-types";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import axios from "axios";
import toast from "react-hot-toast";
import { getNftsByOwner } from "@merch-helpers";
import { Nft, Sft } from "@metaplex-foundation/js";

//TODO: method isnt fetching devnet nfts, need to solve and add test edition mint address below
const _mintAddress = "2i2Riyru1bKjSpqmiX4wyVTxVu61ixVduyBPTreePiVr";

const StoreModal: FC = () => {
  const { showStore, setShowExitModal } = useContext(StoreContext);

  //step 0 = store list, step 1 = item details
  const [step, setStep] = useState<number>(0);
  //step 0 = cart, step 1 = purchase, step 2 = review
  const [checkoutStep, setCheckoutStep] = useState<number>(-1);
  const [cart, setCart] = useState<Merch[]>([]);
  const [nfts, setNfts] = useState<unknown[]>([]); //<(Metadata | Metadata | Nft | Sft)[]>([]);

  //solana wallet
  const { publicKey } = useWallet();
  const { connection } = useConnection();

  const addToCart = (item: Merch) => {
    setCart((prevState) => [...prevState, item]);
  };

  const handleCartClick = (): void => {
    setCheckoutStep(0);
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
      className="w-[90%] lg:w-5/6 2xl:w-[80%]  h-[93%] lg:h-3/4 3xl:w-1/2"
    >
      <div className="flex flex-col items-center justify-center h-full w-full text-3xl">
        {step === 0 && checkoutStep === -1 && (
          <Store
            step={step}
            checkoutStep={checkoutStep}
            nfts={nfts.length}
            cart={cart}
            handleCartClick={handleCartClick}
            addToCart={addToCart}
            setStep={setStep}
            setCheckoutStep={setCheckoutStep}
          />
        )}
        {step === 1 && checkoutStep === 0 && <ItemDetail />}
        {/* TODO: handle step 1-3 view inside Checkout */}
        {checkoutStep > 0 && <Checkout step={checkoutStep} />}
      </div>
    </Modal>
  );
};

export default StoreModal;
