"use client";

import { FaWhatsapp } from "react-icons/fa";
import { FiMapPin, FiPhoneCall } from "react-icons/fi";
import { LiaBedSolid } from "react-icons/lia";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { PiBathtubLight } from "react-icons/pi";
import Link from "next/link";


import React, { useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Mail } from "./Mail";

import LikeButton from "./LikeButton";
import { Button } from "./ui/button";

import ShareButton from "./Share";
import { SlSizeFullscreen } from "react-icons/sl";
import { usePathname } from "next/navigation";

import Report from "./Report";


const RentalTypeTranslation = {
  Monthly: "شهريًّا",
  Yearly: "سنوياً",
};

const CurrencyTranslation = {
  USD: "دولار",
  IQD: "دينار عراقي",
  EUR: "يورو",
  SAR: "ريال سعودي",
  AED: "درهم",
  KWD: "دينار كويتي",
  QAR: "ريال قطري",
  OMR: "ريال عماني",
  BHD: "دينار بحريني",
  JOD: "دينار أردني",
};

const propertyTypeTranslations = {
  Apartment: "شقة",
  Villa: "فيلا",
  Farm: "مزرعة",
  "Rest-House": "استراحة",
  "Residential-Complex": "مجمع سكني",
  Duplex: "دوبلكس",
  Building: "عمارة بالكامل",
  "Hotel-Apartments": "فندق/شقق فندقية",
  Land: "ارض",
  "Full-Floor": "طابق كامل",
};

function PropertiesCard({ post }) {
  const locale = useLocale();

  const [showNumber, setShowNumber] = useState(false);
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const carouselRef = useRef<HTMLDivElement | null>(null);


  const t = useTranslations();

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

  console.log("post", post);

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
    for: purpose,
    currency,
    _id,
  } = post;

  console.log("userDetails", userDetails);
  console.log("CompanyImage", CompanyImage);

  return (
    <Link
      href={`/${locale}/Property/${_id}`}
      className="asChild flex flex-col pb-5 gap-3"
    >
      <div className=" hover:bg-gray-50  bg-white rounded-[.5rem] shadow-md overflow-hidden md:max-w-[100%] border-[1px]">
        <div className="md:flex flex-col md:flex-row">
          <div className="relative group">
            <div
              ref={carouselRef}
              className="flex overflow-x-hidden gap-4 md:max-w-[340px]" // Hides overflow to only show one image
              style={{ scrollSnapType: "x mandatory" }}
            >
              {images?.map((im, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-full snap-start" // Makes sure only one image shows up at a time
                >
                  <img
                    loading="lazy"
                    src={im?.url}
                    alt={`carousel image ${index + 1}`}
                    className="h-[250px]  md:h-[315px] lg:h-[280px] w-full md:w-100 object-cover"
                  />
                </div>
              ))}
            </div>
            <div onClick={(e)=>{e.preventDefault(); e.stopPropagation()}}> 
            <LikeButton propertyId={_id} />
            
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

          {/* details */}
          <div className="pt-5 pl-5 pr-5 flex flex-col gap-3 md:w-[60%] lg:w-[640px]">
            <div className="flex flex-col md:flex-row flex-wrap justify-between">
              <div className=" flex items-center gap-1">
                <div className="text-lg sm:text-3xl text-secondary font-semibold">
                  {new Intl.NumberFormat(locale, {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }).format(
                    price.toString().length > 7
                      ? Number(price.toString().slice(0, 7))
                      : Number(price)
                  )}
                </div>
                <div className="flex items-center justify-center">
                  {" "}
                  <span className="text-[14px] md:text-xl font-[500] text-secondary/80">
                    {locale === "ar" ? CurrencyTranslation[currency] : currency}
                  </span>
                  {purpose === "rent" && (
                    <span className="text-[#707070] text-sm sm:text-lg">
                      {" "}
                      /{" "}
                      {locale === "ar"
                        ? RentalTypeTranslation[rentaltype]
                        : rentaltype}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex gap-3 justify-center mt-3 text-sm sm:text-base">
                <div className="flex items-center gap-1">
                  <LiaBedSolid className="text-primary text-2xl" />
                  <span>
                    {bedrooms || 0} {t("property.rooms")}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <PiBathtubLight className="text-primary text-2xl" />
                  <span>
                    {bathrooms || "0"} {t("property.bath")}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <SlSizeFullscreen className="text-primary text-base " />{" "}
                  <span>
                    {area} m<sup>2</sup>{" "}
                  </span>
                </div>
              </div>
            </div>

            <div className="hidden  md:flex w-full justify-between mt-3 sm:mt-5">
              <p className=" mt-1 text-base  font-medium text-secondary">
                {locale === "en"
                  ? propertyType
                  : propertyTypeTranslations[propertyType] || propertyType}
              </p>
              <div className="flex items-center gap-2 text-[#707070]">
                <FiMapPin className="text-primary" />
                {address.split("").length > 6
                  ? address.split(" ").slice(0, 2).join(" ") +
                    " ... " +
                    address.split(" ").slice(-3).join(" ")
                  : address}
              </div>
            </div>

            <p className="text-secondary  font-semibold md:text-lg">
              {title.split(" ").length > 4
                ? title.split(" ").slice(0, 1).join(" ") +
                  " ... " +
                  title.split(" ").slice(-2).join(" ")
                : title}
            </p>

            {amenities ? (
              <ul className="flex gap-3 text-sm text-primary">
                {amenities.slice(0, 3).map((amenity, index) => (
                  <li
                    key={index}
                    className={`${
                      (index === 0 && locale === "ar") ||
                      (index === 2 && locale === "en")
                        ? ""
                        : "border-r-[1px] border-primary pr-3"
                    }`}
                  >
                    {locale === "ar" ? amenity?.name?.ar : amenity?.name?.en}
                  </li>
                ))}
              </ul>
            ) : (
              ""
            )}

            <div className="flex w-full  justify-between  pb-3 md:pb-0 mt-6">
              {/* contact */}
              <div className="flex gap-2 ">
                <Button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent the click from bubbling up to the Link
                    e.preventDefault();
                    setShowNumber(!showNumber);
                  }}
                  className="flex btn-border w-full h-[45px] gap-2 border-secondary border-[0.5px] bg-white hover:bg-gray-100 items-center font-semibold text-secondary rounded-[.8rem] justify-between px-3"
                >
                  <FiPhoneCall className="w-4 h-4" />
                  {showNumber ? userDetails[0]?.phoneNumber : t("contact.Call")}
                </Button>

                <div
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  {!pathname.includes("Agency") && (
                    <Mail ownerEmail={userDetails[0]?.email} title={title} />
                  )}
                </div>

                <Button
                  className="h-[45px] rounded-[.8rem]"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    if (userDetails[0]?.phoneNumber) {
                      window.open(
                        `https://wa.me/${userDetails[0]?.phoneNumber}`,
                        "_blank"
                      );
                    }
                  }}
                >
                  <FaWhatsapp className="w-4 h-4" />
                </Button>

                <ShareButton
                  propertyUrl={`https://baittak.vercel.app/Property/${_id}`}
                  propertyTitle={title}
                />

                <div
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <Report propertyId={_id} open={open} setOpen={setOpen} />
                </div>


              </div>

              {CompanyImage && (
                <img
                  src={CompanyImage}
                  alt="comoany"
                  className="hidden sm:flex w-10"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PropertiesCard;
