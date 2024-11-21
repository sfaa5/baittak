
import Link from "next/link";
import React from "react";
import { CiHeart } from "react-icons/ci";
import { FaSignInAlt } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { TfiWorld } from "react-icons/tfi";

const Navbar = () => {
  return (

      <nav className="flex justify-between items-center">
   

        <div className="flex flex-col  gap-4">
          <div className="flex gap-8 justify-end">

            <Link href="/" > <div className="flex items-center  gap-2" ><TfiWorld />  <span>Enlish</span> </div></Link>
            <Link href="/" > <div className="flex items-center gap-2 " ><CiHeart />  <span>Favorites</span></div> </Link>

            <Link href="/" > <div className="flex items-center  gap-2" ><FaCircleUser />  <span>Agent login</span></div> </Link>
            <Link href="/" > <div className="flex items-center  gap-2 " ><FaSignInAlt /> <span>sign up</span></div>  </Link>

          </div>

          <div className="flex items-center justify-between gap-20">

            <div className="flex gap-20">
              <Link className="text-secondary font-semibold text-lg" href="/">Property</Link>
              <Link className="text-secondary font-semibold text-lg" href="/">Projects</Link>
              <Link className="text-secondary font-semibold text-lg" href="/">Agency</Link>
              <Link className="text-secondary font-semibold text-lg" href="/">Property</Link>
            </div>
            <button className="bg-primary px-5 py-1 rounded-sm font-semibold text-lg"> Post Property</button>
          </div>



        </div>
      </nav>
 
  );
};

export default Navbar;
