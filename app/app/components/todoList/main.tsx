import ToDoListSort from "./listSort";

const TodoListMain = () => {
  return (
    <div className="bg-primary border border-primaryLight rounded-md text-sm w-[450px]">
      <div className="flex justify-between">
        <div className="px-5 pt-4 pb-2 items-center flex space-x-2">
          <i className="fi fi-rr-horizontal-rule cursor-pointer"></i>
          <i className="fi fi-bs-arrow-up-right-and-arrow-down-left-from-center cursor-pointer"></i>
        </div>
        <div className="w-full cursor-grab handle"></div>
        <div className="px-5 pt-4 pb-2 flex items-center space-x-2">
          <i className="fi fi-br-menu-dots-vertical cursor-pointer"></i>
        </div>
      </div>
      <div id="detail" className="px-5 py-2">
        <p className="mb-2">To-Do List</p>
        <ToDoListSort/>
      </div>
    </div>
  );
};

export default TodoListMain;
