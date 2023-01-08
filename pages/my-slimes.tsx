import { PageLayout, ScumSection } from "@components";
import { useEffect, useState } from "react";
import { NextPage } from "next";
import Image from "next/image";
import { Dropdown } from "@components";

const Home: NextPage = () => {
  const [didMount, setDidMount] = useState<boolean>(false);
  const [header, setHeader] = useState<string>("My Slimes");

  useEffect(() => {
    setDidMount(true);
  }, []);

  return (
    <PageLayout
      showFooter={true}
      footerAccentColor="bg-custom-light"
      footerTextColor="text-custom-light"
      footerHex="#F3F1EA"
    >
      {didMount && (
        <div className="bg-custom-light w-screen h-full flex flex-col items-center mt-[104px] pb-20 px-10">
          <h2 className="text-[80px] py-10">{header}</h2>
          <div className="flex gap-10">
            <Dropdown
              handleClick={(id: number) => console.log(id)}
              // setDidHoverDispatch<SetStateAction<boolean>>}
              didHover={true}
              label={"test lave"}
              // collections={Collection[]}
            />
            <Dropdown
              handleClick={(id: number) => console.log(id)}
              // setDidHoverDispatch<SetStateAction<boolean>>}
              didHover={true}
              label={"test lave"}
              // collections={Collection[]}
            />
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default Home;
