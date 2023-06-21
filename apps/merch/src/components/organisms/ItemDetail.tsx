import { FC } from "react";
import { Merch } from "@merch-types";

interface Props {
  item: Merch;
}
const ItemDetail: FC<Props> = (props: Props) => {
  const { item } = props;

  return <div className="">{item.name}</div>;
};

export default ItemDetail;
