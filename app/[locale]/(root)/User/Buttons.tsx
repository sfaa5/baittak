"use client";
import { Link } from "@/i18n/routing";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

function Buttons() {
  const t = useTranslations();
  const pathname = usePathname();
  const [activeButton, setActiveButton] = useState("");

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
    }
  }, [pathname]); // Update state when the path changes

  const buttonClasses = (buttonName: string) =>
    `flex w-auto h-[45px] items-center font-normal rounded-[.8rem] border-[.1px] border-[#707070] justify-between px-4 transition-all duration-200 ${
      activeButton === buttonName ? "bg-primary text-white" : "hover:bg-primary hover:text-white"
    }`;

  return (
    <div className="flex gap-4">
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
    </div>
  );
}

export default Buttons;
