import { FC } from "react";

interface Props {
  step: number;
}
//step 2 = cart, step 3 = shipping info, step 4 = review
const Checkout: FC<Props> = (props: Props) => {
  const { step } = props;

  return <div className="">Checkout</div>;
};

export default Checkout;
