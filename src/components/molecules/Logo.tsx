import { FC } from "react";
import { LogoIcon } from "@components";

const Logo: FC = () => {
  return (
    <div className="my-0 flex items-center gap-2 text-gray-200 transition-colors ease-in-out duration-500 cursor-pointer">
      <LogoIcon fill={"#FFFFFF"} fillHover={"#8BD2B9"} />
    </div>
  );
};
export default Logo;
