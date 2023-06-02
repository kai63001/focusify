import { motion } from "framer-motion";

const OpenMusicInfo = () => {
  return (
    <>
      <motion.div
        initial={{ scale: 0.7 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.7 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        className="w-8 h-8 bg-primary bg-opacity-75 backdrop-blur-xl rounded-md flex justify-center items-center space-x-3"
      >
        <i className="fi fi-ss-music-alt cursor-pointer mt-1"></i>
      </motion.div>
    </>
  );
};

export default OpenMusicInfo;
