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

// Define the shape of the data
export type Project = {
  id: string;
  title: string;
  priceFrom: number;
  location: string;
  totalUnits: number;
  Bedrooms: number;
  like: number;
  status: "Completed" | "Not Completed";
};

// Define columns
export const columns: ColumnDef<Project>[] = [
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
    accessorKey: "priceFrom",
    header: "Price From",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "totalUnits",
    header: "Total Units",
  },
  {
    accessorKey: "Bedrooms",
    header: "Bedrooms",
  },
  {
    accessorKey: "like",
    header: "Likes",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const propertyData: Project = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(propertyData.id);
                  alert("Property ID copied to clipboard!");
                } catch (err) {
                  console.error("Failed to copy: ", err);
                }
              }}
            >
              Copy project ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View project</DropdownMenuItem>
            <DropdownMenuItem>Update</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
