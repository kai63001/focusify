"use client";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { setOpenApp } from "@/app/redux/slice/appControl.slice";

const OpenYoutube = () => {
  const dispath = useAppDispatch();
  const appYoutube = useAppSelector((state) => state.appControl.appYoutube.isShow);
  const openYoutube = () => {
    dispath(setOpenApp({
      isShow: !appYoutube,
      app: "appYoutube",
    }));
  };

  return (
    <div onClick={openYoutube} className="mt-1 cursor-pointer relative group">
      <i className={`fi fi-brands-youtube mt-1 ${appYoutube && "text-gray-500"}`}></i>
      <div className="absolute bg-primaryLight text-white p-1 rounded-md group-hover:block hidden">
        <p className="text-xs whitespace-nowrap">Youtube</p>
      </div>
    </div>
  );
};

export default OpenYoutube;
