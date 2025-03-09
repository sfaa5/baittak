"use client";

import * as React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";

import { ChevronDown } from "lucide-react";

interface PriceRangePopoverProps {
  onPriceChange: (range: {
    min: number | undefined;
    max: number | undefined;
  }) => void;
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
        <button
          onClick={togglePopover}
          type="button"
          className={`hover:bg-gray-50   duration-200 flex   ${!minPrice && !maxPrice? "gap-10 px-4":"gap-1 px-2"}  h-[48px] items-center font-medium text-secondary rounded-[.8rem] border-[1px] border-[#1F4454] justify-between `}
        >
          <div className="flex gap-2 items-center flex-wrap">
            {minPrice || maxPrice ? (
              <span className="whitespace-nowrap px-2 py-1 bg-[#466e7f] text-white rounded-md max-w-[100px] sm:max-w-[130px] truncate overflow-hidden">
                {minPrice ?? "—"} - {maxPrice ?? "—"}
              </span>
            ) : (
              <span>{t("search.price")}</span>
            )}
          </div>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-[300px] p-4 ">
        <div className="flex flex-col gap-2 ">
          <Input
            className="text-sm"
            type="number"
            placeholder="Min price"
            value={minPrice ?? ""}
            onChange={(e) =>
              setMinPrice(
                e.target.value ? parseFloat(e.target.value) : undefined
              )
            }
          />

          <Input
            className="text-sm"
            type="number"
            placeholder="Max price"
            value={maxPrice ?? ""}
            onChange={(e) =>
              setMaxPrice(
                e.target.value ? parseFloat(e.target.value) : undefined
              )
            }
          />
          <Button onClick={handleApply}>Apply</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
