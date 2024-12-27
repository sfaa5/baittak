"use client"
import React from 'react'
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";


function Image({images}) {
    console.log(images)
    
  return (
    <div className="grid grid-cols-6 gap-y-7 gap-x-10 items-center grid-rows-7  xl:w-[62%] w-full">
    {/* Large Image Swiper */}
    <div className="col-span-6 row-span-7">
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="w-full"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <img
              src={src}
              alt={`Property Slide ${index + 1}`}
              className="w-full h-auto object-cover rounded-xl"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  </div>
  )
}

export default Image