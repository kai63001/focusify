"use client";

import dynamic from "next/dynamic";
const MainMusicBox = dynamic(() => import("./musicBox.tsx/mainMusicBox"), {
  ssr: false,
});

const MainAmbientBox = dynamic(() => import("./ambientBox/mainAmbientBox"), {
  ssr: false,
});

const MusicInfo = dynamic(() => import("./openMusicInfo/openMusicInfo"), {
  ssr: false,
});

const MainBoxCenter = () => {
  return (
    <div className="flex justify-center items-center space-x-2">
      <MusicInfo />
      <MainMusicBox />
      <MainAmbientBox />
    </div>
  );
};

export default MainBoxCenter;
