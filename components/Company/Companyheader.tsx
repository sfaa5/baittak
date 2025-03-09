"use client"
import React from "react";
import { SidebarTrigger } from "../ui/sidebar";

import { useSession } from "next-auth/react";


import useListenMessages from "@/hooks/useListenMessage";
import useListenReuests from "@/hooks/useListenReuests";



 function Companyheader() {
  const {data:session,status} = useSession();
  
  const id = session?.user.id;
  console.log(id);
  useListenMessages();
  useListenReuests();


  console.log("headerrr", session);
  console.log("headerrr", status);

  return (
    <div className="flex justify-between items-center w-full border-b-2 py-2 ">
      <SidebarTrigger />

      <nav className="flex items-center gap-5">
        {session?.user?.image ? (
          <img
            src={session.user?.image}
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
