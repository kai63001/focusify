import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { setOpenApp } from "@/app/redux/slice/appControl.slice";
import { motion } from "framer-motion";

const OpenMusicInfo = () => {
  const dispath = useAppDispatch();
  const appMusicInfo = useAppSelector(
    (state) => state.appControl.appMusicInfo.isShow
  );
  const openApp = () => {
    dispath(
      setOpenApp({
        isShow: !appMusicInfo,
        app: "appMusicInfo",
      })
    );
  };
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
        <i
          onClick={openApp}
          className={`fi fi-ss-music-alt cursor-pointer mt-1 ${
            appMusicInfo && "text-gray-500"
          }`}
        ></i>
      </motion.div>
    </>
  );
};

export default OpenMusicInfo;
