"use client";

import useAppwrite from "@/app/hook/appwrite";
import { CollectionId, DatabaseId } from "@/libs/database";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import {
  setMyWallpaper,
  setWallpaper,
} from "@/app/redux/slice/wallpaper.slice";
import { ID, Query } from "appwrite";
import { useAlert } from "@/app/hook/AlertContext";

const ListWallpaper = ({ type = "wallpaper" }: { type?: string }) => {
  const { toastAlert, closeAlert }: any = useAlert();
  const dispatch = useAppDispatch();
  const { databases } = useAppwrite();
  const [listWallpaper, setListWallpaper] = useState<any[]>([]);
  const [selectedWallpaper, setSelectedWallpaper] = useState<any>(null);
  const { myWallpaper } = useAppSelector((state) => state.wallpaper);

  const handleSelectWallpaper = (wallpaper: any) => {
    setSelectedWallpaper(wallpaper.$id);
    dispatch(setWallpaper({ url: wallpaper.url, type: wallpaper.type }));
  };

  const handleSaveWallpaper = () => {
    if (!databases) return;
    if (myWallpaper.id) {
      handleUpdateMyWallpaper();
    } else {
      handleInsertWallpaper();
    }
  };

  const handleInsertWallpaper = () => {
    if (!databases) return;
    //upsert
    const result = databases.createDocument(
      DatabaseId.focusifyApp,
      CollectionId.appWallpaper,
      ID.unique(),
      {
        url: listWallpaper.find(
          (wallpaper) => wallpaper.$id == selectedWallpaper
        ).url,
        type: listWallpaper.find(
          (wallpaper) => wallpaper.$id == selectedWallpaper
        ).type,
      }
    );
    result
      .then(function (response: any) {
        console.log(response);
        dispatch(
          setMyWallpaper({
            id: response.$id,
            url: response.url,
            type: response.type,
          })
        );
        setSelectedWallpaper(null);
        toastAlert("Update wallpaper success");
        setTimeout(() => {
          closeAlert();
        }, 1000);
      })
      .catch(function (error: any) {
        console.log(error);
      });
  };
  const handleUpdateMyWallpaper = () => {
    if (!databases) return;
    //upsert
    const result = databases.updateDocument(
      DatabaseId.focusifyApp,
      CollectionId.appWallpaper,
      myWallpaper.id,
      {
        url: listWallpaper.find(
          (wallpaper) => wallpaper.$id == selectedWallpaper
        ).url,
        type: listWallpaper.find(
          (wallpaper) => wallpaper.$id == selectedWallpaper
        ).type,
      }
    );
    result
      .then(function (response: any) {
        console.log(response);
        setSelectedWallpaper(null);
        toastAlert("Update wallpaper success");
        setTimeout(() => {
          closeAlert();
        }, 1000);
      })
      .catch(function (error: any) {
        console.log(error);
      });
  };

  //useEffect to get list wallpaper
  useEffect(() => {
    if (!databases) return;
    const result: any = databases?.listDocuments(
      DatabaseId.appController,
      CollectionId.wallpaper,
      [Query.equal("type", type)]
    );
    result
      .then(function (response: any) {
        setListWallpaper(response.documents);
      })
      .catch(function (error: any) {
        console.log(error);
      });
  }, [databases, type]);

  return (
    <div className="list-wallpaper relative h-full">
      <div className="grid grid-cols-2 gap-4 overflow-scroll no-scrollbar h-[430px]">
        {listWallpaper.map((wallpaper) => (
          <div
            className={`${
              wallpaper.$id == selectedWallpaper
                ? "border-2 border-red-500"
                : ""
            } relative h-44 rounded-md cursor-pointer bg-primaryDark2 group`}
            key={wallpaper.$id}
          >
            <div className="group-hover:backdrop-blur-sm w-full h-full rounded-md absolute z-50 group-hover:flex duration-300 hidden">
              <div className="m-auto">
                <div
                  onClick={() => handleSelectWallpaper(wallpaper)}
                  className="border-2 rounded-md px-3 py-2 hover:bg-white border-white hover:text-black duration-300"
                >
                  Use this Wallpaper
                </div>
              </div>
            </div>
            <Image
              className="rounded-md"
              sizes="50vw, 33vw"
              src={wallpaper.cover}
              alt={`wallpaper ${wallpaper.name}`}
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        ))}
        <div className="block w-full h-32"></div>
      </div>
      {selectedWallpaper && (
        <div className="absolute bottom-0 right-0">
          <button
            onClick={handleSaveWallpaper}
            className="px-3 py-2 rounded-md bg-red-500"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default ListWallpaper;
