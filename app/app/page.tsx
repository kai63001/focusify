"use client";
import dynamic from "next/dynamic";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { setIndex, setPosition } from "../redux/slice/appControl.slice";
import PomodoroMain from "./components/pomodoro/main";

const Dragable = dynamic(() => import("./components/dragable"), {
  ssr: false,
});
const MainList = dynamic(() => import("./components/menu/mainList"), {
  ssr: false,
});
const TodoListMain = dynamic(() => import("./components/todoList/main"), {
  ssr: false,
});
const NoteMain = dynamic(() => import("./components/note/main"), {
  ssr: false,
});

const AppFocusPage = () => {
  const { appTodoList, appNote, appPomodoro } = useAppSelector((state) => state.appControl);
  const dispath = useAppDispatch();
  const onDragEnd = (e: any, app: any) => {
    e.preventDefault();
    const { x, y } = e.target.getBoundingClientRect();
    dispath(
      setPosition({
        position: {
          x: x,
          y: y,
        },
        app,
      })
    );
  };

  const onDragStart = (e: any, app: any) => {
    e.preventDefault();
    dispath(
      setIndex({
        app,
      })
    );
  };

  return (
    <div className="w-screen h-screen relative overflow-hidden">
      {/* right */}
      <MainList />
      {/* dragable */}
      <div className="w-screen h-screen">
        {appTodoList.isShow && (
          <Dragable
            id="appTodoList"
            x={appTodoList.position.x}
            y={appTodoList.position.y}
            index={appTodoList.index}
            onDragEnd={(e: any) => onDragEnd(e, "appTodoList")}
            onDragStart={(e: any) => onDragStart(e, "appTodoList")}
          >
            <TodoListMain />
          </Dragable>
        )}
        {appNote.isShow && (
          <Dragable
            id="appNote"
            x={appNote.position.x}
            y={appNote.position.y}
            index={appNote.index}
            onDragEnd={(e: any) => onDragEnd(e, "appNote")}
            onDragStart={(e: any) => onDragStart(e, "appNote")}
          >
            <NoteMain />
          </Dragable>
        )}
        {appPomodoro.isShow && (
          <Dragable
            id="appPomodoro"
            x={appPomodoro.position.x}
            y={appPomodoro.position.y}
            index={appPomodoro.index}
            onDragEnd={(e: any) => onDragEnd(e, "appPomodoro")}
            onDragStart={(e: any) => onDragStart(e, "appPomodoro")}
          >
            <PomodoroMain />
          </Dragable>
        )}
      </div>

      <div>
        <video
          className="w-full h-full object-cover absolute top-0 left-0 z-0"
          autoPlay
          loop
          muted
        >
          <source src="/bg2.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default AppFocusPage;
