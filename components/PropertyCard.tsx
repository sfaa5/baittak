import React from "react";
import { LiaBedSolid } from "react-icons/lia";
import { PiBathtubLight } from "react-icons/pi";
import { FiMapPin } from "react-icons/fi";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { CiHeart } from "react-icons/ci";

function PropertyCard() {
  return (
    <div className="relative  max-w-md mx-auto bg-white rounded-[10px] shadow-md overflow-hidden md:max-w-[350px] group">

      <div className="absolute text-white bg-primary text-sm px-6 py-1 top-3">
        For Rent
      </div>
      <div className="absolute text-white bg-secondary text-sm px-6 py-1 top-12">
        Apartment
      </div>
      <div className="absolute text-secondary bg-white text-2xl rounded-full p-1 top-64 right-4 hover:scale-110 transition-transform duration-200">
  <CiHeart />
</div>

    {/* Left Arrow */}
    <button className="absolute text-xl left-2 top-1/3 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 hover:bg-black hover:scale-105 transition-all duration-300">
  <MdKeyboardArrowLeft/> 

    </button>

    {/* Right Arrow */}
    <button className="absolute text-xl right-2 top-1/3 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 hover:bg-black hover:scale-105 transition-all  duration-300">
    <MdKeyboardArrowRight/> 
    </button>



      <div className="md:shrink-0">
        <img
          className=" w-full object-cover h-full "
          src="/home/properties1.png"
          alt="Modern building architecture"
        />
      </div>

      <div className="p-3 flex flex-col gap-2">
        <div className="flex justify-between">
          <div className=" flex items-end ">
            <div className="text-2xl text-secondary font-semibold"> $2,095</div>
            <span className="text-[#707070] text-lg">/month</span>
          </div>
          <div className="text-lg text-secondary font-medium">Apartment</div>
        </div>

        <div className="flex gap-3 justify-center">
          <div className="flex items-center gap-1">
            <LiaBedSolid className="text-primary text-2xl" />{" "}
            <span>5 rooms</span>
          </div>

          <div className="flex items-center gap-1">
            <PiBathtubLight className="text-primary text-2xl" />{" "}
            <span>5 bath</span>
          </div>
          <div className="flex items-center gap-1">
            <PiBathtubLight className="text-primary text-2xl" />
            <span>
              100m<sup>2</sup>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[#707070]">
          <FiMapPin /> Napervillie, Florida
        </div>

        <div className="">
          <p className="text-secondary font-semibold text-lg">
            LUXURY|BRAND NEW|FITTED KITCHEN| VACANT |
          </p>
        </div>

        <div className="flex justify-end">
          <div className="flex  items-center  gap-1  ">
            <span className=" text-[#707070]">More Details</span>
            <MdKeyboardArrowRight className="text-[#707070]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;
