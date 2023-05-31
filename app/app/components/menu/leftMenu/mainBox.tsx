"use client";
import dynamic from "next/dynamic";

const OpenToDoList = dynamic(() => import("./tools/todo/openToDoList"), {
  ssr: false,
});
const OpenNote = dynamic(() => import("./tools/note/openNote"), {
  ssr: false,
});
const OpenPomodoro = dynamic(() => import("./tools/pomodoro/openPomodoro"), {
  ssr: false,
});

const MainBoxMenuList = () => {
  return (
    <div className="px-5 h-8 bg-primary bg-opacity-75 backdrop-blur-xl rounded-md flex justify-center items-center space-x-5">
      <OpenToDoList />
      <OpenNote />
      <OpenPomodoro />
    </div>
  );
};

export default MainBoxMenuList;
