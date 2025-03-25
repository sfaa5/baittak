"use client";
import { Fragment, useEffect, useRef, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { useLocale, useTranslations } from "next-intl";
import { FiMapPin } from "react-icons/fi";
import { usePathname } from "next/navigation";

interface City {
  name: { ar: string; en: string };
  properties: string[];
}

const SearchCity = ({
  city,
  setCity,
}: {
  city: string;
  setCity: (city: string) => void;
}) => {
  const [query, setQuery] = useState("");
  const [cities, setCities] = useState<City[]>([]);
  const [openDropdown, setOpenDropdown] = useState(false); // ✅ Controls dropdown visibility

  const locale = useLocale();
  const t = useTranslations();
  const pathname = usePathname();
  const comboboxRef = useRef<HTMLDivElement>(null); // ✅ Ref for detecting outside clicks

  // ✅ Fetch cities
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch(
          "https://baittak-server.vercel.app/api/cities"
        );
        const data = await response.json();
        setCities(data);
      } catch (error) {
        console.error("Can't fetch cities", error);
      }
    };
    fetchCities();
  }, []);

  // ✅ Filter cities
  const filteredCities =
    query === ""
      ? cities
      : cities.filter((city) =>
          (locale === "ar" ? city.name.ar : city.name.en)
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        comboboxRef.current &&
        !comboboxRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="" ref={comboboxRef}>
      <Combobox
        value={city}
        onChange={(value) => {
          setCity(value);
          setOpenDropdown(false);
        }}
      >
        {({ open }) => (
          <div className=" w-full">
            <div className="relative">
              {/* Button with icon */}
              <div className="absolute inset-y-0 flex items-center z-20">
                    <FiMapPin className="absolute mx-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
               
           </div>

              {/* Input field */}
              <Combobox.Input
                placeholder={t("search.enter_location")}
                className={`${
                  pathname.includes("Agency") ? "bg-white " : "bg-[#F5F5F5]"
                }   px-11 sm:px-7  pr- py-3 hover:bg-gray-50 duration-200 pl-10 flex h-[48px] font-normal items-center w-[200px] lg:w-[350px] text-secondary rounded-[.8rem] border-[1px] border-[#466e7f] justify-between `}
                displayValue={(item: string) => item}
                onChange={(event) => setQuery(event.target.value)}
                onFocus={() => setOpenDropdown(true)} // ✅ Opens dropdown on focus
                onClick={() => setOpenDropdown(true)} // ✅ Opens dropdown on click
              />
            </div>

            {/* Dropdown list */}
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setQuery("")}
              show={openDropdown || open}
            >
              <Combobox.Options className="w-[300px] absolute z-10 mt-2 max-h-60  overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {filteredCities.length === 0 && query !== "" ? (
                  <Combobox.Option
                    value={query}
                    className="search-city__option px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-200"
                  >
                    أضف {query}
                  </Combobox.Option>
                ) : (
                  filteredCities.map((city) => (
                    <Combobox.Option
                      key={locale === "ar" ? city.name.ar : city.name.en}
                      className={({ active }) =>
                        `relative px-4 py-2 cursor-pointer h-[40px]  ${
                          active ? "bg-primary-blue text-gray" : "text-gray-900"
                        }`
                      }
                      value={locale === "ar" ? city.name.ar : city.name.en}
                    >
                      {({ selected }) => (
                        <span
                          className={`block truncate   ${
                            selected ? "font-normal" : "font-light"
                          }`}
                        >
                          {locale === "ar" ? city.name.ar : city.name.en}{" "}
                          <span className="text-gray-500 text-xs">
                            ({city.properties.length})
                          </span>
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
};

export default SearchCity;
