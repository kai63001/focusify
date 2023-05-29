"use client";

import dynamic from "next/dynamic";
import MainMusicBox from "./musicBox.tsx/mainMusicBox";

const MainBoxCenter = () => {
  return (
    <div className="flex justify-center items-center space-x-5">
      <MainMusicBox />
    </div>
  );
};

export default MainBoxCenter;
