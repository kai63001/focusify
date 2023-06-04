import { useAppDispatch } from "@/app/redux/hook";
import { setOpenApp } from "@/app/redux/slice/appControl.slice";
import { motion } from "framer-motion";
import { useState } from "react";
import ListWallpaper from "./wallpaper/listWallpaper";

enum WallpaperType {
  wallpaper = "wallpaper",
  liveWallpaper = "liveWallpaper",
  custom = "custom",
}

const ChangeWallpaper = () => {
  const dispatch = useAppDispatch();
  const [selectTab, setSelectTab] = useState<WallpaperType>(
    WallpaperType.wallpaper
  ); // ["wallpaper", "liveWallpaper", "custom"]
  const closeApp = () => {
    dispatch(setOpenApp({ app: "appChangeWallpaper", isShow: false }));
  };
  const listTab = [
    {
      name: "Wallpaper",
      type: WallpaperType.wallpaper,
    },
    {
      name: "Live Wallpaper",
      type: WallpaperType.liveWallpaper,
    },
    {
      name: "Custom",
      type: WallpaperType.custom,
    },
  ];

  const renderTab = () => {
    switch (selectTab) {
      case WallpaperType.wallpaper:
        return <ListWallpaper />;
      case WallpaperType.liveWallpaper:
        return <ListWallpaper type="live" />;
      default:
        return <ListWallpaper />;
    }
  };

  const checkLogin = () => {
    const accountData = localStorage.getItem("accountData");
    if (accountData) {
      return false;
    }
    return true;
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
      className="bg-primary bg-opacity-95 backdrop-blur-lg border border-primaryLight rounded-md text-sm w-[850px] h-[500px]"
    >
      {/* !check login frist for this feature */}
      {checkLogin() && (
        <div className="opacity-0 hover:opacity-100 duration-300 z-20 absolute w-full h-full bg-black bg-opacity-25 backdrop-blur-sm rounded-md handle flex">
          <div className="m-auto">
            {/* need login first */}
            <p className="text-white text-center">
              Please login to use this feature
            </p>
          </div>
        </div>
      )}
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
      <div className="flex space-x-3 px-3 py-2">
        <div className="w-3/12">
          <div className="flex flex-col space-y-2">
            {listTab.map((item: any, index: any) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    setSelectTab(item.type);
                  }}
                  className={`px-4 py-2 w-full ${
                    selectTab == item.type ? "bg-red-500" : "hover:bg-red-800"
                  } duration-300  rounded-md cursor-pointer`}
                >
                  {item.name}
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-9/12">{renderTab()}</div>
      </div>
    </motion.div>
  );
};

export default ChangeWallpaper;
