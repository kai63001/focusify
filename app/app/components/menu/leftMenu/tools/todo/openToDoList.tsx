"use client";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { setOpenApp } from "@/app/redux/slice/appControl.slice";

const OpenToDoList = () => {
  const dispath = useAppDispatch();
  const appToDoList = useAppSelector((state) => state.appControl.appTodoList.isShow);
  const openToDoList = () => {
    dispath(setOpenApp({
      isShow: !appToDoList,
      app: "appTodoList",
    }));
  };

  return (
    <div onClick={openToDoList} className="mt-1 cursor-pointer">
      <i className={`fi fi-sr-note mt-1 ${appToDoList && "text-gray-500"}`}></i>
    </div>
  );
};

export default OpenToDoList;
