"use client";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { setOpenApp } from "@/app/redux/slice/appControl.slice";

const OpenNote = () => {
  const dispath = useAppDispatch();
  const appNote = useAppSelector((state) => state.appControl.appNote.isShow);
  const openNote = () => {
    dispath(
      setOpenApp({
        isShow: !appNote,
        app: "appNote",
      })
    );
  };

  return (
    <div onClick={openNote} className="mt-1 cursor-pointer relative group">
      <i className={`fi fi-ss-notes mt-1 ${appNote && "text-gray-500"}`}></i>
      <div className="absolute bg-primaryLight text-white p-1 rounded-md group-hover:block hidden">
        <p className="text-xs">Note</p>
      </div>
    </div>
  );
};

export default OpenNote;
