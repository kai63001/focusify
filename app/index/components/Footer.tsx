import { navbarList } from "@/libs/dataList";
import Image from "next/image";
import Link from "next/link";
const IndexFooter = () => {
  return (
    <footer className="max-w-[1400px]  py-4 w-full m-auto flex flex-col">
      <div className="border-b-2 border-[#FFFFFF] border-opacity-10"></div>
      <div className="flex justify-between mt-5">
        <div>
          {/* copy right */}
          <p className="text-white text-sm">Copyright © 2023 focusify.io</p>
        </div>
        <ul className="flex items-center space-x-3">
          {navbarList.map((navbar) => (
            <li
              className="inline-block px-3 py-2 rounded-md cursor-pointer"
              key={navbar.name}
            >
              <Link href={navbar.link}>{navbar.name}</Link>
            </li>
          ))}
        </ul>
        {/* Try In Browser */}
        <Link href="/privacy-policy" target="_blank" className="rounded-full px-5 py-2 ">
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
};

export default IndexFooter;
