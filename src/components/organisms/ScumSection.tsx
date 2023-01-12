import { FC } from "react";
import Image from "next/image";
import { Paragraph } from "@components";

const AboutSection: FC = () => {
  return (
    // <div className="relative flex flex-col lg:flex-row items-center justify-start gap-10 md:gap-0 lg:gap-20  bg-custom-pink rounded-t-full rounded-b-md lg:rounded-t-auto lg:rounded-l-full lg:rounded-r-xl p-8 lg:p-14 my-20">
    <div className="relative flex flex-col lg:flex-row items-center justify-start my-20">
      <div className="bg-custom-pink rounded-t-full lg:rounded-tr-none lg:rounded-l-full lg:h-[500px] flex items-center p-7 lg:p-12 sm:w-[484px] lg:w-auto">
        <Image
          src="/images/scum.png"
          alt="Weapon"
          width={420}
          height={420}
          className=""
        />
      </div>
      <div className="flex flex-col gap-20 justify-center bg-custom-pink rounded-b-3xl lg:rounded-bl-none lg:rounded-r-3xl lg:h-[500px] px-10 pb-12 lg:py-14 max-w-[484px] lg:max-w-[630px]  sm:w-[484px] lg:w-auto">
        <Paragraph
          title="scum"
          body={[
            "scum started his career as an artist in graphic design, building brands. While always an illustrator at heart, he didn't share his work until January of 2022.",
            "In that time he has worked with the largest NFT projects on Solana, including creating concepts and assets for y00ts and Deadgods. ",
            "scum created slimes to build characters for the universe being built within his Maquina Muertes Collection. A series planned to precede a much larger body of work. Slimes will be the squad that builds the future. ",
          ]}
          className="text-start"
        />
      </div>
    </div>
  );
};

export default AboutSection;
