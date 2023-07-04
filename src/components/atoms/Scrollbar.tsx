import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const ScrollBar: FC<Props> = ({ children }) => {
  return <div className="scrollbar-container">{children}</div>;
};

export default ScrollBar;
