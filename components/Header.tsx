"use client";

import Link from "next/link";


import Navbar from "./Navbar";
import MobileNavbar from "./MobileNavbar";

interface HeaderProps {
  padding?: String; // Define the type of the padding prop
}

function Header({ padding }: HeaderProps) {
  return (
    <header className="px-1 py-3  font-work-sans border-b-[1px]" >
      <div
        className={`container mx-auto flex justify-between items-center lg:px-[${padding}] `}
        // style={{ padding: `0px ${padding} ` }}
      >
        {/* mobile button */}
        <div className=" xl:hidden  ">
          <button className="bg-primary px-2 py-2 rounded-sm font-semibold text-xs">

            Post Property
          </button>
        </div>

        {/*logo */}
        <Link href="/">
          <img
            src="/BaittakLOGO1 2.png"
            alt="logo"
            className="w-2/3  sm:w-full h-auto max-w-full object-contain"
          />
        </Link>

        {/* desktop nav */}
        <div className="hidden xl:flex items-center ">
          <Navbar />
          <Link href="/contact"></Link>
        </div>

        {/* {mobile nav} */}
        <div className="xl:hidden">
          <MobileNavbar />
        </div>
      </div>
    </header>
  );
}

export default Header;
