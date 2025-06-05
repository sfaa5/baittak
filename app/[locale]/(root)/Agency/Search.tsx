"use client";

import { GoSearch } from "react-icons/go";

import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import SearchCity from "@/components/SearchProperty";
import { useRouter } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
function Search() {
  const t = useTranslations();
  const locale = useLocale();

  const [service, setService] = useState("");

  const [city, setCity] = useState("");

  const router = useRouter();



  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
    console.log("city", city);
    console.log("service", service);

    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");

    updateSearchParams(
      city, service
    );
  };

  const updateSearchParams = (
    city: string,
    service: string,
   
  ) => {
    // Create a new URLSearchParams object using the current URL search parameters
    const searchParams = new URLSearchParams(window.location.search);


  const filters = {
    city,
    service,
  
  };

  Object.entries(filters).forEach(([key, value]) => {
    if(value==="all"){
      searchParams.delete(key);
    }else
    if (value) {
      searchParams.set(key, value.toString());
    } else {
      searchParams.delete(key);
    }
  });

  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

  console.log("newPathname", newPathname);
  router.push(newPathname); // Navigate to the updated URL
  };



  return (
    <form
    onSubmit={handleSearch}>
    <div className="flex justify-start gap-1 sm:gap-3 flex-nowrap px-2  ">
      {/* <input
      placeholder={t("agency.banner.search_placeholder")}
      className="bg-white flex h-[48px] font-normal items-center w-[300px] lg:w-[400px] rounded-[.8rem] justify-between px-1 md:px-4"
    /> */}
      <SearchCity city={city} setCity={setCity} />

      <Select
        dir={locale === "ar" ? "rtl" : "ltr"}
        onValueChange={(value) => {
          setService(value); // Update the state with the selected value
        }}
        value={service}
      >
        <SelectTrigger className="hidden sm:flex hover:bg-gray-50 bg-white w-[150px] h-[48px] gap-2 items-center font-normal  rounded-[.8rem] justify-between px-2 md:px-4">
          <SelectValue placeholder={t("agency.banner.service_needed")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{t("addUser.all")}</SelectItem>
              <SelectItem value="rent">{t("addUser.rental")}</SelectItem>
              <SelectItem value="sell">{t("addUser.sell")}</SelectItem>
        </SelectContent>
      </Select>

      <button className="flex w-auto h-[48px] items-center font-medium text-white bg-primary rounded-[.8rem] justify-between px-4">
        <GoSearch className="font-bold text-white" />
      </button>
    </div>
         </form>
  );
}

export default Search;
