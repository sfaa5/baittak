"use client"
import Link from "next/link";
import React, { useState } from "react";

function Buttons() {
  const [activeButton, setActiveButton] = useState("yourPosts");

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
        Your Posts
      </button>

      <Link href={"/User/Favorit"}>
        <button
          onClick={() => setActiveButton("favorite")}
          className={buttonClasses("favorite")}
        >
          Favorite
        </button>
      </Link>

      <Link href={"/User/plan"}>
        <button
          onClick={() => setActiveButton("selectPlan")}
          className={buttonClasses("selectPlan")}
        >
          Select Plan
        </button>
      </Link>

      <Link href={"/User/AddPost"}>
        <button
          onClick={() => setActiveButton("addingList")}
          className={buttonClasses("addingList")}
        >
          Adding List
        </button>
      </Link>
    </div>
  );
}

export default Buttons;
