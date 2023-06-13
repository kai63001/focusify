import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { setOpenApp } from "@/app/redux/slice/appControl.slice";
import { setSelectMusic } from "@/app/redux/slice/music.slice";
import { motion } from "framer-motion";

const MainMusicInfo = () => {
  const dispatch = useAppDispatch();
  const { listMusic, musicPlaying } = useAppSelector((state) => state.music);

  const closeApp = () => {
    dispatch(setOpenApp({ app: "appMusicInfo", isShow: false }));
  };

  const selectMusicToPlay = (music: any) => {
    dispatch(setSelectMusic(music));
  };
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
      <div className="flex justify-between">
        <div className="px-5 pt-4 pb-2 items-center flex space-x-2">
          <i
            onClick={closeApp}
            className="fi fi-rr-horizontal-rule cursor-pointer"
          ></i>
        </div>
        <div className="w-full cursor-grab handle"></div>
        {/* <div className="px-5 pt-4 pb-2 items-center flex space-x-2"></div> */}
      </div>
      <div className="flex flex-col px-5 py-3">
        {listMusic.map((music, index) => (
          <div
            key={index}
            onClick={() => selectMusicToPlay(music.$id)}
            className={`flex items-center justify-between px-5 py-2 cursor-pointer rounded-md ${
              musicPlaying == music.$id ? "bg-primaryLight text-white" : ""
            }}`}
          >
            <div className="grid grid-cols-12 gap-2 items-center space-x-2 w-full">
              <div className="col-span-1">
                {musicPlaying == music.$id ? (
                  <i className="fi fi-sr-pause text-xl"></i>
                ) : (
                  <p className="text-2xl">{index + 1}</p>
                )}
              </div>
              <div className="flex flex-col col-span-10">
                <p
                  className={`font-bold text-lg ${
                    musicPlaying == music.$id
                      ? "text-red-500"
                      : "text-ellipsis overflow-hidden whitespace-nowrap"
                  }`}
                >
                  {music.name}
                </p>
                <span className="text-xs text-gray-400">{music.author}</span>
              </div>
              {/* calurate minute with second */}
              <div className="col-span-1 text-right">
                <p className="text-md">
                  {Math.floor(music.duration / 60)}:
                  {music.duration % 60 < 10
                    ? `0${music.duration % 60}`
                    : music.duration % 60}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default MainMusicInfo;
