"use client";
import ShowOnMap from "@/components/ShowOnMap";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { FaRegMap } from "react-icons/fa";

function OnMap({ properties }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = useTranslations();

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        type="button"
        className="flex text-sm  hover:bg-gray-50 duration-200  gap-4 h-[40px] items-center font-normal text-[#707070] rounded-[.8rem] border-[.1px] border-[#707070] justify-between px-4"
      >
        <FaRegMap className="h-4 w-4 text-[#707070]" />
        {t("property.map")}
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[1400px]">
            <button
              onClick={() => setIsModalOpen(false)}
              className="mb-4 px-4 py-2 bg-primary  text-white rounded hover:bg-primary/50"
            >
              Close
            </button>
            <ShowOnMap properties={properties} />
          </div>
        </div>
      )}
    </div>
  );
}

export default OnMap;
