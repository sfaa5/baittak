import AgentCard from "@/components/AgentCard";
import Link from "next/link";
import React from "react";
import { FiMapPin } from "react-icons/fi";
import { GoSearch } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";
import { IoHomeSharp } from "react-icons/io5";
import { MdArrowForwardIos } from "react-icons/md";

function page() {
  return (
    <>
      {/* // banner search */}
      <section className="bg-hero-Agency  bg-cover  w-full h-auto mb-10 py-14">
        <div className="container 2xl:px-[120px]   pt-3">
          <div className="flex flex-col gap-8 items-center">
            <h1 className="text-4xl font-medium text-white ">
              Find Best Companies For Living
            </h1>

            <div className="flex justify-start gap-1 sm:gap-3  overflow-x-auto flex-nowrap px-2 touch-pan-x hide-scrollbar">
              <input
                placeholder=" Enter locaion or Company name"
                className="bg-white  flex  h-[48px] font-normal items-center w-[200px] lg:w-[400px]  rounded-[.8rem] justify-between px-4"
              />

              <button className="flex bg-white w-auto h-[48px] gap-2 items-center font-normal text-gray-400 rounded-[.8rem] justify-between px-4">
                Sercice neede
                <IoIosArrowDown className=" h-5 w-5 " />
              </button>

              <button className="flex w-auto h-[48px] items-center font-medium text-white bg-primary rounded-[.8rem]  justify-between px-4">
                <GoSearch className=" font-bold text-white" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="container 2xl:px-[120px]">
        <div className="flex flex-col">
          {/* path */}
          <ul className="flex items-center gap-2 mb-5">
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
          </ul>

{/* result and filter btn */}
          <div className="flex justify-between items-center w-full">

            <h3 className="text-xl font-medium">Matching companies </h3>
            <button className="flex w-[125px] h-[45px] items-center font-normal text-[#707070] rounded-[.8rem] border-[.1px] border-[#707070] justify-between px-4">
              Sort By
              <IoIosArrowDown className=" h-5 w-5 text-[#707070]" />
            </button>

          </div>

          <span className="text-[#707070]">6200 ruselts</span>
        </div>
      </section>
{/* cards */}
      <section className="container 2xl:px-[120px] mt-10" >



<div className="grid grid-cols-1 lg:grid-cols-2 w-full justify-between gap-10 md:gap-14">


<AgentCard/>
<AgentCard/>

<AgentCard/>
<AgentCard/>

<AgentCard/>
<AgentCard/>

</div>

      </section>
    </>
  );
}

export default page;
