"use client";
import { motion } from "framer-motion";
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
const OpenYoutube = dynamic(() => import("./tools/youtube/openYoutube"), {
  ssr: false,
});


const MainBoxMenuList = () => {
  return (
    <motion.div
      initial={{ scale: 0.7 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0.7 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      className="px-5 h-8 bg-primary bg-opacity-75 backdrop-blur-xl rounded-md flex justify-center items-center space-x-5"
    >
      <OpenToDoList />
      <OpenNote />
      <OpenPomodoro />
      <OpenYoutube />
    </motion.div>
  );
};

export default MainBoxMenuList;
