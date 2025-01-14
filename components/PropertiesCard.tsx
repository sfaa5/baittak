"use client";
import { CiHeart } from "react-icons/ci";
import { FaHeart, FaWhatsapp } from "react-icons/fa";
import { FiMapPin, FiPhoneCall } from "react-icons/fi";
import { LiaBedSolid } from "react-icons/lia";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { PiBathtubLight } from "react-icons/pi";
import Link from "next/link";
import { property } from "@/app/[locale]/(root)/Property/page";

import React, { useRef, useState } from "react";
import { useLocale } from "next-intl";
import { Mail } from "./Mail";
import { like } from "@/lib/actions/user.action";
import LikeButton from "./LikeButton";
import { Button } from "./ui/button";
import { IoMdShareAlt } from "react-icons/io";
import ShareButton from "./Share";



function PropertiesCard({ post }: { post: property }) {
  const locale = useLocale();
  const [isLoading, setIsLoading] = useState(false);



      const [showNumber, setShowNumber] = useState(false);

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

console.log("post",post)

  const {
    CompanyImage,
    rentaltype,
    propertyType,
    title,
    price,
    address,
    images,
    bathrooms,
    bedrooms,
    amenities,
    area,
    userDetails,
    currency,
    _id,
    email
  } = post;

  console.log(post)

  console.log("idPro:", _id);







  return (
    <div className=" max-w-md mx-auto bg-white rounded-[.5rem] shadow-md overflow-hidden md:max-w-[100%] border-[1px]">
      
        <div className=" md:flex flex-col md:flex-row">

          
          <div className="relative group">
            <div
              ref={carouselRef}
              className="flex overflow-x-hidden gap-4 w-[320px]" // Hides overflow to only show one image
              style={{ scrollSnapType: "x mandatory" }}
            >
              {images?.map((im, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-full snap-start " // Makes sure only one image shows up at a time
                >
                  <img
                    src={im?.url}
                    alt={`carousel image ${index + 1}`}
                    className="w-full h-auto object-cover  md:h-[280px] md:w-100"
                  />
                </div>
              ))}

            </div>





               <LikeButton propertyId={_id} />





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


          {/* details */}
          <div className="pt-5 pl-5 pr-5 flex flex-col gap-3 lg:w-[650px]">

            
          <Link href={`/${locale}/Property/${_id}`} className="asChild flex flex-col pb-5 gap-3"> 


           <div className="flex flex-wrap justify-between">   
              <div className=" flex items-end ">
                <div className="text-3xl text-secondary font-semibold">
                  {price}
                  <span className="text-2xl text-secondary/80">{currency}</span>
                </div>
                <span className="text-[#707070] text-lg">/{rentaltype}</span>
              </div>

              <div className="flex gap-3 justify-center mt-3">
                <div className="flex items-center gap-1">
                  <LiaBedSolid className="text-primary text-2xl" />
                  <span>{bedrooms || "0"} rooms</span>
                </div>

                <div className="flex items-center gap-1">
                  <PiBathtubLight className="text-primary text-2xl" />
                  <span>{bathrooms || "0"} bath</span>
                </div>
                <div className="flex items-center gap-1">
                  <PiBathtubLight className="text-primary text-2xl" />
                  <span>
                    {area}m<sup>2</sup>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex w-full justify-between mt-3 sm:mt-5">
              <p className=" mt-1 text-base  font-medium text-secondary">
                {propertyType}
              </p>
              <div className="flex items-center gap-2 text-[#707070]">
                <FiMapPin className="text-primary" /> {address}
              </div>
            </div>

            <p className="text-secondary font-semibold text-lg">{title}</p>
            {amenities ? (
              <ul className="flex gap-3 text-primary">
                {amenities.slice(0, 3).map((amenity, index) => (
                  <li
                    key={index}
                    className="border-r-[1px] border-primary pr-3"
                  >
                    {locale === "ar" ? amenity.name.ar : amenity.name.en}
                  </li>
                ))}
              </ul>
            ) : (
              ""
            )}
   </Link>
            <div className="flex w-full justify-between  pb-3">
              {/* contact */}
              <div className="flex gap-2 ">

                <Button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent the click from bubbling up to the Link
                    e.preventDefault();
                    setShowNumber(!showNumber);
                  }}
                  className="flex w-full  h-[45px] gap-2   hover:bg-gray-100 items-center font-semibold  bg-[#1F4454] bg-opacity-25 text-secondary rounded-[.8rem]  justify-between px-3"
                >
                  <FiPhoneCall className="w-5 h-5" />
                  {showNumber ? userDetails[0]?.phoneNumber : "Call"}
                </Button>
                

            <Mail ownerEmail={email} title={title}/>

                <Button

                  onClick={(e) => {
                    e.stopPropagation(); // Prevent the click from bubbling up to the Link
                    e.preventDefault();
                    
                    {userDetails[0]?.phoneNumber && window.open(`https://wa.me/${userDetails[0]?.phoneNumber}`, "_blank");}
                  }}
                  className="flex w-full h-[45px] items-center  font-semibold  bg-primary bg-opacity-60 text-balck rounded-[.8rem]  justify-between px-3"
                >
                  <FaWhatsapp className="w-5 h-5" />
                </Button>


        
        <ShareButton propertyUrl={`https://baittak.vercel.app/Property/${_id}`} propertyTitle={title} />


              </div>
{CompanyImage&&             <img
              
              src={CompanyImage}
                alt="comoany"
                className="hidden sm:flex w-10"
              />}
 
            </div>


          </div>
        </div>

    </div>
  );
}

export default PropertiesCard;
