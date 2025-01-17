"use client";
import React, { useRef, useState } from "react";
import { LiaBedSolid } from "react-icons/lia";
import { PiBathtubLight } from "react-icons/pi";
import { FiMapPin } from "react-icons/fi";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { CiHeart } from "react-icons/ci";

import { useLocale, useTranslations } from "next-intl";
import LikeButton from "./LikeButton";
import { FaHeart } from "react-icons/fa";
import { like } from "@/lib/actions/user.action";
import { useSession } from "next-auth/react";
import { useSharedState } from "@/app/context/stateProvider";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { SlSizeFullscreen } from "react-icons/sl";

const RentalTypeTranslation = {
  "Monthly":"شهريًّا",
  "Yearly":"سنوياً"
}

const CurrencyTranslation ={
  "USD": "دولار",
  "IQD": "دينار عراقي",
  "EUR": "يورو",
  "SAR": "ريال سعودي" ,
  "AED": "درهم",
  "KWD": "دينار كويتي",
  "QAR": "ريال قطري",
  "OMR": "ريال عماني",
  "BHD": "دينار بحريني",
  "JOD": "دينار أردني"
}

const propertyTypeTranslations = {
  "Apartment": "شقة",
  "villa": "فيلا",
  "Farm": "مزرعة",
  "Rest-House": "استراحة",
  "Residential-Complex": "مجمع سكني",
  "Duplex": "دوبلكس",
  "Building": "عمارة بالكامل",
  "Hotel-Apartments": "فندق/شقق فندقية",
  "Land": "ارض",
  "Full-Floor": "طابق كامل",
};

function PropertyCard({ property }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const path = usePathname();
  const locale = useLocale();
  const { favorite, seFavorite } = useSharedState();
const  t =useTranslations()


  const [isLike, setIsLike] = useState(false);

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
      if (!session?.user?.id) {
        router.push("/?login=true");
        return;
      }

      if (isLike) {
        const updatedFavorites = favorite.filter(
          (fav) => fav._id !== property._id
        );
        setIsLike(false);
        seFavorite(updatedFavorites);
      } else {
        // If not liked, toggle to like
        const updatedFavorites = await like(property._id, session?.user?.id);
        setIsLike(true);
        seFavorite(updatedFavorites); // Update local state with updated favorites
      }
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

  if (status === "loading") {
    return <h1>loading...</h1>;
  }

  return (
    <>
      <div className="relative">
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
                className="flex overflow-x-hidden gap-4 w-[330px]" // Hides overflow to only show one image
                style={{ scrollSnapType: "x mandatory" }}
              >
                {property.images?.map((im, index) => (
                  <div
                    key={index}
                    className="relative flex-shrink-0 w-full snap-start " // Makes sure only one image shows up at a time
                  >
                    <img
                      src={im?.url}
                      alt={`carousel image ${index + 1}`}
                      className="w-[330px] h-[270px] object-cover  md:h-[280px] md:w-100"
                    />
                    <button
                      onClick={handleLike} // Call handleLike on click
                      className="absolute text-secondary bg-white text-2xl rounded-full  p-1 bottom-3 right-4 hover:scale-110 transition-transform duration-200"
                    >
                      {path == "/en" ? (
                        <div>
                          {isLike ? (
                            <FaHeart className="text-red-500" />
                          ) : (
                            <FaHeart />
                          )}
                        </div>
                      ) : (
                        <FaHeart className="text-red-500" />
                      )}
                    </button>
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
                    <div className="text-xl font-semibold text-secondary">
                      {new Intl.NumberFormat(locale, {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }).format(
                        property.price.toString().length > 7
                          ? Number(property.price.toString().slice(0, 7))
                          : property.price
                      )} <span className="text-[16px]"> {locale==="ar"?CurrencyTranslation[property?.currency]:property?.currency}</span>
                    </div>
                  </div>
                  {property.for === "rent" && (
                  <span className="text-[#707070] text-sm"> / {locale==="ar" ? RentalTypeTranslation[property?.rentaltype]:property?.rentaltype }</span>
                )}
                </div>
                <div className="text-md text-secondary font-medium">
                  {locale==="ar"? propertyTypeTranslations[property?.propertyType]:property?.propertyType}
                </div>
              </div>

              <div className="flex gap-3 justify-center text-sm">
                <div className="flex items-center gap-1">
                  <LiaBedSolid className="text-primary text-2xl" />

                  <span>{property.bedrooms} {t("property.rooms")}</span>
                </div>

                <div className="flex items-center gap-1">
                  <PiBathtubLight className="text-primary text-2xl" />
                  <span>{property.bathrooms} {t("property.bath")}</span>
                </div>
                <div className="flex items-center gap-1">
                  <SlSizeFullscreen className="text-primary text-base " />
                  <span>
                    {property?.area} m<sup>2</sup>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-[#707070]">
                <FiMapPin />{" "}
                {property?.address.split("").length > 6
                  ? property?.address.split(" ").slice(0, 2).join(" ") +
                    " ... " +
                    property?.address.split(" ").slice(-3).join(" ")
                  : property?.address}
              </div>

              {property.amenities ? (
                <ul className="flex gap-3 text-sm text-primary">
                  {property.amenities.slice(0, 3).map((amenity, index) => (
                    <li
                      key={index}
                      className={`${index===0?"":"border-r-[1px] border-primary pr-3" }`}
                    >
                      {locale === "ar" ? amenity?.name?.ar : amenity?.name?.en}
                    </li>
                  ))}
                </ul>
              ) : (
                ""
              )}

              <div className="flex justify-end">
                <div className="flex hover:scale-110 duration-100  items-center  gap-1  ">
                  <span className=" text-[#707070] text-[12px]">{t("property.More_Details")}</span>
                 {locale==="ar"?<MdKeyboardArrowLeft className="text-[#707070]" />:  <MdKeyboardArrowRight className="text-[#707070]" />}
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}

export default PropertyCard;
