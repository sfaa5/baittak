import PropertiesCard from "@/components/PropertiesCard";
import React from "react";

import { FaRegMap } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";
import { GoSearch } from "react-icons/go";

import { IoIosArrowDown, IoIosList } from "react-icons/io";
import { IoHomeSharp  } from "react-icons/io5";

import { MdArrowForwardIos, MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";


function page() {
  return (
    <div className="container 2xl:px-[120px]  mx-auto pt-3">
      {/* Search */}
      <div className="flex flex-col px-3 py-5 bg-[#F5F5F5] rounded-t-[.7rem]">
        <div className="flex justify-start gap-4  overflow-x-auto flex-nowrap px-2 touch-pan-x hide-scrollbar">
          <button className="flex w-[100px] h-[48px] items-center font-medium text-secondary rounded-[.8rem] border-[1px] border-[#1F4454] justify-between px-4">
            Buy
            <IoIosArrowDown className=" h-5 w-5 text-secondary" />
          </button>

          <div className="relative flex ">
            <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary" />
            <input
              placeholder=" Enter locatuon Heare"
              className="bg-[#F5F5F5] pl-8 flex  h-[48px] font-normal items-center w-[200px] lg:w-[400px] text-secondary rounded-[.8rem] border-[1px] border-[#466e7f] justify-between px-4"
            />
          </div>

          <button className="flex w-[155px] h-[48px] items-center font-normal text-secondary rounded-[.8rem] border-[1px] border-[#466e7f] justify-between px-4">
            Apartment
            <IoIosArrowDown className=" h-5 w-5 text-secondary" />
          </button>

          <button className="flex w-[180px] h-[48px] items-center font-normal text-secondary rounded-[.8rem] border-[1px] border-[#466e7f] justify-between px-4">
            Rooms & Bath
            <IoIosArrowDown className=" h-5 w-5 text-secondary" />
          </button>

          <button className="flex w-[110px] h-[48px] items-center font-normal text-secondary rounded-[.8rem] border-[1px] border-[#466e7f] justify-between px-4">
            Price
            <IoIosArrowDown className=" h-5 w-5 text-secondary" />
          </button>

          <button className="flex w-[120px] h-[48px] items-center font-normal text-secondary rounded-[.8rem] border-[1px] border-[#466e7f] justify-between px-4">
            Filters
            <IoIosArrowDown className=" h-5 w-5 text-secondary" />
          </button>

          <button className="flex w-[120px] h-[48px] items-center font-medium text-white bg-primary rounded-[.8rem]  justify-between px-4">
            Search
            <GoSearch className=" font-bold text-white" />
          </button>
        </div>
      </div>

      {/* result of search */}
      <div className="flex lg:gap-32 bg-[#F5F5F5] justify-center border-t-[1px] py-8 rounded-b-[.7rem]  overflow-x-auto">
        <div className="flex flex-col gap-3">
          <div className="flex gap-2">
            <div className="text-secondary text-base font-medium ">Dubai</div>
            <span className="text-[#707070] text-sm font-normal">(1200)</span>
          </div>
          <div className="flex gap-2">
            <div className="text-secondary text-base font-medium ">Dubai</div>
            <span className="text-[#707070] text-sm font-normal">(1200)</span>
          </div>
          <div className="flex gap-2">
            <div className="text-secondary text-base font-medium ">Dubai</div>
            <span className="text-[#707070] text-sm font-normal">(1200)</span>
          </div>
        </div>

        <div className="flex flex-col gap-3 ">
          <div className="flex gap-2">
            <div className="text-secondary text-base font-medium ">Dubai</div>
            <span className="text-[#707070] text-sm font-normal">(1200)</span>
          </div>
          <div className="flex gap-2">
            <div className="text-secondary text-base font-medium ">Dubai</div>
            <span className="text-[#707070] text-sm font-normal">(1200)</span>
          </div>
          <div className="flex gap-2">
            <div className="text-secondary text-base font-medium ">Dubai</div>
            <span className="text-[#707070] text-sm font-normal">(1200)</span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex gap-2">
            <div className="text-secondary text-base font-medium ">Dubai</div>{" "}
            <span className="text-[#707070] text-sm font-normal">(1200)</span>
          </div>
          <div className="flex gap-2">
            <div className="text-secondary text-base font-medium ">Dubai</div>{" "}
            <span className="text-[#707070] text-sm font-normal">(1200)</span>
          </div>
          <div className="flex gap-2">
            <div className="text-secondary text-base font-medium ">Dubai</div>{" "}
            <span className="text-[#707070] text-sm font-normal">(1200)</span>
          </div>
        </div>

        <div className="flex flex-col  gap-3">
          <div className="flex gap-2">
            <div className="text-secondary text-base font-medium ">Dubai</div>{" "}
            <span className="text-[#707070] text-sm font-normal">(1200)</span>
          </div>
          <div className="flex gap-2">
            <div className="text-secondary text-base font-medium ">Dubai</div>{" "}
            <span className="text-[#707070] text-sm font-normal">(1200)</span>
          </div>
          <div className="flex gap-2">
            <div className="text-secondary text-base font-medium ">Dubai</div>{" "}
            <span className="text-[#707070] text-sm font-normal">(1200)</span>
          </div>
        </div>
      </div>

      
        <div className="flex gap-4 flex-col xl:w-[75%]">

          <ul className="flex items-center gap-2 mb-5">
            <li className="flex gap-3">
              <IoHomeSharp className="text-secondary" />
              <MdArrowForwardIos className="text-[#707070]" />
            </li>
            <li className="text-[#707070]">Properties</li>
          </ul>

          <h3 className="text-xl font-medium">Properties for rent in Saudi </h3>
          <span className="text-[#707070]">6200 Properties</span>
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
          {/* Cards */}
          <div className="flex flex-col gap-8">

         <PropertiesCard/>
         <PropertiesCard/>
         <PropertiesCard/>
         <PropertiesCard/>


          </div>


          <div className="flex items-center justify-between mt-5  px-4 py-3 sm:px-6">
  <div className="flex flex-1 justify-between sm:hidden">
    <a href="#" className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</a>
    <a href="#" className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</a>
  </div>

  <div className="hidden sm:flex w-full sm:items-center sm:justify-between">
    
    <div>
      <p className="text-sm text-gray-700">
     
        <span className="font-medium mr-4">3</span>
 
        results
      </p>
    </div>
    <div>
      <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
        <a href="#" className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
          <span className="sr-only">Previous</span>
          <MdKeyboardArrowLeft />
        </a>
     
        <a href="#" aria-current="page" className="relative z-10 inline-flex items-center bg-secondary px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">1</a>
        <a href="#" className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">2</a>
        <a href="#" className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex">3</a>
        <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">...</span>
        <a href="#" className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex">8</a>
        <a href="#" className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">9</a>
        <a href="#" className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">10</a>
        <a href="#" className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
          <span className="sr-only">Next</span>
          <MdKeyboardArrowRight />
        </a>
      </nav>

    </div>

  </div>
</div>



        </div>

      





    </div>
  );
}

export default page;
