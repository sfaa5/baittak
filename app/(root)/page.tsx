import { FiMapPin } from "react-icons/fi";
import { GoSearch } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";
import { LuHome } from "react-icons/lu";

export default function Home() {
  return (
    // landing
    <section className="h-full pb-36 bg-hero-pattern bg-cover  w-full">
      <div className="container relative mx-auto h-full flex flex-col gap-44">
        {/* content */}
        <div className="absolute  w-96 h-96 rounded-full blur"></div>
        <div className="flex relative flex-col pt-40 pl-18 gap-3 pl-6 md:pl-0">
          <h1 className="h1 text-secondary">
            All Properties <br />
            on one lace
          </h1>
          <p className="text-xl sm:text-2xl">
            We provide a complete service for the sale,
            <br />
            purchace or rental of real estate
          </p>
        </div>

        <div className="w-full  flex justify-center px-16">
          <div className="relative w-full   h-36 bg-[#F5F5F5] bg-opacity-80 flex  items-center px-8 rounded-md justify-center ">
            {/* top search */}
            <div className="absolute -top-7 left-1/3 bg-secondary text-white flex justify-between items-center w-1/3 h-[60] px-6 py-6 rounded-sm">
              <div className="inline-flex text-base font-bold">
                <LuHome className="size-6 items-center mr-5" /> Rent
              </div>
              <div className="inline-flex text-base font-bold">
                <LuHome className="size-6 items-center  mr-5" /> Buy
              </div>
              <div className="inline-flex text-base font-bold">
                <LuHome className="size-6 items-center  mr-5" /> Projects
              </div>
            </div>
            {/* search */}
            <div className="realtive flex justify-around items-center w-full pt-7 ">
              <button className="bg-primary px-8 py-3 rounded-lg font-semibold text-base">
                Rent
              </button>
              <button className="bg-primary px-8 py-3 rounded-lg font-semibold text-base">
                Buy
              </button>

              <div className="relative w-full max-w-lg">
                <input
                  type="text"
                  placeholder="Enter location here"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black-100"
                />
                <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>

              <button className="inline-flex items-center px-4 py-3 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-full max-w-48">
                Type
                <IoIosArrowDown className="ml-24  h-5 w-5 text-gray-500" />
              </button>

              <button className="inline-flex items-center px-4 py-3 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-full max-w-60">
                Room & Bath
                <IoIosArrowDown className="ml-20  h-5 w-5 text-gray-500" />
              </button>

              <button className="inline-flex items-center  bg-primary px-8 py-3 rounded-lg font-semibold text-base">
                Search
                <GoSearch className="ml-3 font-bold " />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
