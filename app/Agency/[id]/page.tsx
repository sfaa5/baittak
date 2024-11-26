import ProjectCard from "@/components/ProjectCard";
import Link from "next/link";
import React from "react";
import { FiPhoneCall } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { IoHomeSharp, IoMailOutline } from "react-icons/io5";
import { MdArrowForwardIos } from "react-icons/md";

function page() {
  return (
    <div className=" container px-2 2xl:px-[120px]">
      {/* path */}
      <ul className="flex items-center gap-2 mt-5 mb-5">
        <li className="flex gap-3">
          <Link href={"/"}>
            <IoHomeSharp className="text-secondary" />
          </Link>
          <MdArrowForwardIos className="text-[#707070]" />
        </li>
        <li className="text-[#707070] flex gap-3 items-center">
          Agency
          <MdArrowForwardIos className="text-[#707070]" />
        </li>
        <li className="text-[#707070] flex gap-3 items-center">
          شركة اسكان سلمان العقارية
          <MdArrowForwardIos className="text-[#707070]" />
        </li>
      </ul>

      {/* header */}
      <div className="flex w-full md:h-full h-[450px] flex-col md:flex-row  justify-between items-end p-2 md:p-5 border-2 rounded-[0.6rem]  bg-gradient-to-r from-[#F7F7F7] from-[65%] to-secondary to-100% ">
      
        <div className="flex flex-col gap-6 items-center md:items-start ">

          <div className="flex flex-col md:flex-row items-center gap-6">
            <img src="/Agency/agent.png" alt="agent"  className="w-32 h-32" />

            <div className="flex flex-col gap-5">
              <h1 className="text-2xl text-secondary font-medium">
                شركة اسكان سلمان العقارية
              </h1>
              <div className="flex items-center gap-3">
                <span className=" text-2xl">4631 </span>
                <p className="text-lg text-gray-500">Active Listing</p>
              </div>
            </div>
          </div>

          <div className="md:flex ">
            <span className="flex text-lg mr-3 text-gray-500">Address:</span>
            <p className="text-lg">
              Office 3, building Burj Plus, Al Ulayys,
              Riyadh,
            </p>
          </div>
        </div>

        <div className="flex gap-3 ">
          <button className="flex w-auto h-[48px] gap-2 bg-white items-center font-medium text-secondary rounded-[.8rem] border-[1px] border-[#466e7f] justify-between px-4">
            <FiPhoneCall className="w-5 h-5" />
            Email Company
          </button>
          <button className="flex w-auto gap-2 bg-white h-[48px] items-center font-medium  text-secondary rounded-[.8rem] border-[1px] border-[#466e7f] justify-between px-4">
            <IoMailOutline className="w-5 h-5" />
            Call Company
          </button>
        </div>
      </div>






      
      {/* filters btn */}
      <div className="flex flex-col gap-5 mb-5 mt-8">
        <div className="flex gap-3 ">

          <button className="flex w-auto gap-2 h-[48px] items-center font-normal  rounded-[.8rem] border-[1px] border-gray-500 justify-between px-4">
            Buy
            <IoIosArrowDown className=" h-5 w-5 " />
          </button>
          <button className="flex w-auto gap-2 h-[48px] items-center font-normal  rounded-[.8rem] border-[1px] border-gray-500 justify-between px-4">
          Features
            <IoIosArrowDown className=" h-5 w-5 " />
          </button>
        </div>
        <span className="text-lg text-gray-600"> <span className="text-black text-xl">6200</span> ruselts</span>
      </div>
     {/* Cards */}
      <div className="flex flex-col w-2/3 gap-8 mb-28">
            <ProjectCard/>
            <ProjectCard/>
            <ProjectCard/>
            <ProjectCard/>

        </div>
    </div>
  );
}

export default page;
