"use client";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { useLocale, useTranslations } from "next-intl";
import { FiMapPin } from "react-icons/fi";

const SearchCity = ({ city, setCity}: any) => {
  const [query, setQuery] = useState("");
  const [cities, setCities] = useState<string[]>([]);
  const locale = useLocale();
  const t = useTranslations();

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/cities");
        const data = await response.json();

        const displayedCities = data.map((item: any) =>
          locale === "ar" ? item.name.ar : item.name.en
        );
        

        setCities(displayedCities);
      } catch (error) {
        console.error("خطأ أثناء جلب المدن:", error);
      }
    };

    fetchCities();
  }, []);

  const filteredCities =
    query === ""
      ? cities
      : cities.filter((city) =>
          city
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className="relative">
      <Combobox value={city} onChange={setCity}>
        <div className="relative w-full">
          {/* Button with icon */}
          <Combobox.Button className="absolute inset-y-0 left-3 flex items-center z-20">
            <FiMapPin className="text-secondary" />
          </Combobox.Button>

          {/* Input field */}
          <Combobox.Input
            placeholder={t("search.enter_location")}
            className="bg-[#F5F5F5] pl-10 flex h-[48px] font-normal items-center w-[200px] lg:w-[400px] text-secondary rounded-[.8rem] border-[1px] border-[#466e7f] justify-between px-4"
            displayValue={(item: string) => item}
            onChange={(event) => setQuery(event.target.value)} // Update query on input change
          />

          {/* Dropdown list */}
          <Transition
            as={Fragment}   
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredCities.length === 0 && query !== "" ? (
                <Combobox.Option
                  value={query}
                  className="search-city__option px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-200"
                >
                  أضف "{query}"
                </Combobox.Option>
              ) : (
                filteredCities.map((city) => (
                  <Combobox.Option
                    key={city}
                    className={({ active }) =>
                      `relative  px-4 py-2 cursor-pointer ${
                        active ? "bg-primary-blue text-gray" : "text-gray-900"
                      }`
                    }
                    value={city}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {city}
                        </span>

                        {/* Show an active blue background color if the option is selected */}
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active
                                ? "text-white"
                                : "text-pribg-primary-purple"
                            }`}
                          ></span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default SearchCity;
