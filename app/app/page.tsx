import dynamic from "next/dynamic";

const Dragable = dynamic(() => import("./components/dragable"), {
  ssr: false,
});
const MainList = dynamic(() => import("./components/menu/mainList"), {
  ssr: false,
});
const TodoListMain = dynamic(() => import("./components/todoList/main"), {
  ssr: false,
});


const AppFocusPage = () => {
  return (
    <div className="w-screen h-screen relative">
      {/* right */}
      <MainList />
      {/* dragable */}
      <div className="w-screen h-screen">
        <Dragable>
          <TodoListMain />
        </Dragable>
      </div>

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
