"use client";
import React, { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import SearchCity from "./SearchProperty";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import RoomSelect from "./RoomSelect";
import { PriceFilter } from "./PriceSelector";


function Search({cities}) {
  const t = useTranslations();
  const locale = useLocale();

  const router = useRouter();

  // State variables
  const [city, setCity] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [rooms, setRooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [purpose, setPurpose] = useState("");
  const [priceRange, setPriceRange] = useState<{ min?: number; max?: number }>(
    {}
  );


  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(window.location.search);

      const cityParam = params.get("city") || "";
      const propertyTypeParam = params.get("propertyType") || "";
      const roomsParam = params.get("rooms") ? Number(params.get("rooms")) : 0;
      const bathroomsParam = params.get("bathrooms")
        ? Number(params.get("bathrooms"))
        : 0;
      const purposeParam = params.get("purpose") || "";
      const priceParam = params.get("price") || "";

      // Extract min/max price if available
      const [minPrice, maxPrice] = priceParam.split("-").map(Number);

      // Update state with extracted values
      setCity(cityParam);
      setPropertyType(propertyTypeParam);
      setRooms(roomsParam);
      setBathrooms(bathroomsParam);
      setPurpose(purposeParam);
      setPriceRange({
        min: isNaN(minPrice) ? undefined : minPrice,
        max: isNaN(maxPrice) ? undefined : maxPrice,
      });
    }, 500); // 500ms debounce time

    return () => clearTimeout(handler); // Cleanup on unmount or when searchParams change
  }, []); // Runs when searchParams change

  // Handle search submission
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("city", city);
    console.log("propertyType", propertyType);
    console.log("rooms", rooms);
    console.log("bathrooms", bathrooms);
    console.log("purpose", purpose);
    console.log("priceRange", priceRange);

    updateSearchParams(
      city,
      propertyType,
      rooms,
      bathrooms,
      purpose,
      priceRange
    );
  };

  const updateSearchParams = (
    city: string,
    propertyType: string,
    rooms: number,
    bathrooms: number,
    purpose: string,
    priceRange: { min?: number; max?: number }
  ) => {
    const searchParams = new URLSearchParams(window.location.search);

    const filters = {
      city,
      propertyType,
      rooms,
      bathrooms,
      purpose,
      price:
        priceRange.min || priceRange.max
          ? `${priceRange.min || ""}-${priceRange.max || ""}`
          : null,
    };

    Object.entries(filters).forEach(([key, value]) => {
      if (value === "all" || !value) {
        searchParams.delete(key);
      } else {
        searchParams.set(key, value.toString());
      }
    });

    router.push(`?${searchParams.toString()}`);
  };

  // // Fetch cities
  // useEffect(() => {
  //   const getCities = async () => {
  //     try {
  //       const res = await fetch(
  //         `${process.env.NEXT_PUBLIC_URL_SERVER}/api/cities`
  //       );
  //       const data = await res.json();
  //       setCities(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getCities();
  // }, []);

  return (
    <div>
      <div className="flex flex-col px-3 py-5 bg-[#F5F5F5] rounded-t-[.7rem]">
        <form
          onSubmit={handleSearch}
          className="flex justify-start gap-4 text-sm flex-nowrap px-2 overflow-x-auto"
        >
          <SearchCity city={city} setCity={setCity} />

          {/* Property Type Selection */}
          <Select
            dir={locale === "ar" ? "rtl" : "ltr"}
            value={propertyType}
            onValueChange={(value) =>
              setPropertyType(value === "all" ? "" : value)
            }
          >
            <SelectTrigger className="flex hover:bg-gray-50 gap-4 sm:gap-10 font-normal duration-200 w-full h-[48px] items-center  text-secondary rounded-[.8rem] border-[1px] border-[#1F4454] justify-between px-4">
              <SelectValue placeholder={t("addUser.selectPropertyType")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("addUser.all")}</SelectItem>
              <SelectItem value="Apartment">{t("inputs.apartment")}</SelectItem>
              <SelectItem value="Villa">{t("inputs.villa")}</SelectItem>
              <SelectItem value="Farm">{t("inputs.farm")}</SelectItem>
              <SelectItem value="Rest-House">
                {t("inputs.rest-house")}
              </SelectItem>
              <SelectItem value="Residential-Complex">
                {t("inputs.residential-complex")}
              </SelectItem>
              <SelectItem value="Duplex">{t("inputs.duplex")}</SelectItem>
              <SelectItem value="Building">{t("inputs.building")}</SelectItem>
              <SelectItem value="Hotel-Apartments">
                {t("inputs.hotel-apartments")}
              </SelectItem>
              <SelectItem value="Land">{t("inputs.land")}</SelectItem>
              <SelectItem value="Full-Floor">
                {t("inputs.full-floor")}
              </SelectItem>
            </SelectContent>
          </Select>

          {/* Rooms Selection */}
          <RoomSelect
            rooms={rooms}
            setRooms={setRooms}
            bathrooms={bathrooms}
            setBathrooms={setBathrooms}
          />

          {/* Purpose Selection */}
          <Select
            dir={locale === "ar" ? "rtl" : "ltr"}
            value={purpose}
            onValueChange={(value) => setPurpose(value === "All" ? "" : value)}
          >
            <SelectTrigger className="flex hover:bg-gray-50 duration-200 h-[48px] gap-4 items-center font-normal text-secondary rounded-[.8rem] border-[1px] border-[#1F4454] justify-between px-4">
              <SelectValue placeholder={t("search.buy")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">{t("addUser.all")}</SelectItem>
              <SelectItem value="rent">{t("addUser.rental")}</SelectItem>
              <SelectItem value="sell">{t("addUser.sell")}</SelectItem>
            </SelectContent>
          </Select>

          {/* Price Filter */}
          <PriceFilter onPriceChange={setPriceRange} />

          {/* Search Button */}
          <button
            type="submit"
            className="flex gap-3 hover:bg-primary/80 duration-200 h-[48px] items-center font-medium text-white bg-primary rounded-[.8rem] justify-between px-4"
          >
            {t("search.search_button")}
            <GoSearch className="font-bold text-white" />
          </button>
        </form>
      </div>

      {/* Result of search */}

      <div className="  bg-[#F5F5F5]  border-t-[1px] p-4 rounded-b-[.7rem] overflow-x-auto">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-2 px-3">
          {cities.length > 0 &&
            cities.map((city) => (
              <div 
              onClick={() => {
                setCity(city.cityDetails.name.en);
                updateSearchParams(
                  city.cityDetails.name.en,
                  propertyType,
                  rooms,
                  bathrooms,
                  purpose,
                  priceRange
                );
              }} 
              key={city._id} 
              className="flex gap-1 items-center cursor-pointer"
            >
                <div className="text-secondary text-sm ">
                
                  {locale === "en" ? city.cityDetails.name.en : city.cityDetails.name.ar}
                </div>
                <span className="text-[#707070] text-xs font-normal">
                  ({city.count})
                </span>
              </div>
            ))}
        </div>
      </div>
  
    </div>
  );
}

export default Search;
