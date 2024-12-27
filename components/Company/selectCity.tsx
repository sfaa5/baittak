"use client";
import { Fragment, useEffect, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { useLocale, useTranslations } from "next-intl";
import { FiMapPin } from "react-icons/fi";
import { IoMdArrowDropdown } from "react-icons/io";

const SelectCity = ({ city, setCity }: { city: string; setCity: (city: string) => void }) => {
  const [query, setQuery] = useState("");
  const [cities, setCities] = useState<string[]>([]);
  const locale = useLocale();
  const t = useTranslations();

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch("https://baittak-server.vercel.app/api/cities");
        const data = await response.json();

        const displayedCities = data.map((item: { name: { ar: string; en: string } }) =>
          locale === "ar" ? item.name.ar : item.name.en
        );
        

        setCities(displayedCities);
      } catch (error) {
        console.error("cant fetch cities", error);
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


          {/* Input field */}
          <Combobox.Input
            placeholder={t("search.enter_location")}
            className="pl-10 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            displayValue={(item: string) => item}
            onChange={(event) => setQuery(event.target.value)} // Update query on input change
          />
          {/* Button with icon */}
          <Combobox.Button className="absolute inset-y-0 left-3 flex items-center z-20">
          <IoMdArrowDropdown />
          </Combobox.Button>
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
                  أضف {query}
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

export default SelectCity;
