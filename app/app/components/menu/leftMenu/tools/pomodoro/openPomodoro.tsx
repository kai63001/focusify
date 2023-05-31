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
    <div onClick={openNote} className="mt-1 cursor-pointer">
      <i className={`fi fi-sr-time-oclock mt-1 ${appPomodoro && 'text-gray-500'}`}></i>
    </div>
  );
};

export default OpenNote;
