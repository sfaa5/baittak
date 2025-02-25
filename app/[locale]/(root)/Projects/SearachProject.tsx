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

    updateSearchParams(city, projectType, rooms, purpose, priceRange);
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

      price:
        priceRange.min || priceRange.max
          ? `${priceRange.min || ""}-${priceRange.max || ""}`
          : null,
    };

    Object.entries(filters).forEach(([key, value]) => {
      if (value === "all") {
        searchParams.delete(key);
      } else if (value) {
        searchParams.set(key, value.toString());
      } else {
        searchParams.delete(key);
      }
    });

    const newPathname = `${
      window.location.pathname
    }?${searchParams.toString()}`;

    console.log("newPathname", newPathname);
    router.push(newPathname); // Navigate to the updated URL
  };

  return (
    <div className="flex relative flex-col px-3 py-5 bg-[#F5F5F5] rounded-t-[.7rem]">
      <form
        onSubmit={handleSearch}
        className="flex justify-start gap-4 text-sm  flex-nowrap px-2 overflow-x-auto "
      >
        <SearchCity city={city} setCity={setCity} />

        <Select
          dir={locale === "ar" ? "rtl" : "ltr"}
          value={projectType}
          onValueChange={(value) => {
            setProjectType(value); // Update the state with the selected value
          }}
        >
          <SelectTrigger className="flex hover:bg-gray-50 gap-4 sm:gap-10 duration-200 w-full h-[48px] items-center font-medium text-secondary rounded-[.8rem] border-[1px] border-[#1F4454] justify-between px-4">
            <SelectValue placeholder={t("addUser.selectProjectType")} />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="Apartment">{t("inputs.apartment")}</SelectItem>
            <SelectItem value="Villa">{t("inputs.villa")}</SelectItem>
            <SelectItem value="Farm">{t("inputs.farm")}</SelectItem>
            <SelectItem value="Rest-House">{t("inputs.rest-house")}</SelectItem>
            <SelectItem value="Residential-Complex">
              {t("inputs.residential-complex")}
            </SelectItem>
            <SelectItem value="Duplex">{t("inputs.duplex")}</SelectItem>
            <SelectItem value="Building">{t("inputs.building")}</SelectItem>
            <SelectItem value="Hotel-Apartments">
              {t("inputs.hotel-apartments")}
            </SelectItem>
            <SelectItem value="Land">{t("inputs.land")}</SelectItem>
            <SelectItem value="Full-Floor">{t("inputs.full-floor")}</SelectItem>
          </SelectContent>
        </Select>

        <RoomSelect rooms={rooms} setRooms={setRooms} />

        <Select
          dir={locale === "ar" ? "rtl" : "ltr"}
          onValueChange={(value) => {
            setPurpose(value); // Update the state with the selected value
          }}
          value={purpose}
        >
          <SelectTrigger className="flex hover:bg-gray-50 gap-4 sm:gap-10 duration-200 w-full h-[48px] items-center font-medium text-secondary rounded-[.8rem] border-[1px] border-[#1F4454] justify-between px-4">
            <SelectValue placeholder={t("addUser.status")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("addUser.all")}</SelectItem>
            <SelectItem value="Completed">{t("addUser.Completed")}</SelectItem>
            <SelectItem value="UnderDevelopment">
              {t("addUser.UnderDevelopment")}
            </SelectItem>
          </SelectContent>
        </Select>

        <PriceFilter onPriceChange={setPriceRange} />

        <button
          type="submit"
          className="flex gap-3 hover:bg-primary/80 duration-200 h-[48px] items-center font-medium text-white bg-primary rounded-[.8rem] justify-between px-4"
        >
          {t("search.search_button")}
          <GoSearch className="font-bold text-white" />
        </button>

      </form>
    </div>
  );
}

export default SearchProject;
