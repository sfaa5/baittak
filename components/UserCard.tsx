"use client"
import React from "react";
import { useTranslation } from "react-i18next";

function UserCard() {
  const { t } = useTranslation("common");
  return (
    <div className=" mx-auto w-full xl:w-1/3">
      <div className="flex flex-col bg-gray-100 p-8  gap-8 rounded-[0.7rem]">
        <div className="flex items-center gap-5">
          <img src="/user/Rectangle 46.png" alt="user" />
          <div className="flex flex-col gap-2 text-lg">
            <p>KHALED</p>
            <p>kHALED22@gmail.com</p>
          </div>
        </div>

        <div className="flex  text-lg gap-3"><p className="text-primary font-medium">{t("userCard.PREMIUM")}</p> <span>{t("userCard.Days Left", { count: 20 })}</span> </div>
        <div className="text-lg">
            <div className="flex gap-2"><p className="text-secondary font-medium">{t("userCard.Rent")}:</p><span>5</span></div>
            <div className="flex gap-2 mt-2"><p className="text-secondary font-medium ">{t("userCard.Buy")}:</p><span>2</span></div>
            
        </div>
      </div>
    </div>
  );
}

export default UserCard;
