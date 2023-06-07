import Image from "next/image";
import Link from "next/link";

const IndexNavbar = () => {
  const navbarList = [
    {
      name: "Contact Us",
      link: "/",
    },
    {
      name: "Features",
      link: "/",
    },
    {
      name: "Community",
      link: "/",
    },
    {
      name: "FAQ",
      link: "/",
    },
    {
      name: "Subscription",
      link: "/",
    },
  ];
  return (
    <>
      <nav className="flex justify-between items-center max-w-[1600px] py-4 w-full m-auto">
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
          {/* <li className="inline-block px-3 py-2 rounded-md cursor-pointer">
            <link href="#">Contact Us</link>
          </li> */}
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
