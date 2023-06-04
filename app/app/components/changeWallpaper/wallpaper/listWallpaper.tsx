"use client";

import useAppwrite from "@/app/hook/appwrite";
import { CollectionId, DatabaseId } from "@/libs/database";
import { useEffect, useState } from "react";
import Image from "next/image";

const ListWallpaper = () => {
  const { databases } = useAppwrite();
  const [listWallpaper, setListWallpaper] = useState<any[]>([]);
  const [selectedWallpaper, setSelectedWallpaper] = useState<any>(null);

  const handleSelectWallpaper = (wallpaper: any) => {
    setSelectedWallpaper(wallpaper);
  };

  //useEffect to get list wallpaper
  useEffect(() => {
    if (!databases) return;
    const result: any = databases?.listDocuments(
      DatabaseId.appController,
      CollectionId.wallpaper
    );
    result
      .then(function (response: any) {
        setListWallpaper(response.documents);
      })
      .catch(function (error: any) {
        console.log(error);
      });
  }, [databases]);

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
                  onClick={() => handleSelectWallpaper(wallpaper.$id)}
                  className="border-2 rounded-md px-3 py-2 hover:bg-white border-white hover:text-black duration-300"
                >
                  Use this Wallpaper
                </div>
              </div>
            </div>
            <Image
              className="rounded-md"
              src={wallpaper.url}
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
          <button className="px-3 py-2 rounded-md bg-red-500">Save</button>
        </div>
      )}
    </div>
  );
};

export default ListWallpaper;
