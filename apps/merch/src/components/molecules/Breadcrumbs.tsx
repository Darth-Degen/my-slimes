import { Dispatch, FC, SetStateAction } from "react";
import { Merch } from "@merch-types";

interface Props {
  step: number;
  storeItem: Merch | undefined;
  setStep: Dispatch<SetStateAction<number>>;
}
const Breadcrumbs: FC<Props> = (props: Props) => {
  const { step, storeItem, setStep } = props;

  return (
    <div className="flex gap-1.5 tracking-wide text-base md:text-xl text-m-black font-neuebit-bold uppercase">
      <div
        className="cursor-pointer"
        onClick={() => {
          setStep(0);
        }}
      >
        all in time
      </div>
      {step === 1 && <div className="cursor-pointer">{">"}</div>}
      {step === 1 && (
        <div
          className="cursor-pointer"
          onClick={() => {
            setStep(1);
          }}
        >
          {storeItem?.name ?? "merch item"}
        </div>
      )}
    </div>
  );
};

export default Breadcrumbs;
