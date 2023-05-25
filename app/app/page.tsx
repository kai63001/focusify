import Dragable from "./components/dragable";
import HandleAuth from "./components/menu/auth/handleAuth";
import ToDoRightToggleMenu from "./components/menu/rightToggle/toggle";
import TodoListMain from "./components/todoList/main";

const AppFocusPage = () => {
  return (
    <div className="w-screen h-screen relative">
      {/* right */}
      <div className="p-5 absolute right-0 top-0 z-50 flex items-center space-x-2">
        <HandleAuth />
        <ToDoRightToggleMenu />
      </div>
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
