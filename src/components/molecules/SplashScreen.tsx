import { FC, useCallback, useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ViewContext } from "@constants";
import debounce from "lodash.debounce";

interface Props {
  assets?: boolean[];
}

const SplashScreen: FC<Props> = (props: Props) => {
  const { assets = [] } = props;
  const { setShowView } = useContext(ViewContext);
  //splash screen animation
  const [showAnimation, setShowAnimation] = useState<boolean>(true); // shows/hides SplashScreen animation
  const animationDelay = 750;
  const animationTransition = 250;

  const debouncer = debounce(
    (value) => setShowAnimation(value),
    animationDelay
  );

  //checks if all assets are loaded
  const checkLoadStatus = useCallback(() => {
    const didLoad = assets.every((value) => value === true);
    debouncer(!didLoad);
  }, [assets, debouncer]);

  useEffect(() => {
    checkLoadStatus();
  }, [checkLoadStatus]);

  useEffect(() => {
    return () => {
      debouncer.cancel();
    };
  }, [debouncer]);

  useEffect(() => {
    setShowView(!showAnimation);
  }, [setShowView, showAnimation]);

  //stop page scroll (when modal or menu open)
  useEffect(() => {
    if (showAnimation) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [showAnimation]);

  return (
    <AnimatePresence mode="wait">
      {showAnimation && (
        <motion.div
          className={`backdrop-blur-xl ${
            showAnimation ? "fixed z-50 inset-0" : "hidden -z-50"
          }`}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: animationTransition / 1000,
            ease: "easeInOut",
          }}
        >
          {/*<div className="absolute left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2">
             <motion.div className="rounded" {...containerAnimation}>
              <ExpIcon color={"white"} />
            </motion.div> 
          </div>*/}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
