"use client"
import { CiHeart } from 'react-icons/ci';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import React, { useRef, useState } from "react";
function ImgeCard({img}) {

    console.log(img)

  const carouselRef = useRef<HTMLDivElement | null>(null);

  const scrollNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Prevent the click from bubbling up to the Link
    e.preventDefault();
    if (carouselRef.current) {
      const width = carouselRef.current.offsetWidth; // Get the width of the container
      carouselRef.current.scrollBy({ left: width, behavior: "smooth" }); // Scroll by the width of the container to show the next image
    }
  };

  const scrollPrev = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Prevent the click from bubbling up to the Link
    e.preventDefault();
    if (carouselRef.current) {
      const width = carouselRef.current.offsetWidth; // Get the width of the container
      carouselRef.current.scrollBy({ left: -width, behavior: "smooth" }); // Scroll backward by the width of the container
    }
  };



  return (
          <div className="relative group">
            <div
              ref={carouselRef}
              className="flex overflow-x-hidden gap-4  w-[320px]" // Hides overflow to only show one image
              style={{ scrollSnapType: "x mandatory" }}
            >
              {img.map((im, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-full  snap-start " // Makes sure only one image shows up at a time
                >
                  <img
                    src={im}
                    alt={`carousel image ${index + 1}`}
                    className="w-full object-cover  md:h-[300px] md:w-100"
                  />
                </div>
              ))}
            </div>

            <div className="absolute text-secondary bg-white text-2xl rounded-full p-1 top-60 right-4 hover:scale-110 transition-transform duration-200">
              <CiHeart />
            </div>

            <button
              onClick={scrollPrev}
              className="absolute text-xl left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 hover:bg-black hover:scale-105 transition-all duration-300"
            >
              <MdKeyboardArrowLeft className="w-6 h-6" />
            </button>

            <button
              onClick={scrollNext}
              className="absolute text-xl right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 hover:bg-black hover:scale-105 transition-all  duration-300"
            >
              <MdKeyboardArrowRight className="w-6 h-6" />
            </button>
          </div>
  )
}

export default ImgeCard