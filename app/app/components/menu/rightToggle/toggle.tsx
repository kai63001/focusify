import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { setOpenApp } from "@/app/redux/slice/appControl.slice";
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
  ];

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
    <div className="relative h-full">
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
    </div>
  );
  // return (
  //     <div className="w-8 h-8 bg-primary bg-opacity-75 backdrop-blur-xl rounded-md flex justify-center items-center cursor-pointer">
  //       <i className="fi fi-br-menu-burger mt-1"></i>
  //     </div>
  // );
};

export default RightToggleMenu;
