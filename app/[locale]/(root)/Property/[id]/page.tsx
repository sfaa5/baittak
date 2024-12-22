
import Link from "next/link";
import React from "react";
import { getTranslations } from "next-intl/server";
import { FaWhatsapp } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";
import { getLocale } from "next-intl/server";
import { IoHomeSharp, IoMailOutline } from "react-icons/io5";
import { LiaBedSolid } from "react-icons/lia";
import { MdArrowForwardIos } from "react-icons/md";
import { PiBathtubLight } from "react-icons/pi";
import { SlSizeFullscreen } from "react-icons/sl";

import ContactDesk from "@/components/ContactDesk";
import ImageModel from "@/components/ImageModel";


async function Page({ params }: { params: Promise<{ id: string }> }) {
type amenity ={
  name:{
    en:string,
    ar:string
  },
  svg: string
}

  const locale = await getLocale();

  const t = await getTranslations();
  const id = (await params).id;
  console.log(
    "iam hereeeeeeeeeee",id);

    const response = await fetch(`http://localhost:5001/api/properties/${id}`);
    const data = await response.json();

  const {
 user,
    title,
    price,
    address,
    img,
    bathrooms,
    bedrooms,
    amenities,
    area,
    des,
    landNumber,

    plotLength,


  } = data;

  console.log(data)

  // interface PropertyData {
  //   title: string;
  //   price: number;
  //   address: string;
  //   img: string[];
  //   bathrooms: number;
  //   bedrooms: number;
  //   amenities: Amenity[];
  //   area: number;
  //   des: string;
  //   landNumber: string;
  //   plotLength: number;
  // }

  interface Amenity {
    name: {
      en: string;
      ar: string;
    };
    svg: string;
  }

  console.log(amenities?.map((item: Amenity) => item.name.en));


  return (
    <div className="py-10 md:container mx-auto px-0 lg:px-[120px] ">
      {/* path */}
      <ul className="flex items-center gap-2 mb-5">
        <li className="flex gap-3">
          <Link href={"/"}>
            <IoHomeSharp className="text-secondary" />
          </Link>

          <MdArrowForwardIos className="text-[#707070]" />
        </li>

        <li className="text-[#707070] flex gap-3 items-center">
          <Link href={"/Property"}>{t("header.properties")}</Link>
          <MdArrowForwardIos className="text-[#707070]" />
        </li>

        <li className="text-[#707070] flex gap-3 items-center">
          {t("property.properties_title")}
        </li>
      </ul>

      {/* images */}
      <div>
        {/* Images for desktop */}
<ImageModel img={img} />

        {/* Mobile design */}
        <div className="flex gap-4 overflow-x-auto hide-scrollbar  mt-5 sm:hidden">
          {img.map((im: string, key: React.Key ) => (
            <img
              key={key}
              src={`http://localhost:5001${im}`}
              alt={`property image ${key}`}
              className="flex-shrink-0 w-full h-[300px] object-cover rounded-xl"
            />
          ))}
        </div>

      </div>

      <div className="flex justify-between flex-col items-center w-full mt-8 gap-10">
        <div className="w-full flex flex-col md:flex-row ">
          {/* details */}
          <div className="flex  md:justify-between md:flex-row flex-col items-center md:w-2/3">
            <h3 className="font-bold text-3xl text-secondary">
              {t("propertyDetails.SAR")} {price}
            </h3>

            <div className="flex gap-6  mt-3">
              <div className="flex items-center gap-2">
                <LiaBedSolid className="text-primary text-3xl" />
                <span className="text-gray-600">
                  {bedrooms} {t("propertyDetails.rooms")}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <PiBathtubLight className="text-primary text-3xl" />
                <span className="text-gray-600">
                  {bathrooms} {t("propertyDetails.bath")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <SlSizeFullscreen className="text-primary text-2xl " />
                <span className="text-gray-600">
                  {area}m<sup>2</sup>
                </span>
              </div>
            </div>
          </div>

          {/* contact Desktop */}
<ContactDesk user={user}/>

          {/* contact Mobile */}
          <div className="mobile-buttons md:hidden fixed bottom-0 left-0 w-full bg-white flex gap-2 p-2 ">
            <button className="flex w-full h-[45px] gap-2 items-center font-semibold bg-red-500 text-white rounded-[.8rem] justify-between px-3">
              <FiPhoneCall className="w-5 h-5" />
              Call
            </button>
            <button className="flex gap-2 w-full h-[45px] items-center font-semibold bg-[#1F4454] bg-opacity-25 text-secondary rounded-[.8rem] justify-between px-3">
              <IoMailOutline className="w-5 h-5" />
              Mail
            </button>
            <button className="flex gap-5 w-ful h-[45px] items-center font-semibold bg-primary bg-opacity-60 text-black rounded-[.8rem] justify-between px-3">
              <FaWhatsapp className="w-5 h-5" />
              Whatsup
            </button>
          </div>
        </div>

        {/* deep details */}
        <div className="w-full flex flex-col gap-10 justify-start">
          {/* describtion */}
          <div className="flex flex-col md:w-2/3 px-3">
            <p className="text-lg text-gray-500">
             {address}
            </p>
            <h3 className="text-2xl font-medium mb-7">
              {title}
            </h3>
            <p style={{ whiteSpace: "pre-line" }}>
            {des}
            </p>

            <a className="mt-5 underline hover:text-primary" href="">
              {t("propertyDetails.Read more")}
            </a>
          </div>

          {/* property details */}
          <div className=" md:w-2/3 bg-gray-100 rounded-[.3rem] p-5 ">
            <h3 className="text-2xl mb-9 text-secondary">
              {t("propertyDetails.property details")}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
              <div className="flex gap-14">
                {/* icons */}
                <div className="flex flex-col gap-4">
                  <div className="flex  gap-2">
                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none">
                      <path
                        d="M7 9.1101L7.01 9.0991M11 9.1101L11.01 9.0991M7 13.1101L7.01 13.0991M11 13.1101L11.01 13.0991M7 17.1101L7.01 17.0991M11 17.1101L11.01 17.0991M15 21.1001H3.6C3.44087 21.1001 3.28826 21.0369 3.17574 20.9244C3.06321 20.8118 3 20.6592 3 20.5001V5.7001C3 5.54097 3.06321 5.38836 3.17574 5.27583C3.28826 5.16331 3.44087 5.1001 3.6 5.1001H9V3.7001C9 3.54097 9.06321 3.38836 9.17574 3.27583C9.28826 3.16331 9.44087 3.1001 9.6 3.1001H14.4C14.5591 3.1001 14.7117 3.16331 14.8243 3.27583C14.9368 3.38836 15 3.54097 15 3.7001V9.1001M15 21.1001H20.4C20.5591 21.1001 20.7117 21.0369 20.8243 20.9244C20.9368 20.8118 21 20.6592 21 20.5001V9.7001C21 9.54097 20.9368 9.38835 20.8243 9.27583C20.7117 9.16331 20.5591 9.1001 20.4 9.1001H15M15 21.1001V17.1001M15 9.1001V13.1001M15 17.1001V13.1001M15 17.1001H17M15 13.1001H17"
                        stroke="#858F96"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    <span className="text-gray-900">
                      {t("propertyDetails.Property Type")}
                    </span>
                  </div>

                  <div className="flex  gap-2">
                    <svg
                      width="24"
                      height="25"
                      viewBox="0 0 24 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 5.1001C7.5 5.1001 7 5.3101 6.61 5.7001C6.22 6.0901 6 6.5501 6 7.1001V10.1001C5.47 10.1001 5 10.2901 4.59 10.6901C4.18 11.0901 4 11.5701 4 12.1001V17.1001H5.34L6 19.1001H7L7.69 17.1001H16.36L17 19.1001H18L18.66 17.1001H20V12.1001C20 11.5701 19.81 11.1001 19.41 10.6901C19.01 10.2801 18.53 10.1001 18 10.1001V7.1001C18 6.5501 17.8 6.1001 17.39 5.7001C16.98 5.3001 16.5 5.1001 16 5.1001M8 7.1001H11V10.1001H8M13 7.1001H16V10.1001H13M6 12.1001H18V15.1001H6V12.1001Z"
                        fill="#858F96"
                      />
                    </svg>

                    <span className="text-gray-900">
                      {t("propertyDetails.Bedrooms")}
                    </span>
                  </div>

                  <div className="flex  gap-2">
                    <svg
                      width="24"
                      height="25"
                      viewBox="0 0 24 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_178_4011)">
                        <path
                          d="M8 3.1001H15V0.600098L18.5 4.1001L15 7.6001V5.1001H8V7.6001L4.5 4.1001L8 0.600098V3.1001ZM3 17.1001V6.6001H5V17.1001C5 17.6305 5.21071 18.1392 5.58579 18.5143C5.96086 18.8894 6.46957 19.1001 7 19.1001H17.5V21.1001H7C5.93913 21.1001 4.92172 20.6787 4.17157 19.9285C3.42143 19.1784 3 18.161 3 17.1001ZM21 16.1001V9.1001H23.5L20 5.6001L16.5 9.1001H19V16.1001H16.5L20 19.6001L23.5 16.1001H21Z"
                          fill="#858F96"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_178_4011">
                          <rect
                            width="24"
                            height="24"
                            fill="white"
                            transform="translate(0 0.100098)"
                          />
                        </clipPath>
                      </defs>
                    </svg>

                    <span className="text-gray-900">
                      {t("propertyDetails.Plot length")}
                    </span>
                  </div>

                  <div className="flex  gap-2">
                    <svg
                      width="24"
                      height="25"
                      viewBox="0 0 24 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7 9.1101L7.01 9.0991M11 9.1101L11.01 9.0991M7 13.1101L7.01 13.0991M11 13.1101L11.01 13.0991M7 17.1101L7.01 17.0991M11 17.1101L11.01 17.0991M15 21.1001H3.6C3.44087 21.1001 3.28826 21.0369 3.17574 20.9244C3.06321 20.8118 3 20.6592 3 20.5001V5.7001C3 5.54097 3.06321 5.38836 3.17574 5.27583C3.28826 5.16331 3.44087 5.1001 3.6 5.1001H9V3.7001C9 3.54097 9.06321 3.38836 9.17574 3.27583C9.28826 3.16331 9.44087 3.1001 9.6 3.1001H14.4C14.5591 3.1001 14.7117 3.16331 14.8243 3.27583C14.9368 3.38836 15 3.54097 15 3.7001V9.1001M15 21.1001H20.4C20.5591 21.1001 20.7117 21.0369 20.8243 20.9244C20.9368 20.8118 21 20.6592 21 20.5001V9.7001C21 9.54097 20.9368 9.38835 20.8243 9.27583C20.7117 9.16331 20.5591 9.1001 20.4 9.1001H15M15 21.1001V17.1001M15 9.1001V13.1001M15 17.1001V13.1001M15 17.1001H17M15 13.1001H17"
                        stroke="#858F96"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    <span className="text-gray-900">
                      {t("propertyDetails.Street Width")}
                    </span>
                  </div>

                  <div className="flex  gap-2">
                    <svg
                      width="20"
                      height="22"
                      viewBox="0 0 20 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0 0.850098L8 4.1831V9.3501H20V21.3501H0V0.850098ZM8 11.3501V19.3501H10V14.3501H16V19.3501H18V11.3501H8ZM14 19.3501V16.3501H12V19.3501H14ZM6 19.3501V5.5171L2 3.8501V19.3501H6Z"
                        fill="#858F96"
                      />
                    </svg>

                    <span className="text-gray-900">
                      {t("propertyDetails.Property Age")}
                    </span>
                  </div>

                  <div className="flex  gap-2">
                    <svg
                      width="24"
                      height="25"
                      viewBox="0 0 24 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_178_4028)">
                        <g filter="url(#filter0_d_178_4028)">
                          <path
                            d="M13.7968 2.89746C12.5989 2.89746 11.4501 3.37331 10.6031 4.22031C9.75612 5.06732 9.28027 6.21611 9.28027 7.41396C9.28027 10.949 12.7288 15.202 13.6323 16.2465C13.6809 16.3017 13.7494 16.3356 13.8229 16.3408C13.8963 16.3459 13.9689 16.3219 14.0248 16.274L14.0523 16.2465C14.9438 15.198 18.3138 10.9485 18.3138 7.41396C18.3138 6.8208 18.1969 6.23346 17.9699 5.68546C17.7429 5.13746 17.4102 4.63954 16.9907 4.22014C16.5713 3.80073 16.0733 3.46806 15.5253 3.24112C14.9773 3.01417 14.3899 2.8974 13.7968 2.89746ZM13.7968 9.32496C13.3583 9.32486 12.9298 9.19477 12.5653 8.95112C12.2008 8.70748 11.9167 8.36122 11.7489 7.95614C11.5812 7.55106 11.5373 7.10533 11.6229 6.67532C11.7085 6.24531 11.9196 5.85033 12.2296 5.54031C12.5396 5.23028 12.9346 5.01914 13.3646 4.93358C13.7946 4.84803 14.2404 4.89189 14.6455 5.05962C15.0505 5.22736 15.3968 5.51144 15.6404 5.87595C15.8841 6.24046 16.0142 6.66902 16.0143 7.10746V7.11296C16.0129 7.70017 15.7787 8.26286 15.363 8.67756C14.9473 9.09226 14.384 9.3251 13.7968 9.32496Z"
                            stroke="#858F96"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            shapeRendering="crispEdges"
                          />
                        </g>
                        <path
                          d="M18.227 8.43893L18.8145 8.39893L21.25 20.4034L16.188 21.3024M16.188 21.3024L8.2305 20.4614L2.75 21.3024L4.229 8.97893L8.7235 8.39893M16.188 21.3024L15.333 14.5909M8.7235 8.39893L9.368 8.43093M8.7235 8.39893L8.4025 20.4799"
                          stroke="#858F96"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <filter
                          id="filter0_d_178_4028"
                          x="4.53027"
                          y="2.14746"
                          width="18.5332"
                          height="22.9438"
                          filterUnits="userSpaceOnUse"
                          colorInterpolationFilters="sRGB"
                        >
                          <feFlood
                            floodOpacity="0"
                            result="BackgroundImageFix"
                          />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="4" />
                          <feGaussianBlur stdDeviation="2" />
                          <feComposite in2="hardAlpha" operator="out" />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_178_4028"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_178_4028"
                            result="shape"
                          />
                        </filter>
                        <clipPath id="clip0_178_4028">
                          <rect
                            width="24"
                            height="24"
                            fill="white"
                            transform="translate(0 0.100098)"
                          />
                        </clipPath>
                      </defs>
                    </svg>

                    <span className="text-gray-900">
                      {t("propertyDetails.City")}
                    </span>
                  </div>
                  <div className="flex  gap-2">
                    <svg
                      width="24"
                      height="25"
                      viewBox="0 0 24 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_178_4028)">
                        <g filter="url(#filter0_d_178_4028)">
                          <path
                            d="M13.7968 2.89746C12.5989 2.89746 11.4501 3.37331 10.6031 4.22031C9.75612 5.06732 9.28027 6.21611 9.28027 7.41396C9.28027 10.949 12.7288 15.202 13.6323 16.2465C13.6809 16.3017 13.7494 16.3356 13.8229 16.3408C13.8963 16.3459 13.9689 16.3219 14.0248 16.274L14.0523 16.2465C14.9438 15.198 18.3138 10.9485 18.3138 7.41396C18.3138 6.8208 18.1969 6.23346 17.9699 5.68546C17.7429 5.13746 17.4102 4.63954 16.9907 4.22014C16.5713 3.80073 16.0733 3.46806 15.5253 3.24112C14.9773 3.01417 14.3899 2.8974 13.7968 2.89746ZM13.7968 9.32496C13.3583 9.32486 12.9298 9.19477 12.5653 8.95112C12.2008 8.70748 11.9167 8.36122 11.7489 7.95614C11.5812 7.55106 11.5373 7.10533 11.6229 6.67532C11.7085 6.24531 11.9196 5.85033 12.2296 5.54031C12.5396 5.23028 12.9346 5.01914 13.3646 4.93358C13.7946 4.84803 14.2404 4.89189 14.6455 5.05962C15.0505 5.22736 15.3968 5.51144 15.6404 5.87595C15.8841 6.24046 16.0142 6.66902 16.0143 7.10746V7.11296C16.0129 7.70017 15.7787 8.26286 15.363 8.67756C14.9473 9.09226 14.384 9.3251 13.7968 9.32496Z"
                            stroke="#858F96"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            shapeRendering="crispEdges"
                          />
                        </g>
                        <path
                          d="M18.227 8.43893L18.8145 8.39893L21.25 20.4034L16.188 21.3024M16.188 21.3024L8.2305 20.4614L2.75 21.3024L4.229 8.97893L8.7235 8.39893M16.188 21.3024L15.333 14.5909M8.7235 8.39893L9.368 8.43093M8.7235 8.39893L8.4025 20.4799"
                          stroke="#858F96"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <filter
                          id="filter0_d_178_4028"
                          x="4.53027"
                          y="2.14746"
                          width="18.5332"
                          height="22.9438"
                          filterUnits="userSpaceOnUse"
                          colorInterpolationFilters="sRGB"
                        >
                          <feFlood
                            floodOpacity="0"
                            result="BackgroundImageFix"
                          />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="4" />
                          <feGaussianBlur stdDeviation="2" />
                          <feComposite in2="hardAlpha" operator="out" />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_178_4028"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_178_4028"
                            result="shape"
                          />
                        </filter>
                        <clipPath id="clip0_178_4028">
                          <rect
                            width="24"
                            height="24"
                            fill="white"
                            transform="translate(0 0.100098)"
                          />
                        </clipPath>
                      </defs>
                    </svg>

                    <span className="text-gray-900">
                      {t("propertyDetails.Disrtict")}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <svg
                      width="24"
                      height="25"
                      viewBox="0 0 24 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14 2.1001H6C5.46957 2.1001 4.96086 2.31081 4.58579 2.68588C4.21071 3.06096 4 3.56966 4 4.1001V20.1001C4 20.6305 4.21071 21.1392 4.58579 21.5143C4.96086 21.8894 5.46957 22.1001 6 22.1001H18C18.5304 22.1001 19.0391 21.8894 19.4142 21.5143C19.7893 21.1392 20 20.6305 20 20.1001V8.1001L14 2.1001ZM18 20.1001H6V4.1001H13V9.1001H18V20.1001Z"
                        fill="#858F96"
                      />
                    </svg>
                    <span className="text-gray-900">
                      {t("propertyDetails.Land Number")}
                    </span>
                  </div>
                </div>
                {/* info */}
                <div className="flex  flex-col gap-4">
                  <span className="font-medium">
                    {t("propertyDetails.Apartment")}
                  </span>
                  <span className="font-medium">{bedrooms||"-"}</span>
                  <span className="font-medium">-</span>
                  <span className="font-medium">-</span>
                  <span className="font-medium">
                    {t("propertyDetails.New")}
                  </span>
                  <span className="font-medium">
                    {t("propertyDetails.Jeddah")}
                  </span>
                  <span className="font-medium">
                    {t("propertyDetails.Al Wahah")}
                  </span>
                  <span className="font-medium">{landNumber||"-"}</span>
                </div>
              </div>

              <div className="flex gap-14">
                {/* icons */}
                <div className="flex flex-col gap-4">
                  <div className="flex gap-2">
                    <svg
                      width="24"
                      height="25"
                      viewBox="0 0 24 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.75 5.3501H1.5C1.40054 5.3501 1.30516 5.38961 1.23483 5.45993C1.16451 5.53026 1.125 5.62564 1.125 5.7251V21.8501C1.125 21.9496 1.16451 22.0449 1.23483 22.1153C1.30516 22.1856 1.40054 22.2251 1.5 22.2251H18.75C18.8495 22.2251 18.9448 22.1856 19.0152 22.1153C19.0855 22.0449 19.125 21.9496 19.125 21.8501V5.7251C19.125 5.62564 19.0855 5.53026 19.0152 5.45993C18.9448 5.38961 18.8495 5.3501 18.75 5.3501ZM3.75 6.1001H5.25V9.8501H3.75V6.1001ZM1.875 6.1001H3V10.2251C3 10.3246 3.03951 10.4199 3.10984 10.4903C3.18016 10.5606 3.27554 10.6001 3.375 10.6001H5.625C5.72446 10.6001 5.81984 10.5606 5.89016 10.4903C5.96049 10.4199 6 10.3246 6 10.2251V6.1001H7.125V21.4751H1.875V6.1001ZM18.375 21.4751H7.875V6.1001H18.375V21.4751Z"
                        fill="#858F96"
                      />
                      <path
                        d="M16.875 19.9751H17.625V20.7251H16.875V19.9751Z"
                        fill="#858F96"
                      />
                      <path
                        d="M15.375 19.9751H16.125V20.7251H15.375V19.9751Z"
                        fill="#858F96"
                      />
                      <path
                        d="M13.875 19.9751H14.625V20.7251H13.875V19.9751Z"
                        fill="#858F96"
                      />
                      <path
                        d="M11.25 9.8501H15C15.2984 9.8501 15.5845 9.73157 15.7955 9.52059C16.0065 9.30961 16.125 9.02347 16.125 8.7251C16.125 8.42673 16.0065 8.14058 15.7955 7.9296C15.5845 7.71862 15.2984 7.6001 15 7.6001H11.25C10.9516 7.6001 10.6655 7.71862 10.4545 7.9296C10.2435 8.14058 10.125 8.42673 10.125 8.7251C10.125 9.02347 10.2435 9.30961 10.4545 9.52059C10.6655 9.73157 10.9516 9.8501 11.25 9.8501ZM11.25 8.3501H15C15.0995 8.3501 15.1948 8.38961 15.2652 8.45993C15.3355 8.53026 15.375 8.62564 15.375 8.7251C15.375 8.82455 15.3355 8.91994 15.2652 8.99026C15.1948 9.06059 15.0995 9.1001 15 9.1001H11.25C11.1505 9.1001 11.0552 9.06059 10.9848 8.99026C10.9145 8.91994 10.875 8.82455 10.875 8.7251C10.875 8.62564 10.9145 8.53026 10.9848 8.45993C11.0552 8.38961 11.1505 8.3501 11.25 8.3501Z"
                        fill="#858F96"
                      />
                      <path
                        d="M22.875 6.1001V5.3501H19.875V6.1001H21V21.4751H19.875V22.2251H22.875V21.4751H21.75V6.1001H22.875Z"
                        fill="#858F96"
                      />
                      <path
                        d="M18.375 2.7251H7.875V1.6001H7.125V2.7251H1.875V1.6001H1.125V4.6001H1.875V3.4751H7.125V4.6001H7.875V3.4751H18.375V4.6001H19.125V1.6001H18.375V2.7251Z"
                        fill="#858F96"
                      />
                    </svg>

                    <span className="text-gray-900">
                      {t("propertyDetails.Property Size")}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <svg
                      width="24"
                      height="25"
                      viewBox="0 0 24 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 5.1001C7.5 5.1001 7 5.3101 6.61 5.7001C6.22 6.0901 6 6.5501 6 7.1001V10.1001C5.47 10.1001 5 10.2901 4.59 10.6901C4.18 11.0901 4 11.5701 4 12.1001V17.1001H5.34L6 19.1001H7L7.69 17.1001H16.36L17 19.1001H18L18.66 17.1001H20V12.1001C20 11.5701 19.81 11.1001 19.41 10.6901C19.01 10.2801 18.53 10.1001 18 10.1001V7.1001C18 6.5501 17.8 6.1001 17.39 5.7001C16.98 5.3001 16.5 5.1001 16 5.1001M8 7.1001H11V10.1001H8M13 7.1001H16V10.1001H13M6 12.1001H18V15.1001H6V12.1001Z"
                        fill="#858F96"
                      />
                    </svg>

                    <span className="text-gray-900">
                      {t("propertyDetails.Bathrooms")}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <svg
                      width="24"
                      height="25"
                      viewBox="0 0 24 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_178_4011)">
                        <path
                          d="M8 3.1001H15V0.600098L18.5 4.1001L15 7.6001V5.1001H8V7.6001L4.5 4.1001L8 0.600098V3.1001ZM3 17.1001V6.6001H5V17.1001C5 17.6305 5.21071 18.1392 5.58579 18.5143C5.96086 18.8894 6.46957 19.1001 7 19.1001H17.5V21.1001H7C5.93913 21.1001 4.92172 20.6787 4.17157 19.9285C3.42143 19.1784 3 18.161 3 17.1001ZM21 16.1001V9.1001H23.5L20 5.6001L16.5 9.1001H19V16.1001H16.5L20 19.6001L23.5 16.1001H21Z"
                          fill="#858F96"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_178_4011">
                          <rect
                            width="24"
                            height="24"
                            fill="white"
                            transform="translate(0 0.100098)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                    <span className="text-gray-900">
                      {t("propertyDetails.Plot width")}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <svg
                      width="20"
                      height="22"
                      viewBox="0 0 20 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0 0.850098L8 4.1831V9.3501H20V21.3501H0V0.850098ZM8 11.3501V19.3501H10V14.3501H16V19.3501H18V11.3501H8ZM14 19.3501V16.3501H12V19.3501H14ZM6 19.3501V5.5171L2 3.8501V19.3501H6Z"
                        fill="#858F96"
                      />
                    </svg>
                    <span className="text-gray-900">
                      {t("propertyDetails.Facade")}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <svg
                      width="24"
                      height="25"
                      viewBox="0 0 24 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14 17.1001H20M4 4.1001H10V10.1001H4V4.1001ZM14 4.1001H20V10.1001H14V4.1001ZM4 14.1001H10V20.1001H4V14.1001Z"
                        stroke="#858F96"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-gray-900">
                      {t("propertyDetails.Category")}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <svg
                      width="24"
                      height="25"
                      viewBox="0 0 24 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.7968 2.89746C12.5989 2.89746 11.4501 3.37331 10.6031 4.22031C9.75612 5.06732 9.28027 6.21611 9.28027 7.41396C9.28027 10.949 12.7288 15.202 13.6323 16.2465C13.6809 16.3017 13.7494 16.3356 13.8229 16.3408C13.8963 16.3459 13.9689 16.3219 14.0248 16.274L14.0523 16.2465C14.9438 15.198 18.3138 10.9485 18.3138 7.41396C18.3138 6.8208 18.1969 6.23346 17.9699 5.68546C17.7429 5.13746 17.4102 4.63954 16.9907 4.22014C16.5713 3.80073 16.0733 3.46806 15.5253 3.24112C14.9773 3.01417 14.3899 2.8974 13.7968 2.89746ZM13.7968 9.32496C13.3583 9.32486 12.9298 9.19477 12.5653 8.95112C12.2008 8.70748 11.9167 8.36122 11.7489 7.95614C11.5812 7.55106 11.5373 7.10533 11.6229 6.67532C11.7085 6.24531 11.9196 5.85033 12.2296 5.54031C12.5396 5.23028 12.9346 5.01914 13.3646 4.93358C13.7946 4.84803 14.2404 4.89189 14.6455 5.05962C15.0505 5.22736 15.3968 5.51144 15.6404 5.87595C15.8841 6.24046 16.0142 6.66902 16.0143 7.10746V7.11296C16.0129 7.70017 15.7787 8.26286 15.363 8.67756C14.9473 9.09226 14.384 9.3251 13.7968 9.32496Z"
                        stroke="black"
                        strokeWidth="0.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M18.227 8.43893L18.8145 8.39893L21.25 20.4034L16.188 21.3024M16.188 21.3024L8.2305 20.4614L2.75 21.3024L4.229 8.97893L8.7235 8.39893M16.188 21.3024L15.333 14.5909M8.7235 8.39893L9.368 8.43093M8.7235 8.39893L8.4025 20.4799"
                        stroke="black"
                        strokeWidth="0.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-gray-900">
                      {t("propertyDetails.Area")}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <svg
                      width="24"
                      height="25"
                      viewBox="0 0 24 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14 2.1001H6C5.46957 2.1001 4.96086 2.31081 4.58579 2.68588C4.21071 3.06096 4 3.56966 4 4.1001V20.1001C4 20.6305 4.21071 21.1392 4.58579 21.5143C4.96086 21.8894 5.46957 22.1001 6 22.1001H18C18.5304 22.1001 19.0391 21.8894 19.4142 21.5143C19.7893 21.1392 20 20.6305 20 20.1001V8.1001L14 2.1001ZM18 20.1001H6V4.1001H13V9.1001H18V20.1001Z"
                        fill="#858F96"
                      />
                    </svg>
                    <span className="text-gray-900">
                      {t("propertyDetails.plot Number")}
                    </span>
                  </div>
                </div>
                {/* info */}
                <div className="flex  flex-col gap-4">
                  <span className="font-medium">
                  {area || "-"} {t("propertyDetails.sqr")}
                  </span>
                  <span className="font-medium">{bathrooms || "-"}</span>
                  <span className="font-medium">{plotLength || "-"}</span>
                  <span className="font-medium">
                    {t("propertyDetails.West")}
                  </span>
                  <span className="font-medium">
                    {t("propertyDetails.Residential for sale")}
                  </span>
                  <span className="font-medium">
                    {t("propertyDetails.Makkah Al Mukarramah")}
                  </span>
                  <span className="font-medium">
                    {t("propertyDetails.Al Wahah")}
                  </span>
                </div>
              </div>
            </div>
          </div>




          <div className=" md:w-2/3 bg-gray-100 rounded-[.3rem] p-5 ">
          <h3 className="text-2xl mb-9 text-secondary">المزايا</h3>
          <div className="grid grid-cols-3 gap-y-8">
  {amenities.map((amenity:amenity, inx:number) => (
    <div key={inx} className="flex gap-2 items-center">
      <img
        src={`http://localhost:5001${amenity.svg}`}
        alt={`amenity image ${inx}`} // Fixed reference to `inx`
        className="w-6 h-6" // Optional: Add a size class for better control
      />
      <span className="text-gray-900">
        {locale == "ar" ? amenity.name.ar : amenity.name.en} 
      </span>
    </div>
  ))}
</div>

</div>



          {/* <div >
        <PropertyMap
     
      
        />
      </div> */}
        </div>
      </div>
    </div>
  );
}

export default Page;
