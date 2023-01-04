import { FC } from "react";
import Image from "next/image";
import { Paragraph } from "@components";

const AboutSection: FC = () => {
  return (
    // <div className="relative flex flex-col lg:flex-row items-center justify-start gap-10 md:gap-0 lg:gap-20  bg-custom-pink rounded-t-full rounded-b-md lg:rounded-t-auto lg:rounded-l-full lg:rounded-r-xl p-8 lg:p-14 my-20">
    <div className="relative flex flex-col lg:flex-row items-center justify-start my-20">
      <div className="bg-custom-pink rounded-t-full lg:rounded-tr-none lg:rounded-l-full lg:h-[500px] flex items-center p-8 lg:p-12 sm:w-[484px] lg:w-auto">
        <Image
          src="/images/scum.png"
          alt="Weapon"
          width={420}
          height={420}
          className=""
        />
      </div>
      <div className="flex flex-col gap-20 justify-center max-w-[630px] bg-custom-pink rounded-b-3xl lg:rounded-bl-none lg:rounded-r-3xl lg:h-[500px] px-10 pb-12 lg:py-14 sm:w-[484px] lg:w-auto">
        <Paragraph
          title="scum"
          body={[
            "scum started his career as an artist doing design and photography, not publicly sharing or selling his art until he discovered web3 and the Solana community. he has now released several successful 1:1 collections, worked with DAA, Famous Foxes, DeLabs, Solana Foundation and more. He participates in a weekly Twitter Spaces with his friends Hyblinxx and Scuba Steve drawing crowd prompts with members of the community.",
            "Known for working with the team that released Deadgods and y00ts, the two largest collections formerly on Solana. He's spent thousands of hours studying and learning the pfp medium.",
            "Slimes are his opportunity to leave his mark on the space, grow his vision, raise awareness and express himself. ",
          ]}
        />
      </div>
    </div>
  );
};

export default AboutSection;
