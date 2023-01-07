import { FC } from "react";
import { Paragraph } from "@components";

const AboutSection: FC = () => {
  return (
    <div className="flex flex-col gap-20 justify-center md:max-w-[780px] md:px-10 lg:px-0">
      <Paragraph
        title="my slimes"
        body={[
          "Slimes are the squad. A love letter to Xicano aesthetics, the southwest and healthy dose of absurdity. Born from a desire to create a tribe, rather than join one. ",
          "Slimes were designed to appeal to the inner child. The kid trapped inside. Brave and adventurous. Slimes all wear the warrior mask. Slimes are the beginning.",
        ]}
      />
      <Paragraph
        title="the future"
        body={[
          "The community will play a crucial role in where and how this project grows. It might not be a DAO, but it WILL be democratic. 10k collection? That's on the table. Buy art supplies for kids, coordinate education about Axolotl preservation and then document them making murals in Mexico City? working on it.",
          "just remember; everybody eats.",
        ]}
      />
      <Paragraph
        title="all in time"
        body={[
          "with the help of my slimes, we will become a space to champion and incubate new ideas. together we will push the boundaries of what a web3 community can be, and how they can be leveraged to build a brand.",
          "Slimes will have access to future edition drops, free airdrops, free mints as well as a network of collectors, builders and artists.",
          "upon joining, slimes will be receiving a care package curated by scum; embroidered crewneck sweater, hat, custom designed journal/sketchbook and more secret goodies.",
        ]}
      />
    </div>
  );
};

export default AboutSection;
