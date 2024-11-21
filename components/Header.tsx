import Image from "next/image";
import Link from "next/link";
import React from "react";
import Navbar from "./Navbar";
import MobileNavbar from "./MobileNavbar";

function Header() {
  return (
    <header className=" md:px-14 px-5 py-3  shadow-sm font-work-sans h-[100]">
      <div className=" mx-auto flex justify-between items-center">
        {/*logo */}
        <Link href="/">
          <Image src="/BaittakLOGO1 2.png" alt="logo" width={200} height={30} />
        </Link>

        {/* desktop nav */}
        <div className="hidden xl:flex items-center gap-8">
          <Navbar />
          <Link href="/contact">
          </Link>
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
