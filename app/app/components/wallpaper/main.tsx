"use client";
import useAppwrite from "@/app/hook/appwrite";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import {
  setMyWallpaper,
  setWallpaper,
} from "@/app/redux/slice/wallpaper.slice";
import { DatabaseId, CollectionId } from "@/libs/database";
import Image from "next/image";
import { useEffect } from "react";

const WallpaperMain = () => {
  const dispatch = useAppDispatch();
  const { databases } = useAppwrite();
  const { wallpaperUrl, type } = useAppSelector((state) => state.wallpaper);

  const disableEvent = (e: any) => {
    e.preventDefault();
  };

  //useEffect to get my wallpaper
  useEffect(() => {
    if (!databases) return;
    const result: any = databases?.listDocuments(
      DatabaseId.focusifyApp,
      CollectionId.appWallpaper
    );
    result
      .then(function (response: any) {
        console.log("wallpaper", response);
        if (response.documents.length > 0) {
          dispatch(
            setMyWallpaper({
              id: response.documents[0].$id,
              url: response.documents[0].url,
              type: response.documents[0].type,
            })
          );
          dispatch(
            setWallpaper({
              url: response.documents[0].url,
              type: response.documents[0].type,
            })
          );
        }
      })
      .catch(function (error: any) {
        console.log(error);
      });
  }, [databases, dispatch]);

  if (wallpaperUrl && type == "wallpaper") {
    return (
      <div className="w-full h-full absolute top-0 left-0 z-0">
        <Image
          onDragStart={disableEvent}
          className="object-cover"
          src={wallpaperUrl}
          alt="wallpaper"
          fill
        />
      </div>
    );
  }
  if (wallpaperUrl && type == "live") {
    return (
      <div>
        <video
          key={wallpaperUrl}
          className="w-full h-full object-cover absolute top-0 left-0 z-0"
          autoPlay
          loop
          muted
        >
          <source src={wallpaperUrl} type="video/mp4" />
        </video>
      </div>
    );
  }
  return (
    <div>
      <video
        key="main"
        className="w-full h-full object-cover absolute top-0 left-0 z-0"
        autoPlay
        loop
        muted
      >
        <source src={"/bg2.mp4"} type="video/mp4" />
      </video>
    </div>
  );
};

export default WallpaperMain;
