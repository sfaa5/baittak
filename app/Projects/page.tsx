"use client"
import ProjectCard from "@/components/ProjectCard";
import Search from "@/components/Search";
import React from "react";
import { useTranslation } from "react-i18next";
import { FaRegMap } from "react-icons/fa";
import { IoIosArrowDown, IoIosList } from "react-icons/io";
import { IoHomeSharp } from "react-icons/io5";
import { MdArrowForwardIos } from "react-icons/md";


function Page() {
  const { t } = useTranslation("common");

  return (
    <div className="container 2xl:px-[120px]  mx-auto pt-3">  <Search />
      <div className="flex gap-4 flex-col mt-5 xl:w-[75%]">
        {/* path */}
        <ul className="flex items-center gap-2 mb-5">
          <li className="flex gap-3">
            <IoHomeSharp className="text-secondary" />
            <MdArrowForwardIos className="text-[#707070]" />
          </li>
          <li className="text-[#707070]"> {t("project.project_title")} </li>
        </ul>

        <h3 className="text-xl font-medium">
          {" "}
          {t("project.projects", { count: 6200 })}{" "}
        </h3>

        {/* button of cards */}
        <div className="flex justify-between">
          <button className="flex w-[125px] h-[45px] items-center font-normal text-[#707070] rounded-[.8rem] border-[.1px] border-[#707070] justify-between px-4">
            {t("property.sort_by")}
            <IoIosArrowDown className=" h-5 w-5 text-[#707070]" />
          </button>

          <div className="flex gap-4">
            <button className="flex w-full gap-2 h-[45px] items-center font-normal text-[#707070] rounded-[.8rem] border-[.1px] border-[#707070] justify-between px-4">
              <FaRegMap className=" h-5 w-5 text-[#707070]" />
              {t("property.map")}
            </button>

            <button className="flex w-full gap-2 h-[45px] items-center font-normal text-[#707070] rounded-[.8rem] border-[.1px] border-[#707070] justify-between px-4">
              <IoIosList className=" h-5 w-5 text-[#707070]" />
              {t("property.list")}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-8 mb-28">
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />        </div>
      </div>
    </div>
  );
}

export default Page;
