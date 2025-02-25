"use client";

import * as React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { IoIosArrowDown } from "react-icons/io";
import { ChevronDown } from "lucide-react";

interface PriceRangePopoverProps {
  onPriceChange: (range: { min: number | undefined; max: number | undefined }) => void;
}

export function PriceFilter({ onPriceChange }: PriceRangePopoverProps) {
  const [minPrice, setMinPrice] = React.useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = React.useState<number | undefined>(undefined);
  const [isOpen, setIsOpen] = React.useState(false);
  const t = useTranslations();

  const handleApply = () => {
    onPriceChange({ min: minPrice, max: maxPrice });
    setIsOpen(false); // Close the popover
  };

  const togglePopover = () => setIsOpen(!isOpen);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>

      <PopoverTrigger asChild>
        <button   onClick={togglePopover} type="button" className="hover:bg-gray-50  duration-200 flex gap-10 h-[48px] items-center font-medium text-secondary rounded-[.8rem] border-[1px] border-[#1F4454] justify-between px-4">

                {minPrice || maxPrice ? `${minPrice ?? ''} - ${maxPrice ?? ''}` : t("search.price")}
                <ChevronDown className="h-4 w-4 opacity-50"/>
           
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-[300px] p-4 ">

        <div className="flex flex-col gap-2 ">
          <Input
          className="text-sm"
            type="number"
            placeholder="Min price"
            value={minPrice ?? ""}
            onChange={(e) => setMinPrice(e.target.value ? parseFloat(e.target.value) : undefined)}
          />
         
          <Input
            className="text-sm"
            type="number"
            placeholder="Max price"
            value={maxPrice ?? ""}
            onChange={(e) => setMaxPrice(e.target.value ? parseFloat(e.target.value) : undefined)}
          />
          <Button  onClick={handleApply}>Apply</Button>
        </div>

      </PopoverContent>
    </Popover>
  );
}
