"use client";
import dynamic from "next/dynamic";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { setIndex, setPosition } from "@/app/redux/slice/appControl.slice";
import LoadingWidget from "./LoadingWidget";

const Dragable = dynamic(() => import("../components/dragable"), {
  ssr: false,
  loading: LoadingWidget,
});
const TodoListMain = dynamic(() => import("../components/todoList/main"), {
  ssr: false,
  loading: LoadingWidget,
});
const NoteMain = dynamic(() => import("../components/note/main"), {
  ssr: false,
  loading: LoadingWidget,
});
const PomodoroMain = dynamic(() => import("../components/pomodoro/main"), {
  ssr: false,
  loading: LoadingWidget,
});
const YoutubeMain = dynamic(() => import("../components/youtube/main"), {
  ssr: false,
  loading: LoadingWidget,
});
const MusicInfoMain = dynamic(() => import("../components/musicInfo/main"), {
  ssr: false,
  loading: LoadingWidget,
});
const ChangeWallpaperMain = dynamic(
  () => import("../components/changeWallpaper/main"),
  {
    ssr: false,
    loading: LoadingWidget,
  }
);

const ControlComponents = () => {
  const {
    appTodoList,
    appNote,
    appPomodoro,
    appYoutube,
    appMusicInfo,
    appChangeWallpaper,
  } = useAppSelector((state) => state.appControl);
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
    <div className="w-screen h-screen relative">
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
      {appYoutube.isShow && (
        <Dragable
          id="appYoutube"
          x={appYoutube.position.x}
          y={appYoutube.position.y}
          index={appYoutube.index}
          onDragEnd={(e: any) => onDragEnd(e, "appYoutube")}
          onDragStart={(e: any) => onDragStart(e, "appYoutube")}
        >
          <YoutubeMain />
        </Dragable>
      )}
      {appMusicInfo.isShow && (
        <Dragable
          id="appMusicInfo"
          x={appMusicInfo.position.x}
          y={appMusicInfo.position.y}
          index={appMusicInfo.index}
          onDragEnd={(e: any) => onDragEnd(e, "appMusicInfo")}
          onDragStart={(e: any) => onDragStart(e, "appMusicInfo")}
        >
          <MusicInfoMain />
        </Dragable>
      )}
      {appChangeWallpaper.isShow && (
        <Dragable
          id="appChangeWallpaper"
          x={appChangeWallpaper.position.x}
          y={appChangeWallpaper.position.y}
          index={appChangeWallpaper.index}
          onDragEnd={(e: any) => onDragEnd(e, "appChangeWallpaper")}
          onDragStart={(e: any) => onDragStart(e, "appChangeWallpaper")}
        >
          <ChangeWallpaperMain />
        </Dragable>
      )}
    </div>
  );
};

export default ControlComponents;
