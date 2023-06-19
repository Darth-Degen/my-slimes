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
        setShowStore(false);
      }}
      className="h-1/3 w-2/3"
    >
      <div className="flex flex-col items-center justify-center h-full w-full text-3xl">
        General Kenobi
      </div>
    </Modal>
  );
};

export default StoreModal;
