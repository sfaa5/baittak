import { useTranslations } from "next-intl";
import React, { useState, useEffect, useRef } from "react";

import { Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ChevronDown } from "lucide-react";
function RoomSelectHome({

  setRooms,

  setBathrooms
}: {
  rooms: string;
  setRooms: React.Dispatch<React.SetStateAction<string>>;
  bathrooms: string;
  setBathrooms: React.Dispatch<React.SetStateAction<string>>;
}) {


  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const [selectedBath, setSelectedBath] = useState("");

  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelct = (num: string,type:string) => {
    if(type === "rooms"){
      if(selected === num)  {setSelected(""); setRooms("") } else {setSelected(num); setRooms(num);}}
    else if(type === "bathrooms") {
    if(selected === num ) {setSelectedBath(""); setBathrooms("");}  else {setSelectedBath(num); setBathrooms(num);}}
  }


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
            className="items-center justify-between gap-4 w-full  px-4 py-3 border border-gray-300 rounded-[6px] bg-white text-gray-700 hover:bg-gray-50 focus:outline-none    hidden lg:flex"
          >
            {t("search.rooms_bath")}
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
                <button
                  type="button"
                  onClick={() => {
                    handleSelct("1","rooms");
                  }}
                  className={` border p-2 rounded ${selected === "1" ? "bg-primary" : ""}`}
                >
                  1 
                </button>
                <button
                  type="button"
                  onClick={()=> handleSelct("2","rooms")}
                  className={`border p-2 rounded ${selected === "2" ? "bg-primary" : ""}`}
                >
                  2 
                </button>
                <button
                  type="button"
                  onClick={() => { handleSelct("3","rooms")} }
                  className={`border p-2 rounded ${selected === "3" ? "bg-primary" : ""}`}
                >
                  3 
                </button>
                <button
                  type="button"
                  onClick={() => { handleSelct("4","rooms")} }
                  className={`border p-2 rounded ${selected === "4" ? "bg-primary" : ""}`}
                >
                  4 
                </button>
                <button
                  type="button"
                  onClick={() => { handleSelct("5","rooms")} }
                  className={`border p-2 rounded ${selected === "5" ? "bg-primary" : ""}`}
                >
                  5 
                </button>
              </div>
    
              <div className="border-t my-2"></div>
    
              <div className="py-2 px-4 text-gray-500 font-semibold">Bathrooms</div>
              <div className="grid grid-cols-5 gap-2 p-2">
                <button
                type="button"
                  onClick={() => {handleSelct("1","bathrooms");}}
                  className={`border p-2 rounded ${selectedBath === "1" ? "bg-primary" : ""}`}
                >
                  1 
                </button>
                <button
                        type="button"
                        onClick={() => {handleSelct("2","bathrooms");}}
                        className={`border p-2 rounded ${selectedBath === "2" ? "bg-primary" : ""}`}
                >
                  2 
                </button>
                <button
                        type="button"
                        onClick={() => {handleSelct("3","bathrooms");}}
                        className={`border p-2 rounded ${selectedBath === "3" ? "bg-primary" : ""}`}
                >
                  3 
                </button>
                <button
                        type="button"
                        onClick={() => {handleSelct("4","bathrooms");}}
                        className={`border p-2 rounded ${selectedBath === "4" ? "bg-primary" : ""}`}
                >
                  4 
                </button>
                <button
                        type="button"
                        onClick={() => {handleSelct("5","bathrooms");}}
                        className={`border p-2 rounded ${selectedBath === "5" ? "bg-primary" : ""}`}
                >
                  5 
                </button>
              </div>
            </div>
          </Transition>
        </div>
  )
}

export default RoomSelectHome