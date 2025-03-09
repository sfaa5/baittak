"use client";
import React from "react";
import SearchInput from "./SearchInput";
import Conversations from "./Conversations";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSharedState } from "@/app/context/stateProvider";
import { useLocale } from "next-intl";

function Sidebar() {
  console.log("Parent re-rendered!");
  const { showSidebar } = useSharedState();
  const isMobile = useIsMobile();


  const locale =useLocale()

  return (

      <div
        className={`${locale==="en"?" border-r rounded-l-[8px]":"rounded-r-[8px]  border-l"} border-black-500 p-2  shadow-md  flex flex-col  top-0 left-0  transition-transform duration-300
        ${isMobile?"w-[100%] absolute":"w-[50%]"}   ${showSidebar||!isMobile ? " translate-x-0":"-translate-x-full "} `}
      >
        <SearchInput />
        <div className="divider px-3"></div>
        <Conversations />
      </div>

      

  );
}

export default Sidebar;
