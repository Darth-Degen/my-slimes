import { Dispatch, FC, SetStateAction } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MobileLink } from "@components";
import { slideUp } from "src/constants";

interface Props {
  showLoop: boolean;
  setAssets: Dispatch<SetStateAction<boolean[]>>;
}

const LinkFire: FC<Props> = ({ showLoop, setAssets }) => {
  const slideUpAnimation = slideUp(true, 150, 1.3, 0);
  return (
    <AnimatePresence mode="wait">
      {showLoop && (
        <motion.div {...slideUpAnimation} className="-mt-12">
          <div className="w-full grid grid-cols-2 gap-2 px-5 pt-20 pb-10">
            <div className="col-span-1 w-full h-full overflow-hidden rounded-xl">
              <MobileLink
                setAssets={setAssets}
                href="https://exchange.art/series/Slimes/nfts"
                image="/images/linkfire/slimes_secondary.png"
                width={191}
                height={141}
                alt="slimes secondary marketplace link"
                index={0}
              />
            </div>
            <div className="col-span-1 w-full h-full overflow-hidden rounded-xl">
              <MobileLink
                setAssets={setAssets}
                href="https://exchange.art/series/Slimes%20Family%20Collection/nfts"
                image="/images/linkfire/sfc_secondary.png"
                width={191}
                height={141}
                alt="sfc secondary marketplace link"
                index={1}
              />
            </div>
            <div className="col-span-1 w-full h-full overflow-hidden rounded-xl">
              <MobileLink
                setAssets={setAssets}
                href="https://twitter.com/myslimes_"
                image="/images/linkfire/slimes_twitter.png"
                width={191}
                height={141}
                alt="slimes twitter link"
                index={2}
              />
            </div>
            <div className="col-span-1 w-full h-full overflow-hidden rounded-xl">
              <MobileLink
                setAssets={setAssets}
                href="https://twitter.com/scumsol"
                image="/images/linkfire/scum_twitter.png"
                width={191}
                height={141}
                alt="scum twitter link"
                index={3}
              />
            </div>
            <div className="col-span-1 w-full h-full overflow-hidden rounded-xl">
              <MobileLink
                setAssets={setAssets}
                href="https://discord.gg/scumsol"
                image="/images/linkfire/scum_discord.png"
                width={191}
                height={141}
                alt="scum discord link"
                index={4}
              />
            </div>
            <div className="col-span-1 w-full h-full overflow-hidden rounded-xl">
              <MobileLink
                setAssets={setAssets}
                href="https://allintime.xyz/"
                image="/images/linkfire/allintime.png"
                width={191}
                height={141}
                alt="all in time link"
                index={5}
              />
            </div>
            <div className="col-span-2 w-full h-full overflow-hidden rounded-xl">
              <MobileLink
                setAssets={setAssets}
                href="https://aether.so/space/Slimes"
                image="/images/linkfire/slimes_family_gallery.png"
                width={392}
                height={98}
                alt="slimes family gallery link"
                index={6}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LinkFire;
