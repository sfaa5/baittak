import Image from "next/image";
import Link from "next/link";
import React from "react";
import Navbar from "./Navbar";
import MobileNavbar from "./MobileNavbar";

function Header() {
  return (
    <header className=" md:px-14 px-5 py-3   font-work-sans ">
      <div className=" mx-auto flex justify-between items-center">
        {/* mobile button */}
        <div className=" xl:hidden  ">
        <button className="bg-primary px-2 py-1 rounded-sm font-semibold text-xs"> Post Property</button>
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
        <div className="hidden xl:flex items-center gap-8">
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
