"use client";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import dynamic from "next/dynamic";
import ToDoDetail from "./detail";
import { motion } from "framer-motion";
import { setAppTodoList } from "@/app/redux/slice/appControl.slice";
import DotBarDropDown from "./lib/dotBarDropdown";
import { useState } from "react";

const ToDoListSort = dynamic(() => import("./listSort"), {
  ssr: false,
});
const AddTask = dynamic(() => import("./addTask"), {
  ssr: false,
});

const TodoListMain = () => {
  const dispath = useAppDispatch();
  const selectedTask = useAppSelector((state) => state.task.selectedTask);
  const showOnTask = useAppSelector((state) => state.task.showOnTask);
  const [openDropdown, setOpenDropdown] = useState(false);
  const checkLogin = () => {
    const accountData = localStorage.getItem("accountData");
    if (accountData) {
      return false;
    }
    return true;
  };

  const closeTodoList = () => {
    dispath(setAppTodoList(false));
  };
  // if click task then show detail
  if (selectedTask != "") {
    return <ToDoDetail />;
  }
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
    >
      {checkLogin() && (
        <div className="opacity-0 hover:opacity-100 duration-300 absolute w-full h-full bg-black bg-opacity-25 backdrop-blur-lg rounded-md handle flex">
          <div className="m-auto">
            {/* need login first */}
            <p className="text-white text-center">
              Please login to use this feature
            </p>
          </div>
        </div>
      )}
      <div className="bg-primary border border-primaryLight rounded-md text-sm w-[450px]">
        <div className="flex justify-between">
          <div className="px-5 pt-4 pb-2 items-center flex space-x-2">
            <i
              onClick={closeTodoList}
              className="fi fi-rr-horizontal-rule cursor-pointer"
            ></i>
            {/* <i className="fi fi-bs-arrow-up-right-and-arrow-down-left-from-center cursor-pointer"></i> */}
          </div>
          <div className="w-full cursor-grab handle"></div>
          {/* ! not done yet */}
          {/* <div className="px-5 pt-4 pb-2 flex items-center space-x-2 relative select-none">
            <i
              onClick={() => setOpenDropdown(!openDropdown)}
              className="fi fi-br-menu-dots-vertical cursor-pointer"
            ></i>
            {openDropdown && <DotBarDropDown />}
          </div> */}
        </div>
        <div
          id="detail"
          className="px-5 py-2 overflow-scroll max-h-96 overflow-x-hidden no-scrollbar"
        >
          {showOnTask.showTodoList && (
            <>
              <p className="my-2">To-Do List</p>
              <ToDoListSort key="toDolist" />
              <AddTask />
            </>
          )}
          {showOnTask.showDoneList && (
            <>
              <p className="my-2">Done List</p>
              <ToDoListSort key="done" onTask={1} />
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TodoListMain;
