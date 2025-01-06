"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Span } from "next/dist/trace";
import { deleteProperty } from "@/lib/actions/property.action";
import { useSharedState } from "@/app/context/stateProvider";
import { useLocale } from "next-intl";
import { TiDeleteOutline } from "react-icons/ti";

// This type is used to define the shape of our data.
export type Property = {

  title: string;
  type: "Rent" | "Buy";
  price: number;
  area: string;
  like: number;
  images: string[];
  propertyType: string;
  address: string;
  city: {name:{
    ar:string,
    en:string,
  }};
  _id:string
};

export const columns: ColumnDef<Property>[] = [
  {
    accessorKey: "images",
    header: "Image",
    cell: ({ row }) => {
      console.log(row.original);
      const images = row.original.images; // Access the images array
      const firstImage = images?.[0]; // Get the first image's URL

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
    header: "title",
  },
  {
    accessorKey: "city",
    header: "city",
    cell:({row})=>{
      const locale = useLocale()
const city = locale==="ar"? row.original.city.name.ar :row.original.city.name.en
      return(
<span>{city}</span>
      )
    }
  },
  {
    accessorKey: "title",
    header: "title",
  },
  {
    accessorKey: "propertyType",
    header: "propertyType",
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
  },
  {
    accessorKey: "area",
    header: "area",
    cell:({row})=>(
 <span>{row.original.area} m<sup>2</sup></span>
    )
  },
  {
    accessorKey: "like",
    header: "like",
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const Property = row.original;
const id =Property._id
const {setProperty}=useSharedState()
      return (

        <button
        
        onClick={(e)=>{
          e.stopPropagation();deleteProperty({ id,setProperty })}}
          className="text-red-500 hover:text-red-700 ml-5"
        >
       <TiDeleteOutline size={22} />
        </button>

          

      );
    },
  },
];
