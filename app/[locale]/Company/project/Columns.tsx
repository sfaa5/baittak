import { ColumnDef } from "@tanstack/react-table";

import { deleteProject } from "@/lib/actions/project.action";

import { useSharedState } from "@/app/context/stateProvider";
import { TiDeleteOutline } from "react-icons/ti";
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
// Define the shape of the data
export type Project = {
  _id: string;
  images: { url: string };
  title: string;
  price: number;
  address: string;
  units: number;
  bedrooms: number;
  like: number;
  status: string;
  currency: string;
};

// Helper function to truncate text to a max of 7 words
const truncateText = (text: string, maxWords: number) => {
  const words = text.split(" ");
  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(" ") + "...";
  }
  return text;
};

export const UseColumns = (): ColumnDef<Project>[] => {
  const t = useTranslations("project"); // Call the hook inside the function
  const ta = useTranslations("alert");

  const { setProjects } = useSharedState();
  return [
    {
      accessorKey: "images",
      header: t("Image"), // Translate the header
      cell: ({ row }) => {
        const images = row.original.images;
        const firstImage = images?.[0].url;

        return (
          <div className="flex items-center">
            <img
              src={firstImage}
              alt={t("Image")} // Translate the alt text
              className="w-14 h-14 rounded-lg object-cover"
            />
          </div>
        );
      },
    },
    {
      accessorKey: "title",
      header: t("Title"), // Translate the header
      cell: ({ row }) => truncateText(row.original.title, 7), // Truncate title to 7 words
    },
    {
      accessorKey: "status",
      header: t("Status"), // Translate the header
    },
    {
      accessorKey: "price",
      header: t("Price From"), // Translate the header
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
      accessorKey: "address",
      header: t("Location"), // Translate the header
      cell: ({ row }) => truncateText(row.original.address, 5), // Truncate address to 7 words
    },
    {
      accessorKey: "units",
      header: t("Total Units"), // Translate the header
    },
    {
      accessorKey: "bedrooms",
      header: t("Bedrooms"), // Translate the header
    },
    {
      id: "actions",
      header: t("Actions"), // Translate the header
      cell: ({ row }) => {
        const project: Project = row.original;
        const id = project._id;

        return (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button onClick={(e)=>{e.stopPropagation();}} className="text-red-500  hover:text-red-700 ml-10">
                <TiDeleteOutline size={22} />
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{ta("head")}</AlertDialogTitle>
                <AlertDialogDescription>{ta("body")}</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={(e)=>{e.stopPropagation();}}>{ta("Cancel")}</AlertDialogCancel>
                <AlertDialogAction
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteProject({ id, setProjects });
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
