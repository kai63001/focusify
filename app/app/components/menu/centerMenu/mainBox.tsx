"use client";

import dynamic from "next/dynamic";
const MainMusicBox = dynamic(() => import("./musicBox.tsx/mainMusicBox"), {
  ssr: false,
});

const MainAmbientBox = dynamic(() => import("./ambientBox/mainAmbientBox"), {
  ssr: false,
});

const MainBoxCenter = () => {
  return (
    <div className="flex justify-center items-center space-x-5">
      <MainMusicBox />
      <MainAmbientBox />
    </div>
  );
};

export default MainBoxCenter;
