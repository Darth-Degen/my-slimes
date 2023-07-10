import { Modal } from "apps/merch/src/components";
import { StoreContext } from "apps/merch/src/constants";
import { Dispatch, FC, SetStateAction, useContext } from "react";
import Image from "next/image";
import ExitIcon from "../../../images/icons/close.svg";

interface Props {
  showWarningModal: boolean;
  setShowWarningModal: Dispatch<SetStateAction<boolean>>;
}
const WarningModal: FC<Props> = (props: Props) => {
  const { showWarningModal, setShowWarningModal } = props;

  return (
    <Modal
      show={showWarningModal}
      onClick={() => {
        setShowWarningModal(false);
      }}
      className="w-[80%] lg:w-2/3 h-2/3 md:h-1/2 lg:h-1/3"
    >
      <div className="relative flex flex-col items-center justify-evenly h-full w-full p-5 text-center">
        {/* content */}
        <h3 className=" text-m-red text-4xl md:text-5xl font-black uppercase">
          Wait Hol&apos; Up
        </h3>
        <div className="flex flex-col items-center uppercase font-neuebit-bold text-3xl md:text-4xl">
          <p>
            looks like you&apos;ve already placed an order with this wallet. to
            place another please move your racks to a new wallet. Thank you for
            buying more. much love
          </p>
        </div>
        {/* close icon */}
        <div
          className="absolute top-5 right-5 cursor-pointer"
          onClick={() => {
            setShowWarningModal(false);
          }}
        >
          <Image src={ExitIcon} alt="esc" width={35} height={35} />
        </div>
      </div>
    </Modal>
  );
};

export default WarningModal;
