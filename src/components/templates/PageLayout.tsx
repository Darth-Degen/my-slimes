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
    <motion.div className="flex flex-col min-h-screen " {...enterAnimation}>
      <PageHead title="My Slimes" description="Welcome to My Slimes" />

      <Header />
      <main className="flex flex-col justify-start items-center h-full z-0 ">
        {children}
      </main>

      {/* <Footer /> */}
    </motion.div>
  );
};
export default PageLayout;
