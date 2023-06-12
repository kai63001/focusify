import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { setOpenApp } from "@/app/redux/slice/appControl.slice";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

const RightToggleMenu = () => {
  const dispatch = useAppDispatch();
  const { appChangeWallpaper } = useAppSelector((state) => state.appControl);
  const dropdownItems = [
    {
      id: 1,
      label: "Change Wallpaper",
      icon: <i className="fi fi-sr-desktop-wallpaper mt-1 mr-3"></i>,
      onClick: () => openApp("appChangeWallpaper"),
    },
    {
      id: 2,
      label: "Share Feedback",
      icon: <i className="fi fi-sr-smile mt-1 mr-3"></i>,
      onClick: () => openNextLink("https://forms.gle/dgEZx5a7Fv1DJhkD8"),
    },
  ];

  const openNextLink = (link: string) => {
    window.open(link, "_blank");
  };

  const openApp = (app: string) => {
    dispatch(setOpenApp({ isShow: !appChangeWallpaper.isShow, app }));
    setIsDropdownOpen(false);
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const hasDropdownBeenHovered = useRef(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userInfoRef = useRef<HTMLDivElement>(null);

  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
    if (isDropdownOpen) {
      hasDropdownBeenHovered.current = false;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        event.target !== document.activeElement &&
        (!userInfoRef.current ||
          !userInfoRef.current.contains(event.target as Node))
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
      className="relative h-full"
    >
      <div className="flex items-center">
        <div
          className="w-8 h-8 bg-primary bg-opacity-75 backdrop-blur-xl rounded-md flex justify-center items-center cursor-pointer"
          onClick={handleDropdownClick}
          ref={userInfoRef}
        >
          <i className="fi fi-br-menu-burger mt-1"></i>
        </div>
        {isDropdownOpen && (
          <div
            className="absolute w-52 top-10 bg-primary border border-primaryLight right-0 rounded-md"
            onMouseEnter={() => (hasDropdownBeenHovered.current = true)}
            onClick={() => (hasDropdownBeenHovered.current = false)}
            ref={dropdownRef}
          >
            {dropdownItems.map((item) => (
              <div
                key={item.id}
                onClick={item.onClick}
                className="px-3 py-1 hover:bg-primaryLight cursor-pointer flex items-center"
              >
                {item.icon && item.icon}
                {item.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
  // return (
  //     <div className="w-8 h-8 bg-primary bg-opacity-75 backdrop-blur-xl rounded-md flex justify-center items-center cursor-pointer">
  //       <i className="fi fi-br-menu-burger mt-1"></i>
  //     </div>
  // );
};

export default RightToggleMenu;
