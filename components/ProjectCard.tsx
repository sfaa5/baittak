

import { getTranslations } from "next-intl/server";
import Link from "next/link";
import React from 'react'
import { CiHeart } from 'react-icons/ci'
import { FiMapPin } from 'react-icons/fi'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import { getLocale } from "next-intl/server";
import ImgeCard from "./ImgeCard";

async function ProjectCard({post}) {

  const t = await getTranslations()
  const locale = await getLocale();
// console.log("postCard",post)
  const {
    _id,
    title,
    city,
    user,
    address,

    price,
    firstPayment,
    annualInterest,
    installmentPeriod,
    priceM,
    bedrooms,
    status,
    amenities,
    images,
    units,

  }=post;

  console.log("possst",post)

console.log("city",city)

// Safely access the first user object in the array
const userObject = Array.isArray(user) && user.length > 0 ? user[0] : {};
const userImageUrl = userObject?.image?.url || null;
const companyName = userObject?.companyName || "Unknown Company";

console.log("User Object:", userObject);
console.log("User Image URL:", userImageUrl);
console.log("Company Name:", companyName);

  return (
    <div className=" max-w-md mx-auto bg-white rounded-[.5rem] shadow-md overflow-hidden md:max-w-[100%] border-[1px]"
    
    >
      <Link  href={`/Projects/${_id}`} > 




    <div className=" md:flex flex-col md:flex-row">




<ImgeCard img={images}/>



    

    {/* details */}
    <div className="pt-5 pl-5 pr-5 flex flex-col gap-3 lg:w-[650px]">

      <h3 className="text-xl text-secondary font-medium">{t("project.address")}:{address} </h3>
      <div className="flex w-full justify-between">
        <p className="text-gray-400 font-medium text-lg">By {companyName}</p>
        <div className="flex gap-2 items-center">
          
          <p className="text-gray-400 text-lg font-medium">{t("project.StartingFrom")} </p>
          <p className="text-secondary text-lg font-medium"> {Number(price).toLocaleString()}</p>
        </div>
      </div>


    <ul className="flex gap-3  text-secondary">
    <li dir={`${locale === "ar" ? "rtl" : "ltr"}`} className="border-r-[1px] border-secondary pr-3">
  {locale === "ar"
    ? `${t("project.FIRSTPAYMENT")} ${Number(firstPayment).toLocaleString()}`
    : `${Number(firstPayment).toLocaleString()} ${t("project.FIRSTPAYMENT")}`}
</li>
      <li className="border-r-[0.1px]  border-secondary pr-3">{annualInterest}% {t("project.MONTHLY")}</li>
      <li className="border-r-[0.1px] border-secondary  pr-3">{installmentPeriod} {t("project.YEARS")}</li>
    </ul>

   
    <div className="flex items-center gap-2 text-[#707070]">
      <FiMapPin className="text-primary" /> { locale==="ar"?city[0].name.ar:city[0].name.en}
    </div>

    <p className="text-secondary font-semibold text-lg">
    {title}
  </p>


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
              <div className=""></div>
            )}

<div className="flex w-auto justify-end">
{userImageUrl ? (
                <img
                  src={userImageUrl}
                  alt="company"
                  className="w-20 mb-4 sm:flex"
                />
              ) : (
                <div className="text-gray-400">No image available</div>
              )}
</div>
  

    </div>
  </div>
  </Link>
  </div>
  )
}

export default ProjectCard