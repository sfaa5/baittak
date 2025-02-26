import React from "react";
import { SidebarTrigger } from "../ui/sidebar";


import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextAuth";

const URL_SERVER = process.env.NEXT_PUBLIC_URL_SERVER;

async function Companyheader() {
  const session = await getServerSession(authOptions as object);
  const id = session?.user.id;
  console.log(id);

  const response = await fetch(`${URL_SERVER}/api/agency/${id}`);
  const data = await response.json();

  console.log("headerrr", data);

  return (
    <div className="flex justify-between items-center w-full border-b-2 py-4 ">
      <SidebarTrigger />

      <nav className="flex items-center gap-5">
        {data.image?.url ? (
          <img
            src={data.image.url}
            alt="logo"
            className="  rounded-md  h-12 max-w-full object-contain"
          />
        ) : (
          <img
            src={"/company/unknown.png"}
            alt="logo"
            className=" rounded-md h-12 max-w-full object-contain"
          />
        )}
      </nav>
    </div>
  );
}

export default Companyheader;
