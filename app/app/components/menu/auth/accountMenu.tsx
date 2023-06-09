import { useAppSelector } from "@/app/redux/hook";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const AccountMenu = () => {
  const loginSelector = useAppSelector((state: { login: any }) => state.login);
  const dropdownItems = [
    // { id: 1, label: "Profile", path: "/auth/profile" },
    // { id: 2, label: "Settings", path: "/auth/settings" },
    { id: 3, label: "Logout", path: "/auth/logout" },
  ];

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
    }} className="relative h-full">
      <div className="flex items-center">
        <div
          className="bg-primary bg-opacity-75 backdrop-blur-xl px-5 h-8 rounded-md flex items-center cursor-pointer select-none"
          onClick={handleDropdownClick}
          ref={userInfoRef}
        >
          <p className="text-ellipsis w-20 overflow-hidden whitespace-nowrap">
            <i className="fi fi-ss-user"></i> {loginSelector.name}
          </p>
        </div>
        {isDropdownOpen && (
          <div
            className="absolute top-10 bg-primary border border-primaryLight w-full rounded-md"
            onMouseEnter={() => (hasDropdownBeenHovered.current = true)}
            onClick={() => (hasDropdownBeenHovered.current = false)}
            ref={dropdownRef}
          >
            {dropdownItems.map((item) => (
              <Link
                href={item.path}
                key={item.id}
                prefetch={false}
                className="px-3 py-1 hover:bg-primaryLight cursor-pointer block"
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AccountMenu;
