"use client"
import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "../../../../components/ui/select";
import { useLocale, useTranslations } from 'next-intl';

function Fllter({ originalProperties, setFilteredProperties }) {

      const locale = useLocale()
      const t = useTranslations()


  // Handle filtering
  const handleFilter = (value) => {
    if (value === "all") {
      // Reset to show all properties
      setFilteredProperties(originalProperties);
    } else {
      // Filter properties based on the selected value
      const filtered = originalProperties.filter((property) => property.for === value);
      setFilteredProperties(filtered);
    }
  };

  return (
    <Select
    dir={locale === "ar" ? "rtl" : "ltr"}
    onValueChange={(value) => {
      handleFilter(value); // Apply filter on value change
    }}
  >
    <SelectTrigger className="flex w-بعمم h-[40px] items-center font-medium text-secondary rounded-[.8rem] border-[1px] border-[#1F4454] justify-between px-4">
      <SelectValue placeholder={t("search.buy")} />
    </SelectTrigger>

    <SelectContent>
    <SelectItem value="all">{t("search.all")}</SelectItem>
      <SelectItem value="rent">{t("addUser.rental")}</SelectItem>
      <SelectItem value="sell">{t("addUser.sell")}</SelectItem>

    </SelectContent>
  </Select>
  )
}

export default Fllter