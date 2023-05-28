"use client";
import dynamic from "next/dynamic";

const HandleAuth = dynamic(() => import("./auth/handleAuth"), {
  ssr: false,
});
const ToDoRightToggleMenu = dynamic(() => import("./rightToggle/toggle"), {
  ssr: false,
});
const MainBoxMenuList = dynamic(() => import("./leftMenu/mainBox"), {
  ssr: false,
});

const MainList = () => {
  return (
    <div className="p-5 absolute top-0 z-10 flex items-center justify-between space-x-2 w-full select-none">
      <div id="left-menu" className="flex space-x-2 items-center">
        <MainBoxMenuList />
      </div>
      <div id="right-menu" className="flex space-x-2 items-center">
        <HandleAuth />
        <ToDoRightToggleMenu />
      </div>
    </div>
  );
};

export default MainList;
