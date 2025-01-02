"use client";
import ShowMap from '@/components/ShowMap';
import React, { use, useState } from 'react'

function Map({location}) {

    console.log(location)
      const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
<div className=" md:w-2/3  rounded-[.3rem]  relative w-full col-span-1 flex justify-center items-center">
  {/* Static Map */}
  <img
    src="/map.png" // Replace with an actual static map URL
    alt="Static Map"
    className="w-full h-44  rounded-lg shadow-lg object-cover" // Adjusted width, height, and added shadow
  />

  {/* Overlay Button */}
  <button
    onClick={() => setIsModalOpen(true)}
    type="button"
    className="absolute inset-0 flex justify-center  bg-black/50 hover:bg-black/60  items-center text-white text-sm px-3 py-2 rounded-lg transition-all duration-300"
  >
    See on Map
  </button>
</div>


  {isModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-[1400px]">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="mb-4 px-4 py-2 bg-primary  text-white rounded hover:bg-primary/50"
                  >
                    Close
                  </button>
                  <ShowMap
           latitude={location.latitude}
              longitude={location.longitude}
                  />
                </div>
              </div>
            )}
  

  
  
  </>
  )
}

export default Map