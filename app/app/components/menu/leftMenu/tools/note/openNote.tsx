"use client";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { setAppNote } from "@/app/redux/slice/appControl.slice";

const OpenNote = () => {
  const dispath = useAppDispatch();
  const appNote = useAppSelector((state) => state.appControl.appNote);
  const openNote = () => {
    dispath(setAppNote(!appNote));
  };

  return (
    <div onClick={openNote} className="mt-1 cursor-pointer">
      <i className={`fi fi-ss-notes mt-1 ${appNote && 'text-gray-500'}`}></i>
    </div>
  );
};

export default OpenNote;
