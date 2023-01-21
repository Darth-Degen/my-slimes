import Image from "next/image";
import { exitAnimation } from "@constants";
import { LogoText } from "@components";
import { motion } from "framer-motion";
import { FC, useState } from "react";

//assets
import bg from "public/images/slimes-gang.png";
import bgMobile from "public/images/landing-slimes-sm.png";

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
      key="landing-page"
      className="flex flex-col-reverse lg:flex-col justify-center items-center h-[90vh]"
      {...exitAnimation}
    >
      {/* slimes logo */}
      <motion.div
        className=""
        key="page-load-animation"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
      >
        <div className="absolute left-1/2 -bottom-10 lg:bottom-auto lg:top-[27%] transform -translate-y-1/2 -translate-x-1/2">
          <LogoText showAnimation={!showPage} />
        </div>
      </motion.div>

      {/* desktop image */}
      <motion.div
        className="hidden lg:block fixed -bottom-0.5"
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

      {/* mobile image */}
      <motion.div className="lg:hidden mb-10" {...showAnimation}>
        <Image
          src={bgMobile.src}
          height={374}
          width={350}
          alt="My Slimes Mobile"
        />
      </motion.div>
    </motion.div>
  );
};

export default LandingPage;
