"use client";
import { BsSearchHeartFill } from "react-icons/bs";
import { FiMapPin } from "react-icons/fi";
import { GoSearch } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";
import { LuHome } from "react-icons/lu";
import Cities from "./Cities";
import Properties from "./Properties";
import { useTranslations } from "next-intl";


export default function Home() {
  const  t  = useTranslations();
  return (
    <>
      {/* // landing */}
      <section className="h-[70vh] text- pb-36 bg-hero-pattern bg-cover w-full">
        <div className="container relative mx-auto h-full flex flex-col gap-36">
          {/* content */}
          <div className="absolute h-96 rounded-full blur"></div>
          <div className="flex relative flex-col pt-24 gap-3 pl-6 md:pl-0">
            <h1 className="h text-white sm:text-secondary">
              <div
                dangerouslySetInnerHTML={{
                  __html: t("landing.all properties on one place"),
                }}
              />
            </h1>
          </div>

          <div className="w-full flex justify-center px-0 xl:px-16">
            <div className="relative w-full h-36 bg-[#F5F5F5] bg-opacity-80 flex items-center px-2 sm:px-8 rounded-[8px] justify-center flex-wrap">
              {/* top search */}
              <div className="absolute -top-7 left-1/5 lg:left-1/3 bg-secondary text-white flex justify-between items-center w-4/5 md:w-4/5 lg:w-1/3 px-3 sm:px-6 py-4 rounded-[8px]">
                <div className="inline-flex gap-2 text-base font-medium hover:text-primary">
                  <LuHome className="size-5 xs:size-6" />
                  <span>{t("landing.rent")}</span>
                </div>
                <div className="inline-flex text-base gap-2 font-medium hover:text-primary">
                  <LuHome className="size-5 xs:size-6" />
                  <span>{t("landing.buy")}</span>
                </div>
                <div className="inline-flex text-base gap-2 font-medium hover:text-primary">
                  <LuHome className="size-5 xs:size-6 items-center" />
                  <span>{t("landing.projects")}</span>
                </div>
              </div>
              {/* search */}
              <div className="realtive flex justify-around items-center w-full pt-7 flex-wrap">
                <button className="bg-primary px-8 py-3 rounded-[6px] font-medium text-base hidden lg:flex">
                  {t("landing.rent")}
                </button>
                <button className="bg-primary px-8 py-3 rounded-[6px] font-medium text-base hidden lg:flex">
                  {t("landing.buy")}
                </button>

                <div className="relative w-full max-w-lg">
                  <input
                    type="text"
                    placeholder={t("landing.enter location here")}
                    className="w-full pl-10 pr-4 py-3 border rounded-[6px] border-gray-300 focus:outline-none focus:ring-2 focus:ring-black-100"
                  />
                  <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <BsSearchHeartFill className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl bg-primary rounded-full p-2 md:hidden" />
                </div>

                <button className="items-center justify-between px-4 py-3 border rounded-[6px] border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-full max-w-48 hidden xl:flex">
                  <span>{t("landing.type")}</span>
                  <IoIosArrowDown className=" h-5 w-5 text-gray-500" />
                </button>

                <button className="items-center justify-between  px-4 py-3 border border-gray-300 rounded-[6px] bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-full max-w-60 hidden 2xl:flex">
                <span>{t("landing.room & bath")}</span>  
                  <IoIosArrowDown className="h-5 w-5 text-gray-500" />
                </button>

                <button className="items-center gap-2 bg-primary px-8 py-3 rounded-[6px] font-medium text-base hidden md:flex">
                  <span>{t("landing.search")}</span>
                  <GoSearch className=" font-bold" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* // Cities and areas */}
      <Cities />

      <Properties />
    </>
  );
}
