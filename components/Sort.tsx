"use client";
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";

function Sort() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Set the initial sort value from URL params if available
  const [sort, setSort] = React.useState(searchParams.get("sort") || "");

  // Function to handle updating URL search params
  const handleUpdateParams = (value) => {
    const newSearchParams = new URLSearchParams(window.location.search);
    newSearchParams.set("sort", value); // Update the "sort" param
    const newPathname = `${window.location.pathname}?${newSearchParams.toString()}`;

    router.push(newPathname); // Navigate to the new URL
  };

  return (
    <Select
      dir={locale === "ar" ? "rtl" : "ltr"}
      value={sort}
      onValueChange={(value) => {
        setSort(value); // Update state with the new value
        handleUpdateParams(value); // Update the URL
      }}
    >
      <SelectTrigger className="flex w-auto gap-3 hover:bg-gray-50 duration-200 h-[40px] items-center font-medium text-secondary rounded-[.8rem] border-[1px] border-[#1F4454] justify-between px-4">
        <SelectValue placeholder={t("property.list")} />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="price-asc">{t("addUser.the most price")}</SelectItem>
        <SelectItem value="price-desc">{t("addUser.the cheapest price")}</SelectItem>
        <SelectItem value="createdAt-desc">{t("addUser.the newest")}</SelectItem>
        <SelectItem value="createdAt-asc">{t("addUser.the oldest")}</SelectItem>
      </SelectContent>
    </Select>
  );
}

export default Sort;
