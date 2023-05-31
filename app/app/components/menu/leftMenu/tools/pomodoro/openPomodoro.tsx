"use client";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { setOpenApp } from "@/app/redux/slice/appControl.slice";

const OpenNote = () => {
  const dispath = useAppDispatch();
  const appPomodoro = useAppSelector((state) => state.appControl.appPomodoro.isShow);
  const openNote = () => {
    dispath(setOpenApp({
      isShow: !appPomodoro,
      app: "appPomodoro",
    }));
  };

  return (
    <div onClick={openNote} className="mt-1 cursor-pointer relative group">
      <i className={`fi fi-sr-time-oclock mt-1 ${appPomodoro && 'text-gray-500'}`}></i>
      <div className="absolute bg-primaryLight text-white p-1 rounded-md group-hover:block hidden">
        <p className="text-xs">Pomodoro</p>
      </div>
    </div>
  );
};

export default OpenNote;
