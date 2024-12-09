"use client"
import { CiHeart } from "react-icons/ci";
import { FaWhatsapp } from "react-icons/fa";
import { FiMapPin, FiPhoneCall } from "react-icons/fi";
import { IoMailOutline } from "react-icons/io5";
import { LiaBedSolid } from "react-icons/lia";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { PiBathtubLight } from "react-icons/pi";

import Link from "next/link";


function PropertiesCard() {


  return (
    <div className=" max-w-md mx-auto bg-white rounded-[.5rem] shadow-md overflow-hidden md:max-w-[100%] border-[1px]"
    
    >

<Link  href="/Property/id" > 
  <div className=" md:flex flex-col md:flex-row">
        <div className="relative md:shrink-0 group">
          {/* Left Arrow */}
          <button className="absolute text-xl left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 hover:bg-black hover:scale-105 transition-all duration-300">
            <MdKeyboardArrowLeft />
          </button>

          {/* Right Arrow */}
          <button className="absolute text-xl right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 hover:bg-black hover:scale-105 transition-all  duration-300">
            <MdKeyboardArrowRight />
          </button>

          <div className="absolute text-secondary bg-white text-2xl rounded-full p-1 top-60 right-4 hover:scale-110 transition-transform duration-200">
            <CiHeart />
          </div>
          <img
            className="w-full object-cover h-56 md:h-full md:w-80 "
            src="/home/properties1.png"
            alt="Modern building architecture"
          />
        </div>
        {/* details */}
        <div className="pt-5 pl-5 pr-5 flex flex-col gap-3 lg:w-[650px]">
          <div className="flex flex-wrap justify-between">
            
            <div className=" flex items-end ">
              <div className="text-3xl text-secondary font-semibold">
                $2,095
              </div>
              <span className="text-[#707070] text-lg">/month</span>
            </div>

            <div className="flex gap-3 justify-center mt-3">
              <div className="flex items-center gap-1">
                <LiaBedSolid className="text-primary text-2xl" />
                <span>5 rooms</span>
              </div>

              <div className="flex items-center gap-1">
                <PiBathtubLight className="text-primary text-2xl" />
                <span>5 bath</span>
              </div>
              <div className="flex items-center gap-1">
                <PiBathtubLight className="text-primary text-2xl" />
                <span>
                  100m<sup>2</sup>
                </span>
              </div>
            </div>
          </div>

          <div className="flex w-full justify-between mt-3 sm:mt-5">
            <p className=" mt-1 text-base  font-medium text-secondary">
              Apertment
            </p>
            <div className="flex items-center gap-2 text-[#707070]">
              <FiMapPin className="text-primary" /> Napervillie, Florida
            </div>
          </div>

          <p className="text-secondary font-semibold text-lg">
            LUXURY|BRAND NEW|FITTED KITCHEN| VACANT |
          </p>

          <ul className="flex gap-3  text-primary">
            <li className="border-r-[1px] border-primary pr-3">
              Swimming Pool
            </li>
            <li className="border-r-[0.1px]  border-primary pr-3">balcony</li>
            <li className="border-r-[0.1px]  border-primary pr-3">Roof</li>
          </ul>

          <div className="flex w-full justify-between sm:mt-5 pb-3">
            {/* contact */}
            <div className="flex gap-2">
              <button
              
              
              className="flex w-full h-[45px] gap-1 items-center font-semibold  bg-[#1F4454] bg-opacity-25 text-secondary rounded-[.8rem]  justify-between px-3">
                <FiPhoneCall className="w-5 h-5" />
                Call
              </button>
              <button className="flex w-full gap-1 h-[45px] items-center font-semibold  bg-[#1F4454] bg-opacity-25 text-secondary rounded-[.8rem]  justify-between px-3">
                <IoMailOutline className="w-5 h-5" />
                Mail
              </button>
              <button className="flex w-full h-[45px] items-center font-semibold  bg-primary bg-opacity-60 text-balck rounded-[.8rem]  justify-between px-3">
                <FaWhatsapp className="w-5 h-5" />
           
              </button>
            </div>

            <img src="/home/image 1.png" alt="comoany"  className="hidden sm:flex"/>
          </div>
        </div>
      </div></Link>

   
    </div>
  );
}

export default PropertiesCard;
