import { FC, useState } from "react";
import { Merch } from "@merch-types";
import Image from "next/image";

interface Props {
  item: Merch;
}
const ItemDetail: FC<Props> = (props: Props) => {
  const { item } = props;

  const [src, setSrc] = useState<string>(`/images/merch/${item.id}/image.png`);

  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start justify-start gap-5 h-full w-full px-10 lg:px-20 py-5">
      {/* image + picker */}
      <div className="flex flex-col gap-3">
        <Image src={src} alt={item.name} width={450} height={450} />
      </div>
      {/*  info + selection */}
    </div>
  );
};

export default ItemDetail;
