import { FC } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MobileLink } from "@components";
import { slideUp } from "src/constants";

interface Props {
  showLoop: boolean;
}

const LinkFire: FC<Props> = ({ showLoop }) => {
  const slideUpAnimation = slideUp(true, 150, 1.3, 0);
  return (
    <AnimatePresence mode="wait">
      {showLoop && (
        <motion.div {...slideUpAnimation}>
          <div className="w-full grid grid-cols-2 gap-2 px-5 pb-10">
            <MobileLink
              href="https://www.youtube.com/watch?v=1qN72LEQnaU"
              image="/images/linkfire/slimes_secondary.png"
              width={191}
              height={141}
              alt="slimes secondary marketplace link"
              span={1}
            />
            <MobileLink
              href="https://www.youtube.com/watch?v=1qN72LEQnaU"
              image="/images/linkfire/sfc_secondary.png"
              width={191}
              height={141}
              alt="sfc secondary marketplace link"
              span={1}
            />
            <MobileLink
              href="https://www.youtube.com/watch?v=1qN72LEQnaU"
              image="/images/linkfire/slimes_twitter.png"
              width={191}
              height={141}
              alt="slimes twitter link"
              span={1}
            />
            <MobileLink
              href="https://www.youtube.com/watch?v=1qN72LEQnaU"
              image="/images/linkfire/scum_twitter.png"
              width={191}
              height={141}
              alt="scum twitter link"
              span={1}
            />
            <MobileLink
              href="https://www.youtube.com/watch?v=1qN72LEQnaU"
              image="/images/linkfire/scum_discord.png"
              width={191}
              height={141}
              alt="scum discord link"
              span={1}
            />
            <MobileLink
              href="https://www.youtube.com/watch?v=1qN72LEQnaU"
              image="/images/linkfire/allintime.png"
              width={191}
              height={141}
              alt="all in time link"
              span={1}
            />
            <MobileLink
              href="https://www.youtube.com/watch?v=1qN72LEQnaU"
              image="/images/linkfire/slimes_family_gallery.png"
              width={392}
              height={98}
              alt="slimes family gallery link"
              span={2}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LinkFire;
