import Dragable from "./components/dragable";
import MainList from "./components/menu/mainList";
import TodoListMain from "./components/todoList/main";

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
