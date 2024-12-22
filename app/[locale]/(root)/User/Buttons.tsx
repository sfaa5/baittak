"use client"
import { Link } from "@/i18n/routing"; 
import React, { useState } from "react";
import { useTranslations } from "next-intl"; 

function Buttons() {
  
  const [activeButton, setActiveButton] = useState("yourPosts");
  const  t  = useTranslations();

  const buttonClasses = (buttonName: string) =>
    `flex w-auto h-[45px] items-center font-normal rounded-[.8rem] border-[.1px] border-[#707070] justify-between px-4 transition-all duration-200 ${
      activeButton === buttonName ? "bg-primary text-white" : "hover:bg-primary hover:text-white"
    }`;

    
  return (
    <div className="flex gap-4">
      <button
        onClick={() => setActiveButton("yourPosts")}
        className={buttonClasses("yourPosts")}
      >
        {t("userButton.yourPosts")}
      </button>

      <Link href={"/User/Favorit"}>
        <button
          onClick={() => setActiveButton("favorite")}
          className={buttonClasses("favorite")}
        >
          {t("userButton.favorite")}
        </button>
      </Link>

      <Link href={"/User/plan"}>
        <button
          onClick={() => setActiveButton("selectPlan")}
          className={buttonClasses("selectPlan")}
        >
          {t("userButton.selectPlan")}
        </button>
      </Link>

      <Link href={"/User/AddPost"}>
        <button
          onClick={() => setActiveButton("addingList")}
          className={buttonClasses("addingList")}
        >
          {t("userButton.addingList")}
        </button>
      </Link>
    </div>
  );
}

export default Buttons;
