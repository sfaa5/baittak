"use client";
import * as React from "react";
import {
  SortingState,
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  getSortedRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { useSharedState } from "@/app/context/stateProvider";
import { deleteSelectedRequests, } from "@/lib/actions/project.action";
import { useRouter,usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { FiSearch } from "react-icons/fi";

interface RowData {
  _id?: string;  

}

interface DataTableProps<TData , TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  columFilter: string;
}

export function DataTable<TData extends RowData, TValue>({
  columns,
  data,
  columFilter,
}: DataTableProps<TData , TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const { showDelte } = useSharedState();
  const { req, setReq } = useSharedState();
  const {  setDataRequest } = useSharedState();
  const {activeButton} = useSharedState();

  const pathnaem = usePathname()
  const router = useRouter(); 
  const locale = useLocale();
  const t =useTranslations()


  // const handleUnstarClick = async () => {
  //   await unstarSelectedRequests(req, setDataRequest, setStarRequest, starRequest, table);
  //   setDataRequest(starRequest)

  // };


  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });


  const handleRowClick = (id: string) => {
    console.log(pathnaem)
   if (pathnaem.includes("Company/Properties"))router.push(`/Property/${id}`);
   if(pathnaem.includes("/User/Posts"))router.push(`/Property/${id}`);
    if(pathnaem.includes("/Company/project"))router.push(`/Projects/${id}`);

  };



  return (
    <div>
      <div className="flex items-center py-4">
        
        <div className="grid grid-cols-2 gap-[10%] sm:gap-[65%]  w-full">
<div className="relative max-w-lg">
  <span
    className={`absolute top-1/2 -translate-y-1/2 text-gray-400
      ${locale === "ar" ? "right-3" : "left-3"}`}
    style={{ pointerEvents: "none" }}
  >
    <FiSearch />
  </span>
  <Input
    placeholder={t("inputs.Filter_title")}
    value={
      (table.getColumn(columFilter)?.getFilterValue() as string) ?? ""
    }
    onChange={(event) =>
      table.getColumn(columFilter)?.setFilterValue(event.target.value)
    }
    className={`${locale === "ar" ? "pr-10" : "pl-10"} w-[165px]`}
    dir={locale === "ar" ? "rtl" : "ltr"}
  />
</div>

{activeButton === "inbox" && showDelte && (
      <div className="flex gap-5">
        {/* <Button
          onClick={() =>
            starrSelectedRequests(req, setDataRequest, setStarRequest,starRequest, table)
          }
        >
          Star
        </Button> */}
        <Button
          onClick={() =>
            deleteSelectedRequests(req, setDataRequest, setReq, table)
          }
          className="bg-red-600 hover:bg-red-400"
        >
          Delete
        </Button>
      </div>
    )}
    {/* {activeButton === "starred" && showDelte && (
      <div className="flex gap-5">
        <Button
          onClick={handleUnstarClick
          }
        >
          Unstar
        </Button>
      </div>
    )} */}
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader className="text-sm" >
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow   key={headerGroup.id}  >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead className={`${locale==="ar"?"text-right":"text-left"} `}  key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  onClick={() => handleRowClick(row.original._id )}
                  data-state={row.getIsSelected() && "selected"}
                  
                 className={`cursor-pointer ${pathnaem.includes("User/Posts") && row.getIsSelected() && "selected" && "data-[state=selected]:bg-primary data-[state=selected]:bg-opacity-35"}` }
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"

                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end gap-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {t("table.Previous")}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {t("table.Next")}
        </Button>
      </div>
    </div>
  );
}
