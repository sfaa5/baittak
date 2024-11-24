import React from 'react'
import { CiHeart } from 'react-icons/ci'
import { FiMapPin } from 'react-icons/fi'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'

function ProjectCard() {
  return (
    <div className=" max-w-md mx-auto bg-white rounded-[.5rem] shadow-md overflow-hidden md:max-w-[100%] border-[1px]"
    
    >
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

      <div className="absolute text-secondary bg-white text-2xl rounded-full p-1 top-72 right-4 hover:scale-110 transition-transform duration-200">
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

      <h3 className="text-2xl text-secondary font-medium">Address: Residences ZabeelTower3</h3>
      <div className="flex w-full justify-between">
        <p className="text-gray-400 font-medium text-lg">ByDamc</p>
        <div className="flex items-center">
          
          <p className="text-gray-400 text-lg font-medium">StartingFrom:</p>
          <p className="text-secondary text-lg font-medium">1,600,000</p>
        </div>
      </div>

      <ul className="flex gap-3  text-gray-600">
      <li className="border-r-[1px] text-gray-400 pr-3">
        Studio
      </li>
      <li className="border-r-[0.1px]  text-gray-400 pr-3">1 Room</li>
      <li className="border-r-[0.1px]  text-gray-400 pr-3">3 Room</li>
    </ul>


    <ul className="flex gap-3  text-secondary">
      <li className="border-r-[1px] border-secondary pr-3">
        10% FIRST PAYMENT
      </li>
      <li className="border-r-[0.1px]  border-secondary pr-3">1% MONTHLY</li>
      <li className="border-r-[0.1px] border-secondary  pr-3">10 YEATS</li>
    </ul>

   
    <div className="flex items-center gap-2 text-[#707070]">
      <FiMapPin className="text-primary" /> Napervillie, Florida
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

<div className="flex w-auto justify-end">
<img
      src="/home/image 1.png"
      alt="comoany"
      className="hidden w-26 sm:flex"
    />
</div>
  

    </div>
  </div>
  </div>
  )
}

export default ProjectCard