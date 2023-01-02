import { FC, ReactNode } from "react";
import { PageHead, Header, Footer } from "@components";
import { motion } from "framer-motion";
import { enterAnimation } from "@constants";

interface Props {
  children: ReactNode;
}

const PageLayout: FC<Props> = (props: Props) => {
  const { children } = props;
  return (
    <motion.div
      className="flex flex-col justify-between min-h-screen transition-colors ease-in-out duration-500 bg-dark"
      {...enterAnimation}
    >
      <PageHead title="My Slimes" description="Welcome to My Slimes" />

      <Header />
      <main className="flex flex-col flex-grow justify-start items-center pt-14 pb-28">
        {children}
      </main>

      {/* <Footer /> */}
    </motion.div>
  );
};
export default PageLayout;
