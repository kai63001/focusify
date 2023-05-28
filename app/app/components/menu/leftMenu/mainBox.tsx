"use client";
import dynamic from "next/dynamic";
import OpenNote from "./tools/note/openNote";

const OpenToDoList = dynamic(() => import("./tools/todo/openToDoList"), {
  ssr: false,
});

const MainBoxMenuList = () => {
  return (
    <div className="px-5 h-8 bg-primary bg-opacity-75 backdrop-blur-xl rounded-md flex justify-center items-center space-x-5">
      <OpenToDoList />
      <OpenNote />
    </div>
  );
};

export default MainBoxMenuList;
