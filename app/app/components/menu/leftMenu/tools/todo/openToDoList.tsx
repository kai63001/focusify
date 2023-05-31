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
    <div onClick={openToDoList} className="mt-1 cursor-pointer relative group">
      <i className={`fi fi-sr-note mt-1 ${appToDoList && "text-gray-500"}`}></i>
      <div className="absolute bg-primaryLight text-white p-1 rounded-md group-hover:block hidden">
        <p className="text-xs whitespace-nowrap">Todo List</p>
      </div>
    </div>
  );
};

export default OpenToDoList;
