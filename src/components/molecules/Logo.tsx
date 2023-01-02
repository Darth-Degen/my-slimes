import { FC } from "react";
import Image from "next/image";

const Logo: FC = () => {
  return (
    <div className="my-0 flex items-center gap-2 text-gray-200 transition-colors ease-in-out duration-500 cursor-pointer">
      <Image
        src="/images/head_transparent.png"
        height={60}
        width={60}
        alt="hot head icon"
      />
      {/* <Image
        src="/images/logo_base.png"
        height={40}
        width={200}
        alt="hot head logo"
      /> */}
      {/* <h2 className="font-pressStart mb-0.5 text-2xl text-transparent bg-clip-text bg-gradient-to-t from-red-500  to-yellow-300"> */}
      <h2 className="font-pressStart mt-3 text-2xl text-orange-300">
        HotHeads
      </h2>
    </div>
  );
};
export default Logo;
