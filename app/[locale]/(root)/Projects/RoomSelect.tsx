import { useTranslations } from "next-intl";
import React, { useState, useEffect, useRef } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { Transition } from "@headlessui/react";
import { Fragment } from "react";

function RoomSelect({

  setRooms,


}: {
  rooms: string;
  setRooms: React.Dispatch<React.SetStateAction<string>>;
 
}) {
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");

  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelct = (num: string,type:string) => {
    if(type === "rooms"){
      if(selected === num)  {setSelected(""); setRooms("") } else {setSelected(num); setRooms(num);}}
   
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
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={toggleDropdown}
        className="flex w-[230px] h-[48px] items-center font-normal text-secondary rounded-[.8rem] border-[1px] border-[#466e7f] justify-between px-4"
      >
        {t("search.rooms")}
        <IoIosArrowDown className="h-5 w-5 text-secondary" />
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


        </div>
      </Transition>
    </div>
  );
}

export default RoomSelect;
