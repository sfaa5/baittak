"use client";
import React, { useRef, useState } from "react";
import { LiaBedSolid } from "react-icons/lia";
import { PiBathtubLight } from "react-icons/pi";
import { FiMapPin } from "react-icons/fi";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { CiHeart } from "react-icons/ci";

import { useLocale } from "next-intl";
import LikeButton from "./LikeButton";
import { FaHeart } from "react-icons/fa";
import { like } from "@/lib/actions/user.action";
import { useSession } from "next-auth/react";
import { useSharedState } from "@/app/context/stateProvider";
import { usePathname, useRouter } from "next/navigation";
import  Link from "next/link";


function PropertyCard({ property }) {
    const{data:session,status}=useSession();
    const router = useRouter()
    const path = usePathname();
  const locale = useLocale();
  const{favorite,seFavorite}=useSharedState();

  

  const [isLike,setIsLike]=useState(false);

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

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation(); 
    try {
      if(!session?.user?.id){
        router.push('/?login=true')
      }


      // Update the backend and fetch updated favorites
      const updatedFavorites = await like(property._id, session?.user?.id);

      setIsLike(true)
      seFavorite(updatedFavorites)
      // Update the local shared state with the new favorites list
 
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

  return (
    <>
    <div className="relative">

    <button
          onClick={handleLike} // Call handleLike on click
          className="absolute text-secondary bg-white text-2xl rounded-full p-1 top-60 right-4 hover:scale-110 transition-transform duration-200"
        >
          {path=='/en'? (<div>
      {    isLike? <FaHeart className="text-red-500" />  :<FaHeart />}

          </div>) :(<FaHeart className="text-red-500" />)}
          
        </button>

 
    <Link href={`/Property/${property._id}`}>
    <div className="  max-w-md  bg-white rounded-[10px] shadow-md overflow-hidden md:max-w-[350px] group">


      <div className=" group">
      <div className="absolute text-white bg-primary text-sm px-6 py-1 top-3">
        For {property.for}
      </div>
      <div className="absolute text-white bg-secondary text-sm px-6 py-1 top-12">
        {property.propertyType}
      </div>
        <div
          ref={carouselRef}
          className="flex overflow-x-hidden gap-4 w-[320px]" // Hides overflow to only show one image
          style={{ scrollSnapType: "x mandatory" }}
        >
          {property.images?.map((im, index) => (
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



        <button
          onClick={scrollPrev}
          className="absolute text-xl left-2 top-1/3 transform -translate-y-1/3 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 hover:bg-black hover:scale-105 transition-all duration-300"
        >
          <MdKeyboardArrowLeft className="w-6 h-6" />
        </button>

        <button
          onClick={scrollNext}
          className="absolute text-xl right-2 top-1/3 transform -translate-y-1/3 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 hover:bg-black hover:scale-105 transition-all  duration-300"
        >
          <MdKeyboardArrowRight className="w-6 h-6" />
        </button>
      </div>

      <div className="p-3 flex flex-col gap-2">
        <div className="flex justify-between">
          <div className=" flex items-end ">
            <div className="text-2xl text-secondary font-semibold">
              {" "}
              {property.price}
            </div>
            <span className="text-[#707070] text-lg">/month</span>
          </div>
          <div className="text-lg text-secondary font-medium">
            {property.propertyType}
          </div>
        </div>

        <div className="flex gap-3 justify-center">
          <div className="flex items-center gap-1">
            <LiaBedSolid className="text-primary text-2xl" />

            <span>{property.bedrooms} rooms</span>
          </div>

          <div className="flex items-center gap-1">
            <PiBathtubLight className="text-primary text-2xl" />
            <span>{property.bathrooms} bath</span>
          </div>
          <div className="flex items-center gap-1">
            <PiBathtubLight className="text-primary text-2xl" />
            <span>
              {property.bathrooms} m<sup>2</sup>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[#707070]">
          <FiMapPin /> {property.address}
        </div>

        {property.amenities ? (
          <ul className="flex gap-3 text-primary">
            {property.amenities.slice(0, 3).map((amenity, index) => (
              <li key={index} className="border-r-[1px] border-primary pr-3">
                {locale === "ar" ? amenity.name.ar : amenity.name.en}
              </li>
            ))}
          </ul>
        ) : (
          ""
        )}

        <div className="flex justify-end">
          <div className="flex  items-center  gap-1  ">
            <span className=" text-[#707070]">More Details</span>
            <MdKeyboardArrowRight className="text-[#707070]" />
          </div>
        </div>
      </div>
    </div></Link></div></>
  );
}

export default PropertyCard;
