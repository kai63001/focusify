"use client";
import dynamic from "next/dynamic";
const MainList = dynamic(() => import("./components/menu/mainList"), {
  ssr: false,
});

const ControlComponents = dynamic(
  () => import("./controller/controlComponents"),
  {
    ssr: false,
  }
);

const AppFocusPage = () => {
  return (
    <div className="w-screen h-screen relative overflow-hidden">
      {/* right */}
      <MainList />
      {/* dragable */}
      <ControlComponents />

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
