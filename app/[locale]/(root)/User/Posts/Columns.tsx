"use client";
import { TiDeleteOutline } from "react-icons/ti";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteProperty } from "@/lib/actions/property.action";
import { useSharedState } from "@/app/context/stateProvider";
import { useTranslations } from "next-intl";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Link from "next/link";

// This type is used to define the shape of our data.
export type Property = {
  title: string;
  type: "Rent" | "Buy";
  price: number;
  area: string;
  likes: string[];
  images: { url: string };
  propertyType: string;
  _id: string;
  currency: string;
};

export const UseColumns = (): ColumnDef<Property>[] => {
  const t = useTranslations("property");
  const ta = useTranslations("alert");
  const { setProperty } = useSharedState();
  return [
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
            {price.toLocaleString().replace(/,/g, ".")} {currency}
          </span>
        );
      },
    },
    {
      accessorKey: "area",
      header: t("Area"),
      cell: ({ row }) => (
        <span>
          {row.original.area}m<sup>2</sup>
        </span>
      ),
    },
    {
      accessorKey: "like",
      header: t("Likes"),
      cell: ({ row }) => <span>{row.original.likes?.length || 0}</span>,
    },

    {
      id: "actions",

      cell: ({ row }) => {
        const propertyy = row.original; // Access the row data
        const id = propertyy._id;

        return (
          <div className="flex gap-2 justify-end">
            <Link href={`./Posts/${id}`} passHref>
              <Button
                variant="ghost"
                size="sm"
                className="bg-primary hover:bg-primary/80 text-white hover:text-white text-xs "
                onClick={(e) => {
                  e.preventDefault(); // Prevents navigation from the outer link
                  e.stopPropagation(); // Stops event bubbling
                  window.location.href = `./Posts/${id}`; // Navigate manually
                }}
              >
                Edit
              </Button>
            </Link>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-red-500 hover:bg-red-500/80 text-white hover:text-white text-xs p-2"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>{ta("head")}</AlertDialogTitle>
                  <AlertDialogDescription>{ta("body")}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    {ta("Cancel")}
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={(event) => {
                      event.stopPropagation();
                      deleteProperty({ id, setProperty });
                    }}
                  >
                    {ta("Delete")}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        );
      },
    },
  ];
};
