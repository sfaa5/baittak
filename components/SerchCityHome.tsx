"use client";
import React from 'react'
import { Fragment, useEffect, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { useLocale, useTranslations } from "next-intl";
import { FiMapPin } from "react-icons/fi";
import { BsSearchHeartFill } from 'react-icons/bs';

function SerchCityHome({ city, setCity }: { city: string; setCity: (city: string) => void }) {


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
           <div className="relative ">
             {/* Button with icon */}
             <Combobox.Button className="absolute inset-y-0 left-1 flex items-center z-20">
               <FiMapPin className=" absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <BsSearchHeartFill className="absolute left-1 top-1/2 -translate-y-1/2 text-white text-3xl bg-primary rounded-full p-2 sm:hidden" />
             </Combobox.Button>
   
             {/* Input field */}
             <Combobox.Input
               placeholder={t("landing.enter location here")}
               className="w-full pl-11 sm:pl-10 pr-4 py-3 border rounded-[6px] border-gray-300 focus:outline-none "
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
  )
}

export default SerchCityHome