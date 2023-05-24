import Dragable from "./components/dragable";
import ToDoRightToggleMenu from "./components/menu/rightToggle/toggle";
import TodoListMain from "./components/todoList/main";

const AppFocusPage = () => {
  return (
    <div className="w-screen h-screen relative">
      {/* right */}
      <ToDoRightToggleMenu />
      {/* dragable */}
      <div className="w-screen h-screen">
        <Dragable>
          <TodoListMain />
        </Dragable>
      </div>

      <div>
        {/* source video background loop auto start */}
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
