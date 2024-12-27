"use client";
import { format } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useSharedState } from "@/app/context/stateProvider";
import { updateReq } from "@/lib/actions/project.action";

// Define the shape of the data
export type Message = {
  _id: string;
  name: string;
  message: string;
  phone:string;
  createdAt:Date;
};


// Define columns
export const columns: ColumnDef<Message>[] = [
  {
    id: "select",
    header: ({ table }) =>{
            const { showDelte, setShowDelte } = useSharedState();
     if (    table.getIsAllPageRowsSelected() ||
     (table.getIsSomePageRowsSelected() && "indeterminate") || undefined){

        setShowDelte(true)
      }else{
        setShowDelte(false)
      }
      return(
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate") || undefined
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    )},
    cell: ({ row }) => {
     const { req, setReq } = useSharedState();
const request = row.original
// if(row.getIsSelected){
//   setReq([...req,request.id])
// }else{
//   setReq((prev)=>prev.filter((id)=>id!==request.id))
// }

return(
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(e) => {
          row.toggleSelected(!!e);
        
        }}
        aria-label="Select row"
      />
    )},
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
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
    accessorKey: "message",
    header: "message",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "createdAt",
    header: "time",
    cell: ({ row }) => {
  
      return format(new Date(row.original.createdAt), "MMM dd, hh:mm a");
    },
  },
 
];
