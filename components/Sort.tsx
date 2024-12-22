"use client"
import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from "next/navigation";


function Sort() {

const t = useTranslations();
const locale = useLocale();
const [sort, setSort] = React.useState("");


const router = useRouter();

  // update the URL search parameters and navigate to the new URL
  const handleUpdateParams = () => {
    
      // Get the current URL search params
  const searchParams = new URLSearchParams(window.location.search);

  searchParams.set("sort", sort);

   // Set the specified search parameter to the given value
   const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

    router.push(newPathname); // Navigate to the updated URL
  };



  return (
    <Select    dir={locale === "ar" ? "rtl" : "ltr"}
    value={sort}
    onValueChange={(value) => {
        setSort(value); // Update the state with the selected value 
        handleUpdateParams();
    }}
  >
    <SelectTrigger className="flex w-auto gap-3 h-[40px] items-center font-medium text-secondary rounded-[.8rem] border-[1px] border-[#1F4454] justify-between px-4">
      <SelectValue placeholder={t("property.list")} />
    </SelectTrigger>

    <SelectContent>
      <SelectItem value="price-asc">{t("addUser.the most price")}</SelectItem>
      <SelectItem value="price-desc">{t("addUser.the cheapest price")}</SelectItem>
      <SelectItem value="createdAt-desc">{t("addUser.the newest")}</SelectItem>
      <SelectItem value="createdAt-asc">{t("addUser.the oldest")}</SelectItem>


      

    </SelectContent>
  </Select>
  )
}

export default Sort