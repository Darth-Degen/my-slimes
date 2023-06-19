import { motion } from "framer-motion";

interface CountdownItemProps {
  value: number;
}

const CountdownItem: React.FC<CountdownItemProps> = (
  props: CountdownItemProps
) => {
  const { value } = props;
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 150 }}
    >
      <div className="">{value > 0 ? value : 0}</div>
    </motion.div>
  );
};

export default CountdownItem;
