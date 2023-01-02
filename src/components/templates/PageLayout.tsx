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
      <PageHead
        title="Hot Heads"
        description="Welcome to your Hot Heads asset portfolio"
      />

      <main className="min-h-screen">
        <Header />
        <div className="flex flex-col flex-grow justify-start items-center pt-14 pb-28">
          {children}
        </div>
      </main>

      <Footer />
    </motion.div>
  );
};
export default PageLayout;
