"use client";
import { FiUpload } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { IoIosArrowDown } from "react-icons/io";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { useTranslation } from "react-i18next";

function Page() {
  const { t } = useTranslation("common");
  const [count, setCount] = useState(0);

  const increment = () => setCount((prev) => prev + 1);

  
  const decrement = () => setCount((prev) => Math.max(prev - 1, 0));

  const [selectedimages, setSelectedimages] = useState<File[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files); 
      setSelectedimages((prev) => [...prev, ...filesArray]); 
    }
  };

  const handleRemoveImage = (index: number) => {
    setSelectedimages((prev) => prev.filter((_, i) => i !== index)); //  delet image
  };



  // Define the amenities options
  const amenitiesOptions = [
     t("addUser.basement"),
     t("addUser.swimmingPool"),
     t("addUser.familyRoom"),
     t("addUser.airConditioning"),
     t("addUser.fittedWardrobes"),
     t("addUser.disabilityAccess"),
     t("addUser.lift"),
     t("addUser.exterior"),
     t("addUser.garden"),
     t("addUser.terrace"),
     t("addUser.spaHotTub"),
  ];



  return (
    <>
      {/* add a listing */}
      <div className="relative p-7 grid grid-cols-1 gap-7 pt-12 mt-5 rounded-[0.6rem] border-[1px] w-full">
        <div className="bg-white absolute -top-4 left-5">
          <h2 className="text-secondary  px-6 text-2xl font-medium">
          { t("addUser.addListing")}
          </h2>
        </div>

        <div className="flex gap-4">
          <div className="flex w-full flex-col gap-2">
            <p>{t("addUser.selectPropertyType")}</p>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="outline" className="w-full justify-between" >
                  <span>{t("addUser.select")}</span>
                  <IoIosArrowDown className=" h-5 w-5 text-[#707070]" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
      
                <DropdownMenuItem>villa</DropdownMenuItem>
                <DropdownMenuItem>villa</DropdownMenuItem>
                <DropdownMenuItem>villa</DropdownMenuItem>
                <DropdownMenuItem>villa</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex w-full flex-col gap-2">
            <p>{t("addUser.title")}</p>
            <Input type="text" placeholder={`${t("addUser.title")}..`} />
          </div>

          <div className="flex  w-full flex-col gap-2">
            <p>{t("addUser.price")}</p>
            <Input type="text"placeholder={`${t("addUser.price")}..`} />
          </div>
        </div>

        <div className="flex w-full flex-col gap-2">
          <p>{t("addUser.description")}</p>
          <Textarea></Textarea>
        </div>

        <div className="flex gap-4">
          <div className="items-top flex gap-2">
            <Checkbox id="terms1" />

            <label
              htmlFor="terms1"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {t("addUser.buy")}
            </label>
          </div>
          <div className="items-top flex gap-2">
            <Checkbox id="terms2" />

            <label
              htmlFor="terms2"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {t("addUser.rental")}
            </label>
          </div>
        </div>
      </div>

      {/* details */}
      <div className="relative p-7 grid grid-cols-1 gap-7 pt-12 mt-5 rounded-[0.6rem] border-[1px] w-full">
        <div className="bg-white absolute -top-4 left-5">
          <h2 className="text-secondary   px-6 text-2xl font-medium">
            {t("addUser.details")}
          </h2>
        </div>

        <div className="flex  gap-5">
          <div className="flex flex-col w-full gap-2">
            <label htmlFor="Bedroom">{t("addUser.bedrooms")}</label> {/* Counter */}
            <div className="flex w-full items-center justify-between border-[1px]">
              <button
                onClick={decrement}
                className="px-4 py-2 text-white bg-primary flex items-center gap-2 border-r"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="mx-10 text-lg">{count}</span>
              <button
                onClick={increment}
                className="px-4 py-2 text-white bg-primary flex items-center gap-2 border-l"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex flex-col w-full gap-2">
          <label htmlFor="Bedroom">{t("addUser.bathrooms")}</label> {/* Counter */}
          <div className="flex  items-center justify-between border-[1px]">
            <button
              onClick={decrement}
              className="px-4 py-2 text-white bg-primary flex items-center gap-2 border-r"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="mx-10 text-lg">{count}</span>
            <button
              onClick={increment}
              className="px-4 py-2 text-white bg-primary flex items-center gap-2 border-l"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          </div>



          <div className="flex flex-col w-full gap-2">
          <label htmlFor="Bedroom">{t("addUser.numFloors")}</label> {/* Counter */}
          <div className="flex w-full items-center justify-between border-[1px]">
            <button
              onClick={decrement}
              className="px-4 py-2 text-white bg-primary flex items-center gap-2 border-r"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="mx-10 text-lg">{count}</span>
            <button
              onClick={increment}
              className="px-4 py-2 text-white bg-primary flex items-center gap-2 border-l"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          </div>

        </div>


        <div className="flex  gap-5">
        
        <div className="flex flex-col w-full gap-2">
        <label htmlFor="Bedroom">{t("addUser.area")}</label>
<div className="flex relative"><Input type="number"/> <div className="bg-gray-300  absolute right-0 rounded-[0.4rem] h-full w-1/3 flex items-center justify-center">m <sup>2</sup></div></div>
</div>

<div className="flex flex-col w-full gap-2">
        <label htmlFor="Bedroom">{t("addUser.plotWidth")}</label>
<div className="flex relative"><Input type="number"/> <div className="bg-gray-300  absolute right-0 rounded-[0.4rem] h-full w-1/3 flex items-center justify-center">m <sup>2</sup></div></div>
</div>


<div className="flex flex-col w-full gap-2">
        <label htmlFor="Bedroom">{t("addUser.plotLength")}</label>
<div className="flex relative"><Input type="number"/> <div className="bg-gray-300  absolute right-0 rounded-[0.4rem] h-full w-1/3 flex items-center justify-center">m <sup>2</sup></div></div>
</div>
</div>

<div className="flex flex-col w-full gap-2">
  <Label>{t("addUser.landNumber")}</Label>
  <Input placeholder="0000"/>
</div>





      </div>

{/* Amenities */}
<div className="relative p-7 grid grid-cols-1 gap-7 pt-12 mt-5 rounded-[0.6rem] border-[1px] w-full">

<div className="bg-white absolute -top-4 left-5">
          <h2 className="text-secondary   px-6 text-2xl font-medium">
          {t("addUser.amenities")}
          </h2>
        </div>

      {/* Render the checkboxes dynamically */}
      <div className="grid grid-cols-2 gap-4">
        {amenitiesOptions.map((amenity, index) => (
          <div key={index} className="items-top flex gap-3">
            <Checkbox
              id={`amenity-${index}`}
            
             
            />
            <label
              htmlFor={`amenity-${index}`}
              className="text-sm font-medium leading-none"
            >
              {amenity}
            </label>
          </div>
        ))}
      </div>


</div>


{/* Media */}
<div className="relative p-7 grid grid-cols-1 gap-7 pt-12 mt-5 rounded-[0.6rem] border-[1px] w-full mb-20">

<div className="bg-white absolute -top-4 left-5">
          <h2 className="text-secondary   px-6 text-2xl font-medium">
            {t("addUser.media")}
          </h2>
        </div>




        <div className="flex flex-col items-center space-y-4">
 
      <label
        htmlFor="imageUpload"
        className="flex items-center justify-center border-2 border-dashed border-gray-400 rounded-md p-6 w-full  hover:shadow-md cursor-pointer text-center"
      >
        <div className="flex flex-col items-center space-y-2">
          <FiUpload className="text-gray-600 text-4xl" />
          <p className="text-gray-600 font-medium">{t("addUser.uploadImages")}</p>
        </div>
      </label>

    
      <input
        id="imageUpload"
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleImageChange}
      />

      {selectedimages.length > 0 && (
        <div className="w-full  space-y-4">
          <p className="text-center text-gray-500 mb-2">{t("addUser.selectedImages")}:</p>
          <div className="grid grid-cols-2 gap-4">
            {selectedimages.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Uploaded ${index}`}
                  className="rounded-md shadow-md w-full h-40 object-cover"
                />

                <button
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white text-sm px-2 py-1 rounded-md"
                >
                  {t("addUser.remove")}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>





</div>

    </>
  );
}

export default Page;
