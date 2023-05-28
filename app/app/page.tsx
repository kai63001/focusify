"use client";
import dynamic from "next/dynamic";
import { useAppSelector } from "../redux/hook";

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
  const { appTodoList, appNote } = useAppSelector((state) => state.appControl);
  return (
    <div className="w-screen h-screen relative overflow-hidden">
      {/* right */}
      <MainList />
      {/* dragable */}
      <div className="w-screen h-screen">
        {appTodoList && (
          <Dragable>
            <TodoListMain />
          </Dragable>
        )}
        {appNote && (
          <Dragable>
            <NoteMain />
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
