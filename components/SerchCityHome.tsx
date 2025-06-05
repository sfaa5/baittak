"use client";
import React, { Fragment, useEffect, useState, useRef } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { useLocale, useTranslations } from "next-intl";
import { FiMapPin } from "react-icons/fi";
import { BsSearchHeartFill } from 'react-icons/bs';
import { useRouter } from "next/navigation";

interface City {
  name: { ar: string; en: string };
  properties: string[];
}

function SerchCityHome({ city, setCity }: { city: string; setCity: (city: string) => void }) {
  const [query, setQuery] = useState("");
  const [cities, setCities] = useState<City[]>([]);
  const [openDropdown, setOpenDropdown] = useState(false); // ✅ Controls dropdown visibility
  const locale = useLocale();
  const t = useTranslations();
  const comboboxRef = useRef<HTMLDivElement>(null); // ✅ Ref for detecting outside clicks
  const router = useRouter(); 

  // ✅ Fetch cities
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch( `${process.env.NEXT_PUBLIC_URL_SERVER}/api/cities`);
        const data = await response.json();
        setCities(data);
      } catch (error) {
        console.error("Can't fetch cities", error);
      }
    };
    fetchCities();
  }, []);

  // ✅ Filter cities
  const filteredCities = query === ""
    ? cities
    : cities.filter((city) =>
        (locale === "ar" ? city.name.ar : city.name.en)
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(query.toLowerCase().replace(/\s+/g, ""))
      );

      console.log("filteredCities", filteredCities);

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (comboboxRef.current && !comboboxRef.current.contains(event.target as Node)) {
        setOpenDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCitySelect = (selectedCity: string) => {
    setCity(selectedCity);
    setOpenDropdown(false);

    // Navigate to the selected city if the screen size is small
    if (window.innerWidth <= 640) {
    
      router.push(`/Property?city=${selectedCity}`);
    }
  };

  return (
    <div className="relative" ref={comboboxRef}> {/* ✅ Wrap with ref */}
      <Combobox value={city} onChange={handleCitySelect}>
        {({ open }) => (
          <div className="relative">
            {/* Icon */}
            <div className="absolute inset-y-0 flex items-center z-20">
              <FiMapPin className="absolute mx-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <BsSearchHeartFill className={`absolute ${locale==="en"?"left-2":"-left-9"}  top-1/2 -translate-y-1/2 text-white text-3xl bg-primary rounded-full p-2 sm:hidden`} />
            </div>

            {/* Input field */}
            <Combobox.Input
              placeholder={t("landing.enter location here")}
              className="w-full px-11 sm:px-7  pr- py-3 border rounded-[6px] border-gray-300 focus:outline-none"
              displayValue={(item: string) => item}
              onChange={(event) => setQuery(event.target.value)}
              onFocus={() => setOpenDropdown(true)} // ✅ Opens dropdown on focus
              onClick={() => setOpenDropdown(true)} // ✅ Opens dropdown on click
            />

            {/* Dropdown list */}
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setQuery("")}
              show={openDropdown || open}
            >
              <Combobox.Options className="absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {filteredCities.length === 0 && query !== "" ? (
                  <Combobox.Option value={query} className="search-city__option px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-200">
                    أضف {query}
                  </Combobox.Option>
                ) : (
                  filteredCities.map((city) => (
                    <Combobox.Option
                      key={locale === "ar" ? city.name.ar : city.name.en}
                      className={({ active }) =>
                        `relative px-4 py-2 cursor-pointer h-[40px]  ${active ? "bg-primary-blue text-gray" : "text-gray-900"}`
                      }
                      value={locale === "ar" ? city.name.ar : city.name.en}
                    >
                      {({ selected }) => (
                        <span className={`block truncate   ${selected ? "font-normal" : "font-light"}`}>
                          {locale === "ar" ? city.name.ar : city.name.en}  <span className="text-gray-500 text-xs">({city.properties.length})</span> 
                        </span>
                      )}
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            </Transition>
          </div>
        )}
      </Combobox>
    </div>
  );
}

export default SerchCityHome;