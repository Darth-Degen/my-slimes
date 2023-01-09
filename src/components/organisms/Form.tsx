import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { TextInput, ButtonBar, Button, Dropdown } from "@components";
import { collections } from "@constants";

interface Props {
  tokenId: number;
  isLoading: boolean;
  isDownloading: boolean;
  setTokenId: Dispatch<SetStateAction<number>>;
  setShowLogo: Dispatch<SetStateAction<boolean>>;
  setText: Dispatch<SetStateAction<string>>;
  handleDownload: () => void;
}

const Form: FC<Props> = (props: Props) => {
  const {
    tokenId,
    isLoading,
    isDownloading,
    setTokenId,
    setShowLogo,
    setText,
    handleDownload,
  } = props;

  const [didHover, setDidHover] = useState<boolean>(false);

  const selectClick = (id: number) => {
    setTokenId(id);
    setDidHover(false);
  };

  return (
    <div className="flex flex-col gap-3 mt-8 bg-customMidGray py-8 px-10 rounded-lg border border-orange-300">
      <h2 className="text-xl text-center text-gray-200 pb-4">Customize</h2>
      {/* <Dropdown
        handleClick={selectClick}
        setDidHover={setDidHover}
        didHover={didHover}
        label={
          tokenId === -1
            ? "Select ID"
            : tokenId < 10
            ? `00${tokenId}`
            : `0${tokenId}`
        }
        collections={collections}
      />
      <ButtonBar
        label="Show Logo"
        handleToggle={setShowLogo}
        disabled={tokenId < 0 || isLoading}
      />
      <TextInput handleInput={setText} disabled={tokenId < 0 || isLoading} />
      <div className="mt-6">
        <Button
          onClick={() => handleDownload()}
          disabled={tokenId < 0 || isLoading}
          isLoading={isDownloading}
        >
          Download
        </Button>
      </div> */}
    </div>
  );
};

export default Form;
