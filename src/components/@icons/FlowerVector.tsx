import { FC, SVGProps } from "react";
import { enterAnimation } from "@constants";
import { motion } from "framer-motion";

interface Props extends SVGProps<SVGSVGElement> {}

const FlowerVector: FC<Props> = (props: Props) => {
  const { className } = props;
  return (
    <motion.svg
      width="2304"
      height="2230"
      viewBox="0 0 2304 2230"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...enterAnimation}
      key="exp-logo"
      className={className}
    >
      <path
        d="M832.126 0.2265L0 0.226465L-3.63789e-05 805.414C-4.3566e-05 964.488 133.966 1094.12 298.362 1094.12L298.362 1135.41C133.966 1135.41 -5.7145e-05 1265.04 -6.43321e-05 1424.11L-0.000100711 2229.3L832.126 2229.3C996.523 2229.3 1130.49 2099.67 1130.49 1940.6L1173.16 1940.6C1173.16 2099.67 1307.13 2229.3 1471.52 2229.3L2304 2229.3L2304 1424.11C2304 1265.04 2170.03 1135.41 2005.64 1135.41L2005.64 1094.12C2170.03 1094.12 2304 964.489 2304 805.414L2304 0.226562L1471.87 0.226527C1307.48 0.22652 1173.51 129.855 1173.51 288.93L1130.84 288.93C1130.84 129.855 996.873 0.226507 832.476 0.2265L832.126 0.2265ZM1325.67 1115.1C1325.67 1207.84 1247.66 1283.31 1151.83 1283.31C1055.99 1283.31 977.985 1207.84 977.985 1115.1C977.985 1022.36 1055.99 946.889 1151.83 946.889C1247.66 946.889 1325.67 1022.36 1325.67 1115.1Z"
        fill="#FFB094"
      />
    </motion.svg>
  );
};

export default FlowerVector;
