"use client";
import { Link } from "@/i18n/routing";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { CiMail } from "react-icons/ci";
import { IoMdMail } from "react-icons/io";
import { useConversationContext } from "@/app/context/ConversationProvider";

function Buttons() {
  const t = useTranslations();
  const pathname = usePathname();
  const [activeButton, setActiveButton] = useState("");
  const{totalUnreadMessages,setTotalUnreadMessages} = useConversationContext();

  console.log("TotalUnreadMessages",totalUnreadMessages)


  useEffect(() => {
    // Set the active button based on the current path
    if (pathname.includes("/User/Posts")) {
      setActiveButton("yourPosts");
    } else if (pathname.includes("/User/Favorit")) {
      setActiveButton("favorite");
    } else if (pathname.includes("/User/plan")) {
      setActiveButton("selectPlan");
    } else if (pathname.includes("/User/AddPost")) {
      setActiveButton("addingList");
    } else if (pathname.includes("/messages")){
      setActiveButton("messages")
    }


  }, [pathname]); // Update state when the path changes

  const buttonClasses = (buttonName: string) =>
    `flex w-full whitespace-nowrap flex gap-2  h-[45px] items-center text-sm font-normal rounded-[.8rem] border-[.1px] border-[#707070] justify-between px-2 sm:px-3 transition-all duration-200 ${
      activeButton === buttonName ? "bg-primary text-white" : "hover:bg-primary hover:text-white"
    }`;

  return (
    <div className="flex gap-4 flex-nowrap justify-start overflow-x-auto px-0 container">
      <Link href={"/User/Posts"}>
        <button
          onClick={() => setActiveButton("yourPosts")}
          className={buttonClasses("yourPosts")}
        >
          {t("userButton.yourPosts")}
        </button>
      </Link>

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

      <Link href={"/User/Edit"}>
      <button
          onClick={() => setActiveButton("edit")}
          className={buttonClasses("edit")}
        >
          {t("userButton.editUser")}
        </button>
      </Link>  
      
      <Link href={"/messages"}>
      <button
          onClick={() => setActiveButton("messages")}
          className={buttonClasses("messages")}

        >
          <IoMdMail size={18}/>

        {totalUnreadMessages>0&&  <span className='text-xs  text-center rounded-full w-4 h-4 text-white bg-primary'>{totalUnreadMessages}</span>}

        </button>
      </Link>
    </div>
  );
}

export default Buttons;
