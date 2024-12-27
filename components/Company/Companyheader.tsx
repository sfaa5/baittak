
import React from "react";
import { SidebarTrigger } from "../ui/sidebar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,

  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextAuth";




async function Companyheader() {

  const session  = await getServerSession(authOptions);
  const id = session?.user.id
  console.log(id)
  
  const response = await fetch(`http://localhost:5001/api/agency/${id}`)
  const data = await response.json()

  return (
    <div className="flex justify-between items-center w-full border-b-2 py-4 ">
      <SidebarTrigger />

      <nav className="flex items-center gap-5">

{data.image?.url&&
     (   <img
          src={data.image.url}
          alt="logo"
          className="   h-12 max-w-full object-contain"
        />)}

      </nav>
    </div>
  );
}

export default Companyheader;
