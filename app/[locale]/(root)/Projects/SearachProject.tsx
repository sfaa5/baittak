"use client";
import React, { useState } from "react";
import { GoSearch } from "react-icons/go";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import SearchCity from "../../../../components/SearchProperty";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import RoomSelect from "./RoomSelect";
import { PriceFilter } from "../../../../components/PriceSelector";



function SearchProject() {
  const t = useTranslations();
  const locale = useLocale();


  const [city, setCity] = useState("");
  const [projectType, setProjectType] = useState("");
  const [rooms, setRooms] = useState("");
  const [purpose, setPurpose] = useState("");
  const [priceRange, setPriceRange] = React.useState<{
    min?: number;
    max?: number;
  }>({});

  
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
    console.log("city", city);
    console.log("projectType", projectType);
    console.log("rooms", rooms);
    console.log("purpose", purpose);
    console.log("priceRange", priceRange);
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");

    updateSearchParams(
      city, projectType, rooms, purpose, priceRange
    );
  };



  const updateSearchParams = (
    city: string,
    projectType: string,
    rooms: string,

    purpose: string,
    priceRange: { min?: number; max?: number }
  ) => {
    // Create a new URLSearchParams object using the current URL search parameters
    const searchParams = new URLSearchParams(window.location.search);


  const filters = {
    city,
    purpose,
    projectType,
    rooms,

    price: priceRange.min || priceRange.max ? `${priceRange.min || ''}-${priceRange.max || ''}` : null,
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
    <div>
      {/* Search */}
      <div className="flex flex-col px-3 py-5 bg-[#F5F5F5] rounded-t-[.7rem]">
        <form
          onSubmit={handleSearch}
          className="flex justify-start gap-4  flex-nowrap px-2 "
        >
          
          <SearchCity city={city} setCity={setCity} />

          <Select
            dir={locale === "ar" ? "rtl" : "ltr"}
            value={projectType}
            onValueChange={(value) => {
              setProjectType(value); // Update the state with the selected value
            }}
          >
            <SelectTrigger className="flex w-full h-[48px] items-center font-medium text-secondary rounded-[.8rem] border-[1px] border-[#1F4454] justify-between px-4">
              <SelectValue placeholder={t("addUser.selectProjectType")} />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">الكل</SelectItem>
              <SelectItem value="apartment">شقة</SelectItem>
              <SelectItem value="villa">فيلا</SelectItem>
              <SelectItem value="farm">مزرعة</SelectItem>
              <SelectItem value="rest-house">استراحة</SelectItem>
              <SelectItem value="residential-complex">مجمع سكني</SelectItem>
              <SelectItem value="duplex">دوبلكس</SelectItem>
              <SelectItem value="building">عمارة بالكامل</SelectItem>
              <SelectItem value="hotel-apartments">فندق/شقق فندقية</SelectItem>
              <SelectItem value="land">ارض</SelectItem>
              <SelectItem value="full-floor">طابق كامل</SelectItem>
            </SelectContent>
          </Select>




<RoomSelect rooms={rooms} setRooms={setRooms}  />




          <Select
                      dir={locale === "ar" ? "rtl" : "ltr"}
                      onValueChange={(value) => {
                        setPurpose(value); // Update the state with the selected value
                      }}
                      value={purpose}
                    >
                      <SelectTrigger className="flex w-بعمم h-[48px] items-center font-medium text-secondary rounded-[.8rem] border-[1px] border-[#1F4454] justify-between px-4">
                        <SelectValue placeholder={t("addUser.status")} />
                      </SelectTrigger>
                      <SelectContent>
                      <SelectItem value="all">الكل</SelectItem>
                        <SelectItem value="Completed">
                          {t("addUser.Completed")}
                        </SelectItem>
                        <SelectItem value="UnderDevelopment">
                          {t("addUser.UnderDevelopment")}
                        </SelectItem>
                      </SelectContent>
                    </Select>










<PriceFilter onPriceChange={setPriceRange} />





          <button
            type="submit"
            className="flex w-[700px] h-[48px] items-center font-medium text-white bg-primary rounded-[.8rem] justify-between px-4"
          >
            {t("search.search_button")}
            <GoSearch className="font-bold text-white" />
          </button>

        </form>


      </div>

      {/* Result of search */}
      {/* <div className="flex lg:gap-32 bg-[#F5F5F5] justify-center border-t-[1px] py-8 rounded-b-[.7rem] overflow-x-auto">
        {Array(4)
          .fill(null)
          .map((_, colIdx) => (
            <div key={colIdx} className="flex flex-col gap-3">
              {Array(3)
                .fill(null)
                .map((_, rowIdx) => (
                  <div key={rowIdx} className="flex gap-2">
                    <div className="text-secondary text-base font-medium">{t('search.city')}</div>
                    <span className="text-[#707070] text-sm font-normal">{t('search.result_count')}</span>
                  </div>
                ))}
            </div>
          ))}
      </div> */}
    </div>
  );
}

export default SearchProject;
