import { FC } from "react";

interface Props {
  step: number;
}
const Checkout: FC<Props> = (props: Props) => {
  const { step } = props;

  return <div className="">Checkout</div>;
};

export default Checkout;
