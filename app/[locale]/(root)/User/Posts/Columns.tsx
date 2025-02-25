"use client";
import { TiDeleteOutline } from "react-icons/ti";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";

import { deleteProperty } from "@/lib/actions/property.action";
import { useSharedState } from "@/app/context/stateProvider";
import {  useTranslations } from "next-intl";

// This type is used to define the shape of our data.
export type Property = {
  title: string;
  type: "Rent" | "Buy";
  price: number;
  area: string;
  likes: string[];
  images: {url:string};
  propertyType: string;
  _id:string,
  currency:string
};

export const UseColumns = (): ColumnDef<Property>[] => {
  const t = useTranslations("property"); // Call the hook inside the function

return[
  {
    accessorKey: "images",
    header: t("Image"),
    cell: ({ row }) => {
      console.log(row.original);
      const images = row.original.images; // Access the images array
      const firstImage = images?.[0].url; // Get the first image's URL

      return (
        <div className="flex items-center">
          <img
            src={firstImage} // Ensure there's no double slash
            alt={`Image `}
            className="w-14 h-14 rounded-lg object-cover"
          />
        </div>
      );
    },
  },
  

  {
    accessorKey: "title",
    header: t("Title"),
    cell: ({ getValue }) => {
      const title: string = getValue() as string;
      const words = title.split(" ").slice(0, 6).join(" "); // Take only the first 5 words
      return words + (title.split(" ").length > 6 ? "..." : ""); // Add "..." if there are more words
    },
  },
  {
    accessorKey: "propertyType",
    header: t("propertyType"),
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },  
        cell: ({ row }) => {
      const price = row.original.price;
      const currency = row.original.currency;
      return (
        <span>
          {price.toLocaleString().replace(/,/g, '.')} {currency}
        </span>
      );
    },
  },
  {
    accessorKey: "area",
    header: t("Area"),
    cell:({row})=>(
 <span>{row.original.area}m<sup>2</sup></span>
    )
  },
  {
    accessorKey: "like",
    header: t("Likes"),
    cell: ({ row }) => <span>{row.original.likes?.length || 0}</span>,
  },
  {
    id: "actions",

    cell: ({ row }) => 
        
        {
    const{property,setProperty}=useSharedState();
      const propertyy = row.original; // Access the row data
      const id = propertyy._id;
  
      return (
        <button
        
          onClick={(event) => {
            event.stopPropagation();
            deleteProperty({ id,property,setProperty });
          }}
          className="text-red-500 hover:text-red-700 ml-5"
        >
       <TiDeleteOutline size={22} />
        </button>
      );
    },
  },
];
};