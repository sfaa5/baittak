
import React from "react";

import Map from "@/components/Map";


import Image from "../Image";
import FormReq from "../FormReq";
import { getLocale, getTranslations } from "next-intl/server";
import Description from "../Description";

const URL_SERVER = process.env.NEXT_PUBLIC_URL_SERVER;


async function Page({ params }: { params: Promise<{ id: string }> }) {


  const id = (await params).id;

  console.log(id)
  const t = await getTranslations();
  const locale = await getLocale();

  const response = await fetch(`${URL_SERVER}/api/projects/${id}`)
  const data = await response.json();



  console.log("dddddddddddddddddddas",data)


  const {
    _id,
    title,
    city,

    address,
    des,
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
    user:{
      image:{url},
      companyName,
      phoneNumber,
      _id: userId,

    }
  }=data;


  const amenityIcon = (
    <svg
      width="13"
      height="13"
      viewBox="0 0 13 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_40_659)">
        <path
          d="M6.49992 11.9167C9.49146 11.9167 11.9166 9.49154 11.9166 6.49999C11.9166 3.50845 9.49146 1.08333 6.49992 1.08333C3.50838 1.08333 1.08325 3.50845 1.08325 6.49999C1.08325 9.49154 3.50838 11.9167 6.49992 11.9167Z"
          fill="#79B84E"
          stroke="black"
        />
        <path
          d="M4.604 6.77083L5.68734 7.85416L8.39567 5.14583"
          fill="#79B84E"
        />
        <path
          d="M4.604 6.77083L5.68734 7.85416L8.39567 5.14583"
          stroke="black"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_40_659">
          <rect width="13" height="13" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );

  const amenitiess = [
    { id: 1, name: t("Project.Balcony"), icon: amenityIcon },
    { id: 2, name: t("Project.Wi-Fi"), icon: amenityIcon },
    { id: 3, name: t("Project.Parking"), icon: amenityIcon },
    { id: 4, name: t("Project.Gym"), icon: amenityIcon },
    { id: 5, name: t("Project.Pool"), icon: amenityIcon },
  ];

  return (
    <div className="py-4 sm:container mx-auto px-2 lg:px-[120px]">
      {/* Project Header */}
      <div
        className={`flex flex-col h-36 sm:h-auto justify-between p-3 sm:p-7 w-full bg-gradient-to-r ${
          locale === "ar"
            ? "to-primary from-[1%] from-[#3C3D3C]/90"
            : "from-primary from-[33%] to-[#3C3D3C]"
        } rounded-[0.7rem]`}
      >
        <div className="flex items-center gap-3 sm:gap-8">
          <img
            src="/project/desktop (1) 1.png"
            alt="company"
            className="w-16 sm:w-24"
          />
          <div className="flex flex-col gap-3">
            <div className="flex gap-3 sm:gap-4 items-center">
              <p className="text-xs sm:text-base">{t("Project.By")} {companyName}</p>
              <p className="rounded-[0.6rem] text-xs sm:text-sm bg-white p-[1px] sm:px-2">
                {status}
              </p>
            </div>
            <h3 className="text-xl sm:text-2xl sm:text-secondary text-white font-semibold">
        {title}
            </h3>
          </div>
        </div>
        <div className="flex sm:flex-row w-full sm:justify-end">
          <p className="text-xl font-medium text-white">{t("Project.Price From")} {price} {t("propertyDetails.SAR")}</p>
        </div>
      </div>

      {/* Images & Form */}
      <div className="flex gap-10 mt-6">

          <Image images={images} />

        {/* Contact Form */}
        <FormReq agencyy={userId} _id={_id} title={title} phoneNumber={phoneNumber}/>

      </div>

      

      {/* About Section */}
      <div className="flex flex-col w-full lg:w-2/3 mt-12 lg:mt-24 mb-10">
        <h2 className="text-secondary text-2xl xs:text-3xl font-semibold mb-8">
          {t("Project.About Amjal AlYasmin Project")}
        </h2>


        <div className="grid grid-cols-2  gap-7 sm:grid-cols-3 md:gap-28 text-lg">
          {/* Column 1 */}
          <div className="flex flex-col gap-7">
            <div className="flex flex-col">
              <p className="text-gray-600">{t("Project.Price From")}</p>
              <p className="font-medium">{Number(price).toLocaleString()} {t("propertyDetails.SAR")}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-gray-600">{t("Project.Price To")}</p>
              <p className="font-medium">{Number(price).toLocaleString()} {t("propertyDetails.SAR")}</p>
            </div>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-7">
            <div className="flex flex-col">
              <p className="text-gray-600">{t("Project.Price per sqt")}</p>
              <p className="font-medium">{t("Project.Ask for price")}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-gray-600">{t("Project.Total units")}</p>
              <p className="font-medium">{units}</p>
            </div>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-7">
            <div className="flex flex-col">
              <p className="text-gray-600">{t("Project.Status")}</p>
              <p className="font-medium">{status==="Completed"&&locale==="ar"&&"مكتمل"}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-gray-600">{t("Project.Bedrooms")}</p>
              <p className="font-medium">{bedrooms} {t("Project.Bedrooms")}</p>
            </div>
          </div>
        </div>


      </div>

      {/* Map */}
      {/* <Map /> */}

      {/* Description */}
      <div className="w-full lg:w-2/3 mt-10">
        <h3 className="text-xl font-medium mb-3">{t("Project.DESCRIPTION")}</h3>
 <Description des={des}/>
      </div>

      {/* Amenities */}
      <div className="w-full lg:w-2/3 mt-10 mb-20">
        <h3 className="text-xl font-medium mb-5">{t("Project.AMENITIES")}</h3>
        <div className="grid grid-cols-4 gap-y-5 gap-x-3">
          {/* {amenities.map((amenity) => (
            <div key={amenity.id} className="flex gap-2 items-center">
              {amenity.icon}
              <span className="text-lg">{amenity.name}</span>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
}

export default Page;
