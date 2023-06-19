import { Modal } from "@merch-components";
import { StoreContext } from "@merch-constants";
import { FC, useContext } from "react";

const StoreModal: FC = () => {
  const { showExitModal, setShowStore, setShowExitModal } =
    useContext(StoreContext);

  return (
    <Modal
      show={showExitModal}
      onClick={() => {
        setShowExitModal(false);
      }}
      className="w-[80%] lg:w-2/3 h-2/3 lg:h-1/3"
    >
      <div className="flex flex-col items-center justify-between h-full w-full p-8">
        <h3 className=" text-m-red text-5xl font-black uppercase">
          Wait Hol&apos; Up
        </h3>
        <div className="flex flex-col items-center uppercase font-neuebit-bold text-4xl">
          <p>where ya goin?</p>
          <p>exiting this screen will restart the checkout process</p>
          <p>(we don&apos;t save any shipping data)</p>
        </div>
        <div
          className="text-m-red underline uppercase font-neuebit-bold text-5xl cursor-pointer"
          onClick={() => {
            setShowExitModal(false);
            setShowStore(false);
          }}
        >
          i&apos;m outta here
        </div>
      </div>
    </Modal>
  );
};

export default StoreModal;
