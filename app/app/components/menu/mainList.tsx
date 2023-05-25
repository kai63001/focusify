import HandleAuth from "@/app/app/components/menu/auth/handleAuth";
import ToDoRightToggleMenu from "@/app/app/components/menu/rightToggle/toggle";

const MainList = () => {
    return (
      <div className="p-5 absolute right-0 top-0 z-50 flex items-center space-x-2">
        <HandleAuth />
        <ToDoRightToggleMenu />
      </div>
    )
}

export default MainList