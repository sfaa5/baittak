import ProjectCard from "@/components/ProjectCard";
import Search from "@/components/Search";
import { Link } from "lucide-react";
import React from "react";
import { CiHeart } from "react-icons/ci";
import { FaRegMap } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";
import { IoIosArrowDown, IoIosList } from "react-icons/io";
import { IoHomeSharp } from "react-icons/io5";
import {
  MdArrowForwardIos,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from "react-icons/md";

function page() {
  return (
    <div className="container 2xl:px-[120px]  mx-auto pt-3">
      <Search />

      {/* path */}
      <ul className="flex items-center gap-2 mb-5">
        <li className="flex gap-3">
          <IoHomeSharp className="text-secondary" />
          <MdArrowForwardIos className="text-[#707070]" />
        </li>
        <li className="text-[#707070]"> projects </li>
      </ul>

      <div className="flex gap-4 flex-col mt-5 xl:w-[75%]">
        <h3 className="text-xl font-medium">30 new projects in Saudi</h3>

        {/* button of cards */}
        <div className="flex justify-between">
          <button className="flex w-[125px] h-[45px] items-center font-normal text-[#707070] rounded-[.8rem] border-[.1px] border-[#707070] justify-between px-4">
            Sort By
            <IoIosArrowDown className=" h-5 w-5 text-[#707070]" />
          </button>

          <div className="flex gap-4">
            <button className="flex w-[95px] h-[45px] items-center font-normal text-[#707070] rounded-[.8rem] border-[.1px] border-[#707070] justify-between px-4">
              <FaRegMap className=" h-5 w-5 text-[#707070]" />
              Map
            </button>

            <button className="flex w-[95px] h-[45px] items-center font-normal text-[#707070] rounded-[.8rem] border-[.1px] border-[#707070] justify-between px-4">
              <IoIosList className=" h-5 w-5 text-[#707070]" />
              List
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-8 mb-28">
            <ProjectCard/>
            <ProjectCard/>
            <ProjectCard/>
            <ProjectCard/>

        </div>
 
      </div>
    </div>
  );
}

export default page;
