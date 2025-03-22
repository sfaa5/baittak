import { useTranslations } from "next-intl";
import React, { useState, useEffect, useRef } from "react";

import { Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ChevronDown } from "lucide-react";
function RoomSelectHome({

  setRooms,
  bathrooms,
  rooms,
  setBathrooms,
}: {
  rooms: number;
  setRooms: React.Dispatch<React.SetStateAction<number>>;
  bathrooms: number;
  setBathrooms: React.Dispatch<React.SetStateAction<number>>;
}) {


  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(0);
  const [selectedBath, setSelectedBath] = useState(0);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelct = (num: number, type: string) => {
    if (type === "rooms") {
      if (selected === num) {
        setSelected(0);
        setRooms(0);
      } else {
        setSelected(num);
        setRooms(num);
      }
    } else if (type === "bathrooms") {
      if (selectedBath === num) {
        setSelectedBath(0);
        setBathrooms(0);
      } else {
        setSelectedBath(num);
        setBathrooms(num);
      }
    }
  };


  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
       <div className="relative hidden lg:block" ref={dropdownRef}>
          <button
            type="button"
            onClick={toggleDropdown}
            className="items-center justify-between  w-full  px-4 py-3 border border-gray-300 rounded-[6px] bg-white text-gray-700 hover:bg-gray-50 focus:outline-none    hidden lg:flex"
          >
              {bathrooms === 0 && rooms === 0 && (
            <span>{t("search.rooms_bath")}</span>
          )}

          <div className="flex gap-2 items-center  text-xs text-primary font-medium">
            {bathrooms > 0 && (
              <span className="px-2 py-1 bg-[#466e7f] text-white rounded-md">
                {bathrooms} 🛁
              </span>
            )}
            {rooms > 0 && (
              <span className="px-2 py-1 bg-[#466e7f] text-white rounded-md">
                {rooms} 🏠
              </span>
            )}
          </div>

            <ChevronDown className="h-4 w-4 opacity-50" />
          </button>
    
          <Transition
            as={Fragment}
            show={isOpen}
            enter="transition ease-out duration-100"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition ease-in duration-75"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="absolute z-10 mt-2 w-[300px] bg-white border border-gray-300 rounded-md shadow-lg">
              <div className="py-2 px-4 text-gray-500 font-semibold">Bedrooms</div>
              <div className="grid grid-cols-5 gap-2 p-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => {
                handleSelct(index + 1, "rooms");
              }}
              className={`border p-2 rounded ${
                selected === index + 1 ? "bg-primary" : ""
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>



    
              <div className="border-t my-2"></div>
    
              <div className="py-2 px-4 text-gray-500 font-semibold">Bathrooms</div>
        <div className="grid grid-cols-5 gap-2 p-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => {
                handleSelct(index + 1, "bathrooms");
              }}
              className={`border p-2 rounded ${
                selectedBath === index + 1 ? "bg-primary" : ""
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
            </div>
          </Transition>
        </div>
  )
}

export default RoomSelectHome