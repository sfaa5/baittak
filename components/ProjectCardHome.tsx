"use client";
import React, { useRef } from "react";
import { LiaBedSolid } from "react-icons/lia";

import { FiMapPin } from "react-icons/fi";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

import { useLocale, useTranslations } from "next-intl";

import Link from "next/link";

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



function ProjectCardHome({ property }) {


  const locale = useLocale();
 
  const t = useTranslations();

;

  const userImageUrl = property?.user[0].image?.url || null;



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
    <div className="relative w-full max-w-md mx-auto ">
      <Link href={`/Projects/${property._id}`}>
        <div className="bg-white hover:bg-gray-50 transform  duration-200 rounded-lg shadow-md overflow-hidden group">
          <div className="relative">
            <div className="hidden md:block absolute z-10 text-white text-[12px] px-2 py-1 top-3 left-0">
              {userImageUrl && (
                <img
                  src={userImageUrl}
                  alt="company"
                  className="w-[50px] h-auto max-h-[50px] object-contain rounded-md"
                />
              )}
            </div>

            <div
              ref={carouselRef}
              className="flex overflow-x-hidden gap-4 w-full"
              style={{ scrollSnapType: "x mandatory" }}
            >
              {property.images?.map((im, index) => (
                <div
                  key={index}
                  className="relative flex-shrink-0 w-full snap-start"
                >
                  <img
                    loading="lazy"
                    src={im?.url}
                    alt={`carousel image ${index + 1}`}
                    className="w-full h-64 object-cover"
                  />

                </div>
              ))}
            </div>

            <button
              onClick={scrollPrev}
              className="absolute text-xl left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 hover:bg-black hover:scale-105 transition-all duration-300"
            >
              <MdKeyboardArrowLeft className="w-6 h-6" />
            </button>

            <button
              onClick={scrollNext}
              className="absolute text-xl right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 hover:bg-black hover:scale-105 transition-all duration-300"
            >
              <MdKeyboardArrowRight className="w-6 h-6" />
            </button>
          </div>

          <div className="p-2 pt-3 flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <div className="text-xl font-semibold  text-secondary items-baseline flex  gap-1">
                <span className="font-medium text-sm  ">From</span>
                <span>
                  {new Intl.NumberFormat(locale, {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }).format(
                    property.price.toString().length > 7
                      ? Number(property.price.toString().slice(0, 7))
                      : property.price
                  )}
                </span>

                <span className="text-[14px]">
                  {locale === "ar"
                    ? CurrencyTranslation[property?.currency]
                    : property?.currency}
                </span>
              </div>

              <div className="flex items-center gap-1 ">
                <LiaBedSolid className="text-primary text-xl" />
                <span className="text-black-100 text-sm">
                  {property.bedrooms}
                </span>
              </div>
            </div>

            {/* address */}
            <div className="flex items-center gap-2 text-sm text-[#707070]">
              <FiMapPin className="" />
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
                    className={`${
                      (locale === "ar" && index === 0) ||
                      (locale === "en" &&
                        index === property.amenities.length - 1)
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

            <div className="flex justify-end">
              <div className="flex hover:scale-110 duration-100 items-center gap-1">
                <span className="text-[#707070] text-[12px]">
                  {t("property.More_Details")}
                </span>
                {locale === "ar" ? (
                  <MdKeyboardArrowLeft className="text-[#707070]" />
                ) : (
                  <MdKeyboardArrowRight className="text-[#707070]" />
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProjectCardHome;
