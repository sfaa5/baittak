"use client"
import { Button } from "@/components/ui/button";
import React from "react";
import { useTranslation } from "react-i18next";

function Page() {
  const { t } = useTranslation("common");

  return (
    <>
      <h1 className="h1 py-7">{t("company.agentInfo.title")}</h1>

      <div className="w-full p-8 rounded-lg bg-gray-50">
        <div className="flex justify-between">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img src="/Agency/agent.png" alt="agent" className="w-48 h-48" />

            <div className="flex flex-col gap-5">
              <h1 className="text-2xl text-secondary font-medium">
                {t("company.agentInfo.companyName")}
              </h1>
              <div className="flex items-center gap-3">
                <span className=" text-2xl">4631 </span>
                <p className="text-lg text-gray-500">
                  {t("company.agentInfo.activeListing")}
                </p>
              </div>
            </div>
          </div>

          <Button variant={"outline"} className="text-green-500 hover:bg-green-500 hover:text-white">
            {t("company.agentInfo.edit")}
          </Button>
        </div>
        <div className="flex flex-col gap-5 mt-5">
          <div className="md:flex">
            <span className="flex text-lg mr-3 text-gray-500"> {t("company.agentInfo.address")}: </span>
            <p className="text-lg">
              Office 3, building Burj Plus, Al Ulayys, Riyadh,
            </p>
          </div>

          <div className="md:flex">
            <span className="flex text-lg mr-3 text-gray-500">
              {t("company.agentInfo.phoneNumber")}:
            </span>
            <p className="text-lg">01000797470</p>
          </div>

          <div className="md:flex">
            <span className="flex text-lg mr-3 text-gray-500">
              {t("company.agentInfo.email")}:
            </span>
            <p className="text-lg">slman123@gmail.com</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
