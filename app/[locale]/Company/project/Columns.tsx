"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteProject } from "@/lib/actions/project.action";
import { Update } from "./update";
import { useSharedState } from "@/app/context/stateProvider";
import { useRouter } from "next/navigation";
import { TiDeleteOutline } from "react-icons/ti";

// Define the shape of the data
export type Project = {
  _id: string;
  images: string[];
  title: string;
  price: number;
  address: string;
  units: number;
  bedrooms: number;
  like: number;
  status: string;
};

// Define columns
export const columns: ColumnDef<Project>[] = [


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
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Title <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },


  {
accessorKey:"status",
header:"Status"
  },
  {
    accessorKey: "price",
    header: "Price From",
  },
  {
    accessorKey: "address",
    header: "Location",
  },
  {
    accessorKey: "units",
    header: "Total Units",
  },
  {
    accessorKey: "bedrooms",
    header: "Bedrooms",
  },
  {
    accessorKey: "like",
    header: "Likes",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const project: Project = row.original;
const id = project._id
const {projects,setProjects}=useSharedState()
const router = useRouter()

      return (
      
                <button
                
                onClick={(e)=>{
                  e.stopPropagation();
                 deleteProject({id,setProjects})}}
                  className="text-red-500 hover:text-red-700 ml-5"
                >
               <TiDeleteOutline size={22} />
                </button>


    
      );
    },
  },
];

