import { motion } from "framer-motion";

const MainMusicInfo = () => {
  return (
    <motion.div
      initial={{ scale: 0.7 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0.7 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      className="bg-primary bg-opacity-95 backdrop-blur-lg border border-primaryLight rounded-md text-sm w-[450px]"
    >
      asd
    </motion.div>
  );
};

export default MainMusicInfo;
