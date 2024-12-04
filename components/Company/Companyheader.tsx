"use client"
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

function Companyheader() {
  const { i18n } = useTranslation("common");

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  };

  return (
    <div className="flex justify-between items-center w-full border-b-2 py-4 ">
      <SidebarTrigger />

      <nav className="flex items-center gap-5">
                <Select
          value={i18n.language}
          onValueChange={changeLanguage}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={i18n.language === "en" ? "English" : "Arabic"} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="ar">Arabic</SelectItem>
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
