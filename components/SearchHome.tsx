"use client";

import { GoSearch } from "react-icons/go";

import React, { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import SerchCityHome from "./SerchCityHome";
import { useRouter } from "next/navigation";
import RoomSelect from "./RoomSelect";
import RoomSelectHome from "./RoomSelectHome";

function SearchHome() {
  const locale = useLocale();
  const t = useTranslations();
  const [purpose, setPurpose] = useState("");
  const [city, setCity] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [rooms, setRooms] = useState(0);
  const [bathrooms, setBarooms] = useState(0);

  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // if (
    //   purpose.length === 0 &&
    //   priceRange.min === undefined &&
    //   city.length === 0 &&
    //   propertyType.length === 0 &&
    //   rooms.length === 0 &&
    //   bathrooms.length === 0
    // ) {
    //   return alert("Please provide some input");
    // }
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
    console.log("city", city);
    console.log("propertyType", propertyType);
    console.log("rooms", rooms);
    console.log("bathrooms", bathrooms);
    console.log("purpose", purpose);

    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");

    updateSearchParams(city, propertyType, rooms, bathrooms, purpose);
  };

  const updateSearchParams = (
    city: string,
    propertyType: string,
    rooms: number,
    bathrooms: number,
    purpose: string
  ) => {
    // Create a new URLSearchParams object using the current URL search parameters
    const searchParams = new URLSearchParams(window.location.search);

    const filters = {
      city,
      purpose,
      propertyType,
      rooms,
      bathrooms,
    };

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        searchParams.set(key, value.toString());
      } else {
        searchParams.delete(key);
      }
    });

    const newPathname = `${
      window.location.pathname
    }/Property?${searchParams.toString()}`;

    console.log("newPathname", newPathname);
    router.push(newPathname); // Navigate to the updated URL
  };

  return (
    <form
      onSubmit={handleSearch}
      className="realtive grid grid-cols-[94%] sm:grid-cols-[63%_33%]  md:grid-cols-[37%_37%_20%] lg:grid-cols-[10%_29%_20%_20%_13%] justify-center gap-3  items-center w-full pt-7 flex-wrap "
    >
      <div className="hidden lg:block">
        <Select
          dir={locale === "ar" ? "rtl" : "ltr"}
          value={purpose}
          onValueChange={(value) => {
            setPurpose(value); // Update the state with the selected value
          }}
        >
          <SelectTrigger className="bg-secondary/90 focus:outline-none focus:ring-0 focus:border-transparent ring-0 hover:bg-secondary/80 duration-200 text-white h-full gap-3 justify-center  py-3 rounded-[6px] font-medium text-base hidden lg:flex">
            <SelectValue placeholder={t("search.buy")} />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="rent">{t("addUser.rental")}</SelectItem>
            <SelectItem value="sell">{t("addUser.sell")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <SerchCityHome city={city} setCity={setCity} />

      <div className="h-full hidden md:block">
        <Select
          dir={locale === "ar" ? "rtl" : "ltr"}
          value={propertyType}
          onValueChange={(value) => {
            setPropertyType(value); // Update the state with the selected value
          }}
        >
          <SelectTrigger
            className="items-center   justify-between h-full border rounded-[6px] border-gray-300 bg-white text-gray-700 hover:bg-gray-50 
    focus:outline-none focus:ring-0 focus:border-transparent ring-0 border-transparent w-full hidden md:flex"
          >
            <SelectValue placeholder={t("addUser.selectPropertyType")} />
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
      </div>

      <RoomSelectHome
        rooms={rooms}
        setRooms={setRooms}
        bathrooms={bathrooms}
        setBathrooms={setBarooms}
      />

      <button className="justify-center gap-2  text-white hover:bg-primary/80 duration-200 bg-primary items-center py-3 rounded-[6px] font-medium text-base hidden sm:flex">
        <span>{t("landing.search")}</span>
        <GoSearch className="font-bold " />
      </button>
    </form>
  );
}

export default SearchHome;
