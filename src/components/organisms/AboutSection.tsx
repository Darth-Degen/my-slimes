import { FC } from "react";
import Image from "next/image";
import { Paragraph } from "@components";

const AboutSection: FC = () => {
  return (
    <div className="flex justify-start 2xl:justify-center w-full gap-20 2xl:pr-36 3xl:pr-0">
      <Image
        src="/images/weapon-lg.png"
        alt="Weapon"
        width={500}
        height={439}
        className="hidden lg:block"
      />
      <div className="flex flex-col gap-20 justify-center lg:max-w-[600px] md:px-10 lg:px-0">
        <Paragraph
          title="who are my slimes"
          body={[
            "Slimes are the squad. The community your girlfriend told you not to worry about. Built from over a year of experience creating community assets and on chain art by the artist Scum. Slimes are inspired by scum's xicano heritage, love of hip hop and fascination with comics and storytelling.",
          ]}
        />
        <Paragraph
          title="all in time, with my slimes"
          body={[
            "Slimes will get access to future edition drops, airdrops, free mints and a network of collectors, builders and artists.",
            "slimes will receive a care package curated by scum. Sourced material, embroidered crewneck sweater, custom corduroy hat, custom designed journal/sketchbook and more secret goodies",
            "with the help of the community, slimes will become a unique family and space to curate and incubate new ideas. Together we will push the boundaries of what a web3 community can be, and how that can be used to create safety and inspiration for more artists to enter the space. ",
          ]}
        />
        <Paragraph
          title="the future is bright"
          body={[
            "slimes are just the beginning. The community will take a crucial role in where and how this project grows. It won't be a DAO but it will be democratic. 10k collection? That's on the table. Buy kids  art supplies, educate them about Axolotl preservation and then document them making giant murals in Mexico City? Already working on it.",
            "just remember; everybody eats.",
          ]}
        />
      </div>
    </div>
  );
};

export default AboutSection;
