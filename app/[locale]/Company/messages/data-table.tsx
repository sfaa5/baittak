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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSharedState } from "@/app/context/stateProvider";
import { deleteSelectedRequests, } from "@/lib/actions/project.action";
import Modal from "./Modal";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  columFilter: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  columFilter,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const { showDelte, setShowDelte } = useSharedState();
  const { req, setReq } = useSharedState();
  const { dataRequest, setDataRequest } = useSharedState();
  const {activeButton, setActiveButton} = useSharedState();
  const{starRequest,setStarRequest}=useSharedState();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);

  // const handleUnstarClick = async () => {
  //   await unstarSelectedRequests(req, setDataRequest, setStarRequest, starRequest, table);
  //   setDataRequest(starRequest)

  // };

  const handleRowClick = (row) => {
    setSelectedRow(row.original);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRow(null);
  };


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

  return (
    <div>
      <div className="flex items-center py-4">
        <div className="grid grid-cols-2 gap-[65%]  w-full">
          <Input
            placeholder="Filter title..."
            value={
              (table.getColumn(columFilter)?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn(columFilter)?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />

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
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}  >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
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
                  onClick={() => handleRowClick(row)}
                  data-state={row.getIsSelected() && "selected"}
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
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
      {isModalOpen && selectedRow && (
        <Modal
          onClose={closeModal}
          title={selectedRow.name}
          message={selectedRow.message}
          phone={selectedRow.phone}
          email={selectedRow.email}
          time={selectedRow.createdAt}
        />
      )}
    </div>
  );
}
