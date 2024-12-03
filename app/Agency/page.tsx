"use client"
import AgentCard from "@/components/AgentCard";
import Link from "next/link";
import React from "react";
import { GoSearch } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";
import { IoHomeSharp } from "react-icons/io5";
import { MdArrowForwardIos } from "react-icons/md";
import { useTranslation } from "react-i18next";

function page() {
  const { t } = useTranslation("common");

  return (
    <>
      {/* Banner Search */}
      <section className="bg-hero-Agency bg-cover w-full h-auto mb-10 py-14">
        <div className="container px-2 2xl:px-[120px] pt-3">
          <div className="flex flex-col gap-8 items-center">
            <h1 className="text-4xl font-medium text-white">
              {t("agency.banner.title")}
            </h1>

            <div className="flex justify-start gap-1 sm:gap-3 overflow-x-auto flex-nowrap px-2 touch-pan-x hide-scrollbar">
              <input
                placeholder={t("agency.banner.search_placeholder")}
                className="bg-white flex h-[48px] font-normal items-center w-[300px] lg:w-[400px] rounded-[.8rem] justify-between px-1 md:px-4"
              />

              <button className="hidden sm:flex bg-white w-auto h-[48px] gap-2 items-center font-normal text-gray-400 rounded-[.8rem] justify-between px-2 md:px-4">
                {t("agency.banner.service_needed")}
                <IoIosArrowDown className="h-5 w-5" />
              </button>

              <button className="flex w-auto h-[48px] items-center font-medium text-white bg-primary rounded-[.8rem] justify-between px-4">
                <GoSearch className="font-bold text-white" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Path Section */}
      <section className="container 2xl:px-[120px]">
        <div className="flex flex-col">
          <ul className="flex items-center gap-2 mb-5">
            <li className="flex gap-3">
              <Link href={"/"}>
                <IoHomeSharp className="text-secondary" />
              </Link>
              <MdArrowForwardIos className="text-[#707070]" />
            </li>
            <li className="text-[#707070] flex gap-3 items-center">
              {t("agency.path.current_page")}
              <MdArrowForwardIos className="text-[#707070]" />
            </li>
          </ul>

          {/* Result and Filter Button */}
          <div className="flex justify-between items-center w-full">
            <h3 className="text-xl font-medium">
              {t("agency.results_section.matching_companies_title")}
            </h3>
            <button className="flex w-[125px] h-[45px] items-center font-normal text-[#707070] rounded-[.8rem] border-[.1px] border-[#707070] justify-between px-4">
              {t("agency.results_section.sort_by")}
              <IoIosArrowDown className="h-5 w-5 text-[#707070]" />
            </button>
          </div>

          <span className="text-[#707070]">
            {t("agency.results_section.total_results")}
          </span>
        </div>
      </section>

      {/* Cards Section */}
      <section className="container 2xl:px-[120px] mt-10 mb-36">
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full justify-between gap-10 md:gap-14">
          <AgentCard />
          <AgentCard />
          <AgentCard />
          <AgentCard />
          <AgentCard />
          <AgentCard />
        </div>
      </section>
    </>
  );
}

export default page;
