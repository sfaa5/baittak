"use client"
import { useTranslations } from "next-intl";
import React, { useState, useEffect, useRef } from "react";
import { IoIosArrowDown } from "react-icons/io";


import { PopoverContent, PopoverTrigger,Popover } from "./ui/popover";

function RoomSelect({

  setRooms,

  setBathrooms
}: {
  rooms: string;
  setRooms: React.Dispatch<React.SetStateAction<string>>;
  bathrooms: string;
  setBathrooms: React.Dispatch<React.SetStateAction<string>>;
}) {
  const t = useTranslations();
  const [isOpen, setIsOpen] = React.useState(false);
  const [selected, setSelected] = useState("");
  const [selectedBath, setSelectedBath] = useState("");

  const dropdownRef = useRef<HTMLDivElement>(null);

  const togglePopover = () => setIsOpen(!isOpen);

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
    <Popover open={isOpen} onOpenChange={setIsOpen}>

<PopoverTrigger>
      <button
        type="button"
        onClick={togglePopover}
        className="flex  w-[170px] sm:w-[200px] hover:bg-gray-50 duration-200 h-[48px] items-center font-normal text-secondary rounded-[.8rem] border-[1px] border-[#466e7f] justify-between px-4"
      >
        {t("search.rooms_bath")}
        <IoIosArrowDown className="h-4 w-4 opacity-50" />
      </button></PopoverTrigger>



      <PopoverContent className="text-sm p-0 pt-1 bg-white border border-gray-300 rounded-md shadow-lg">

    
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
    

      </PopoverContent>
    </Popover>
  );
}

export default RoomSelect;
