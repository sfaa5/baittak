"use client";
import { useTranslation } from "react-i18next";
import PropertiesCard from "@/components/PropertiesCard";
import Serch from "@/components/Search";
import { FaRegMap } from "react-icons/fa";
import { IoIosArrowDown, IoIosList } from "react-icons/io";
import { IoHomeSharp } from "react-icons/io5";
import {
  MdArrowForwardIos,
  MdKeyboardArrowLeft,
} from "react-icons/md";

function Page() {
  const { t } = useTranslation("common");

  return (
    <div className="container 2xl:px-[120px] mx-auto pt-3">
      <Serch  />

      <div className="flex gap-4 flex-col mt-5 xl:w-[75%]">
        {/* path */}
        <ul className="flex items-center gap-2 mb-5">
          <li className="flex gap-3">
            <IoHomeSharp className="text-secondary" />
            <MdArrowForwardIos className="text-[#707070]" />
          </li>
          <li className="text-[#707070]">{t("property.properties_title")}</li>
        </ul>

        <h3 className="text-xl font-medium">{t("property.properties_title")}</h3>
        <span className="text-[#707070]">{t("property.total_properties", { count: 6200 })}</span>

        {/* button of cards */}
        <div className="flex justify-between">
          <button className="flex w-[125px] h-[45px] items-center font-normal text-[#707070] rounded-[.8rem] border-[.1px] border-[#707070] justify-between px-4">
            {t("property.sort_by")}
            <IoIosArrowDown className="h-5 w-5 text-[#707070]" />
          </button>

          <div className="flex gap-4">
            <button className="flex w-full gap-2 h-[45px] items-center font-normal text-[#707070] rounded-[.8rem] border-[.1px] border-[#707070] justify-between px-4">
              <FaRegMap className="h-5 w-5 text-[#707070]" />
              {t("property.map")}
            </button>

            <button className="flex w-full gap-2 h-[45px] items-center font-normal text-[#707070] rounded-[.8rem] border-[.1px] border-[#707070] justify-between px-4">
              <IoIosList className="h-5 w-5 text-[#707070]" />
              {t("property.list")}
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-8">
          <PropertiesCard />
          <PropertiesCard />
          <PropertiesCard />
          <PropertiesCard />
        </div>

        <div className="flex items-center justify-between mt-5 px-4 py-3 sm:px-6">
          <div className="flex flex-1 justify-between sm:hidden">
            <a
              href="#"
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              {t("property.previous")}
            </a>
            <a
              href="#"
              className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              {t("property.next")}
            </a>
          </div>

          <div className="hidden sm:flex w-full sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                <span className="font-medium mr-4">3</span> {t("property.results")}
              </p>
            </div>

            <div>
              <nav
                className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                aria-label="Pagination"
              >
                {/* Pagination */}
                <a href="#" className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                  <MdKeyboardArrowLeft />
                </a>
                {/* Add more page links */}
              </nav>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
