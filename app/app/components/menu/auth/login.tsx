'use client';

import { useAppDispatch} from "@/app/redux/hook"
import { setLoginModal } from "@/app/redux/slice/login.slice";

const LoginButton = () => {
  const dispatch = useAppDispatch()

  const handleLogin = () => {
    dispatch(setLoginModal({
      openModal: true,
    }))
  }

  return (
    <div onClick={handleLogin} className="bg-primary bg-opacity-75 backdrop-blur-xl px-5 h-8 rounded-md flex cursor-pointer">
      <div className="m-auto">Login</div>
    </div>
  );
};

export default LoginButton;
