import Image from "next/image";
import { exitAnimation } from "@constants";
import { LogoText } from "@components";
import { motion } from "framer-motion";

//assets
import bg from "public/images/landing-slimes-lg-1.png";
import bgMobile from "public/images/landing-slimes-sm.png";
import { FC, useState } from "react";

interface Props {
  showPage: boolean;
}
const LandingPage: FC<Props> = (props: Props) => {
  const { showPage } = props;
  const [loadingComplete, setLoadingComplete] = useState<boolean>(false);

  const showAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: showPage ? 1 : 0 },
    transition: { duration: 0.7, ease: "easeInOut" },
  };

  return (
    <motion.div
      className="flex flex-col-reverse lg:flex-col justify-center items-center bg-custom-primary"
      {...exitAnimation}
      key="landing-page"
    >
      <motion.div
        className="z-50"
        key="page-load-animation"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
      >
        <div className="absolute left-1/2 bottom-[3%] lg:bottom-auto lg:top-[27%] transform -translate-y-1/2 -translate-x-1/2">
          <LogoText showAnimation={!showPage} />
        </div>
      </motion.div>

      <motion.div
        className="hidden lg:block px-0 z-0 absolute bottom-0"
        {...showAnimation}
      >
        <Image
          src={bg.src}
          height={766}
          width={2371}
          alt="My Slimes Banner"
          onLoadingComplete={() => setLoadingComplete(true)}
        />
      </motion.div>

      <motion.div className="lg:hidden px-0 z-0 pt-6 " {...showAnimation}>
        <Image
          src={bgMobile.src}
          height={352.5}
          width={440.5}
          alt="My Slimes Mobile"
        />
      </motion.div>
    </motion.div>
  );
};

export default LandingPage;
