import { Modal } from "@merch-components";
import { StoreContext } from "@merch-constants";
import { FC, useContext } from "react";
import Image from "next/image";
import OrderIcon from "../../../images/icons/close.svg";

const OrderModal: FC = () => {
  const { showOrderModal, setStep } = useContext(StoreContext);

  return (
    <Modal
      show={showOrderModal}
      onClick={() => {
        setStep(4);
      }}
      className="w-[80%] lg:w-2/3  3xl:w-1/2 h-[93%] xl:h-[800px]   "
    >
      <div className="relative flex flex-col items-center justify-center h-full w-full p-5 text-center gap-10">
        {/* content */}
        <h2 className="text-4xl md:text-[80px] text-ait-teal pb-4 lowercase">
          all in time
        </h2>
        <div className="flex flex-col items-center uppercase font-neuebit-bold text-2xl md:text-4xl lg:w-1/2 gap-10">
          <p>
            At this point of the checkout process we are going to be collecting
            your RACKS (nfts) + the shipping cost for your merch (sol).
          </p>
          <p className="text-m-red text-lg">all sales are final</p>
        </div>

        <button
          className="h-12 w-60 bg-ait-teal rounded-full uppercase font-neuebit-bold text-xl text-white pt-0.5 tracking-wide"
          onClick={() => {
            console.log(false);
          }}
        >
          Ok ok I get it
        </button>
        {/* close icon */}
        <div
          className="absolute top-5 right-5 cursor-pointer"
          onClick={() => {
            setStep(4);
          }}
        >
          <Image src={OrderIcon} alt="esc" width={35} height={35} />
        </div>
      </div>
    </Modal>
  );
};

export default OrderModal;
