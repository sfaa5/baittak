import Link from "next/link";
import React from "react";

function Buttons() {
  return (
    <div className="flex gap-4">
      <button className="flex w-auto h-[45px] items-center font-normal text-white bg-primary rounded-[.8rem] border-[.1px] border-[#707070] justify-between px-4 hover:bg-primary">
        your Posts
      </button>
      <Link href={"/User/Favorit"}>
        <button className="flex w-auto h-[45px] items-center font-normal  rounded-[.8rem] border-[.1px] border-[#707070] justify-between px-4 hover:bg-primary hover:text-white transition-all duration-200">
          Favorite
        </button>
      </Link> 
      <Link href={"/User/plan"}>
      <button className="flex w-auto h-[45px] items-center font-normal  rounded-[.8rem] border-[.1px] border-[#707070] justify-between px-4 hover:bg-primary hover:text-white transition-all duration-200">
        Select Plan
      </button>
</Link>

<Link href={"/User/AddPost"}>
      <button className="flex w-auto h-[45px] items-center font-normal  rounded-[.8rem] border-[.1px] border-[#707070] justify-between px-4 hover:bg-primary hover:text-white transition-all duration-200">
        Adding List
      </button>
      </Link>
    </div>
  );
}

export default Buttons;
