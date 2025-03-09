"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteProperty } from "@/lib/actions/property.action";
import { useSharedState } from "@/app/context/stateProvider";
import { useLocale, useTranslations } from "next-intl";
import { TiDeleteOutline } from "react-icons/ti";
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
} from "@/components/ui/alert-dialog"

// This type is used to define the shape of our data.
export type Property = {
  title: string;
  currency: string;
  type: "Rent" | "Buy";
  price: number;
  area: string;
  likes: string[];
  images: { url: string };
  propertyType: string;
  address: string;
  city: {
    name: {
      ar: string;
      en: string;
    };
  };
  _id: string;
};

const truncateText = (text: string, maxWords: number) => {
  const words = text.split(" ");
  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(" ") + "...";
  }
  return text;
};

export const UseColumns = (): ColumnDef<Property>[] => {
  const t = useTranslations("property"); // Call the hook inside the function
  const ta =useTranslations("alert");
  const locale = useLocale();
  const { setProperty } = useSharedState();
  return [
    {
      accessorKey: "images",
      header: t("Image"), // Use the `t` function here
      cell: ({ row }) => {
        const images = row.original.images; // Access the images array
        const firstImage = images?.[0]?.url; // Get the first image's URL

        return (
          <div className="flex items-center">
            {firstImage ? (
              <img
                src={firstImage} // Ensure there's no double slash
                alt={t("Image")}
                className="w-14 h-14 rounded-lg object-cover"
              />
            ) : (
              <span>{t("No Image")}</span>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "city",
      header: t("City"),
      cell: ({ row }) => {
        const city =
          locale === "ar" ? row.original.city.name.ar : row.original.city.name.en;
        return <span>{city}</span>;
      },
    },
    {
      accessorKey: "title",
      header: t("Title"),
      cell: ({ row }) => truncateText(row.original.title, 7), // Truncate title to 7 words
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
            {t("Price")}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const priceFrom = row.original.price;
        const currency = row.original.currency;
        return (
          <span>
            {priceFrom} {currency}
          </span>
        );
      },
    },
    {
      accessorKey: "area",
      header: t("Area"),
      cell: ({ row }) => (
        <span>
          {row.original.area} m<sup>2</sup>
        </span>
      ),
    },
    {
      accessorKey: "likes",
      header: t("Likes"),
      cell: ({ row }) => <span>{row.original.likes?.length || 0}</span>,
    },
    {
      id: "actions",
      header: t("Actions"),
      cell: ({ row }) => {
        const Property = row.original;
        const id = Property._id;
       
        return (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="text-red-500 hover:text-red-700 ml-5">
                <TiDeleteOutline size={22} />
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{ta("head")}</AlertDialogTitle>
                <AlertDialogDescription>
                  {ta("body")}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{ta("Cancel")}</AlertDialogCancel>
                <AlertDialogAction
                  onClick={async () => {
                    await deleteProperty({ id, setProperty });
                  }}
                >
                  {ta("Delete")}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        );
      },
    },
  ];
};
