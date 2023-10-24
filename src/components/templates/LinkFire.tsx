import { Dispatch, FC, SetStateAction } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MobileLink, SlimesHubFooter } from "@components";
import { slideUp } from "src/constants";

interface Props {
  showLoop: boolean;
  setAssets: Dispatch<SetStateAction<boolean[]>>;
}

const LinkFire: FC<Props> = ({ showLoop, setAssets }) => {
  const slideUpAnimation = slideUp(true, 150, 1.3, 0);
  return (
    <>
      <motion.div
        {...slideUpAnimation}
        className="md:mt-0 md:mx-10 pb-40 lg:mx-[10%] xl:mx-[20%]"
      >
        <div className="w-full grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 px-5 pb-10 items-center">
          <div className="col-span-2 lg:hidden w-full h-full overflow-hidden rounded-xl flex justify-center self-center">
            <MobileLink
              setAssets={setAssets}
              href="https://allintime.xyz/"
              image={`${process.env.cloudflareStorage}/images/linkfire/mint.png`}
              width={4008 / 3.61}
              height={1002 / 3.61}
              alt="slimes family gallery link"
              index={6}
              // isInternal
            />
          </div>
          <div className="col-span-1 w-full h-full overflow-hidden rounded-xl">
            <MobileLink
              setAssets={setAssets}
              href="https://exchange.art/series/Slimes/nfts"
              image={`${process.env.cloudflareStorage}/images/linkfire/slimes_secondary.png`}
              width={1952 / 4}
              height={1164 / 4}
              alt="slimes secondary marketplace link"
              index={0}
            />
          </div>
          <div className="col-span-1 w-full h-full overflow-hidden rounded-xl">
            <MobileLink
              setAssets={setAssets}
              href="https://exchange.art/series/Slimes%20Family%20Collection/nfts"
              image={`${process.env.cloudflareStorage}/images/linkfire/sfc_secondary.png`}
              width={1952 / 4}
              height={1164 / 4}
              alt="sfc secondary marketplace link"
              index={1}
            />
          </div>
          <div className="col-span-1 w-full h-full overflow-hidden rounded-xl">
            <MobileLink
              setAssets={setAssets}
              href="https://twitter.com/myslimes_"
              image={`${process.env.cloudflareStorage}/images/linkfire/slimes_twitter.png`}
              width={1952 / 4}
              height={1164 / 4}
              alt="slimes twitter link"
              index={2}
            />
          </div>
          <div className="col-span-1 w-full h-full overflow-hidden rounded-xl">
            <MobileLink
              setAssets={setAssets}
              href="https://twitter.com/scumsol"
              image={`${process.env.cloudflareStorage}/images/linkfire/scum_twitter.png`}
              width={1952 / 4}
              height={1164 / 4}
              alt="scum twitter link"
              index={3}
            />
          </div>
          <div className="col-span-1 w-full h-full overflow-hidden rounded-xl">
            <MobileLink
              setAssets={setAssets}
              href="https://discord.gg/scumsol"
              image={`${process.env.cloudflareStorage}/images/linkfire/scum_discord.png`}
              width={1952 / 4}
              height={1164 / 4}
              alt="scum discord link"
              index={4}
            />
          </div>
          <div className="col-span-1 w-full h-full overflow-hidden rounded-xl">
            <MobileLink
              setAssets={setAssets}
              href="https://allintime.xyz/"
              image={`${process.env.cloudflareStorage}/images/linkfire/allintime.png`}
              width={1952 / 4}
              height={1164 / 4}
              alt="all in time link"
              index={5}
            />
          </div>
          <div className="col-span-2 lg:col-span-3 w-full h-full overflow-hidden rounded-xl flex justify-center self-center">
            <MobileLink
              setAssets={setAssets}
              href="https://aether.so/space/Slimes"
              image={`${process.env.cloudflareStorage}/images/linkfire/slimes_family_gallery.png`}
              width={4008 / 3}
              height={1002 / 3}
              alt="slimes family gallery link"
              index={6}
            />
          </div>
        </div>
      </motion.div>
      <SlimesHubFooter color="#FFB094" />
    </>
  );
};

export default LinkFire;
