import { navbarList } from "@/libs/dataList";
import Image from "next/image";
import Link from "next/link";

const IndexNavbar = () => {
  return (
    <>
      <nav className="flex justify-between items-center max-w-[1400px] py-4 w-full m-auto">
        {/* Logo */}
        <Image
          src="/logo.png"
          alt="logo"
          width={50}
          height={50}
          className="cursor-pointer rounded-full"
        />
        {/* menu */}
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
        <Link href="/app" className="rounded-full px-5 py-2 bg-red-500">
          Try In Browser
        </Link>
      </nav>
      <div className="border-b-2 border-[#FFFFFF] border-opacity-10"></div>
    </>
  );
};

export default IndexNavbar;
