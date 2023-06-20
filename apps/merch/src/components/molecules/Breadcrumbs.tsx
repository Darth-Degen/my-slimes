import { Dispatch, FC, SetStateAction } from "react";

interface Props {
  step: number;
  checkoutStep: number;
  setStep: Dispatch<SetStateAction<number>>;
  setCheckoutStep: Dispatch<SetStateAction<number>>;
}
const Breadcrumbs: FC<Props> = (props: Props) => {
  const { step, checkoutStep, setStep, setCheckoutStep } = props;

  return (
    <div className="flex gap-1.5 tracking-wide text-base md:text-xl text-m-black font-neuebit-bold uppercase">
      <div
        className="cursor-pointer"
        onClick={() => {
          setStep(0);
          setCheckoutStep(-1);
        }}
      >
        all in time
      </div>
      {step === 1 && checkoutStep === 0 && (
        <div
          className="cursor-pointer"
          onClick={() => {
            setStep(1);
            setCheckoutStep(-1);
          }}
        >
          {">"}
        </div>
      )}
      {step === 1 && checkoutStep === 0 && (
        <div
          className="cursor-pointer"
          onClick={() => {
            setStep(2);
            setCheckoutStep(0);
          }}
        >
          TODO: add selected item
        </div>
      )}
    </div>
  );
};

export default Breadcrumbs;
