import { Modal } from "apps/merch/src/components";
import { StoreContext } from "apps/merch/src/constants";
import { FC, useContext } from "react";
import Image from "next/image";
import ExitIcon from "../../../images/icons/close.svg";

const ExitModal: FC = () => {
  const { showExitModal, setShowStore, setShowExitModal } =
    useContext(StoreContext);

  return (
    <Modal
      show={showExitModal}
      onClick={() => {
        setShowExitModal(false);
      }}
      className="w-[80%] lg:w-2/3 h-2/3 md:h-1/2 lg:h-1/3"
    >
      <div className="relative flex flex-col items-center justify-evenly h-full w-full p-5 text-center">
        {/* content */}
        <h3 className=" text-m-red text-4xl md:text-5xl font-black uppercase">
          Wait Hol&apos; Up
        </h3>
        <div className="flex flex-col items-center uppercase font-neuebit-bold text-3xl md:text-4xl">
          <p>where ya goin?</p>
          <p>exiting this screen will restart the checkout process</p>
          <p>(we don&apos;t save any shipping data)</p>
        </div>
        <div
          className="text-m-red underline uppercase font-neuebit-bold text-4xl md:text-5xl cursor-pointer"
          onClick={() => {
            setShowExitModal(false);
            setShowStore(false);
          }}
        >
          i&apos;m outta here
        </div>
        {/* close icon */}
        <div
          className="absolute top-5 right-5 cursor-pointer"
          onClick={() => {
            setShowExitModal(false);
          }}
        >
          <Image src={ExitIcon} alt="esc" width={35} height={35} />
        </div>
      </div>
    </Modal>
  );
};

export default ExitModal;
