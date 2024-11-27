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

function Companyheader() {
  return (
    <div className="flex justify-between items-center w-full border-b-2 py-4">
      <SidebarTrigger />

      <nav className="flex items-center gap-5">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
             
              <SelectItem value="apple">Arapic</SelectItem>
              <SelectItem value="banana">English</SelectItem>

            </SelectGroup>
          </SelectContent>
        </Select>
        <img
          src="/company/company.png"
          alt="logo"
          className="   h-12 max-w-full object-contain"
        />
      </nav>
    </div>
  );
}

export default Companyheader;
