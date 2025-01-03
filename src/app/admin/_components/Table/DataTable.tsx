"use client";
import { useEffect, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  VisibilityState,
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
import Link from "next/link";
import { Input } from "@/components/ui/input.tsx";
import { getPath } from "@/lib/functions";
import { revalidatePath } from "next/cache";
import { TypeLightProduct } from "@/lib/types";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    if (screenWidth < 760) {
      setColumnVisibility({
        id: true,
        name: true,
        description: false,
        categoryId: true,
        createdAt: false,
        updatedAt: false,
      });
    }

    if (screenWidth > 759) {
      setColumnVisibility({
        id: true,
        name: true,
        description: true,
        categoryId: true,
        createdAt: true,
        updatedAt: true,
      });
    }

    const x = table.getHeaderGroups();
    console.log(x);
  }, [screenWidth]);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      console.log("Screen width:", window.innerWidth);
    };

    // Attach event listener on mount
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="">
      <p>{screenWidth}</p>
      {/* filter -- search through names */}
      <div className="flex items-center justify-center py-4 md:justify-start">
        <Input
          placeholder="Filter names..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="w-full md:max-w-sm"
        />
      </div>

      {/* 
      --for show multiple selected (not using currently)
      <div className="flex-1 text-sm">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div> */}

      <div className="rounded-md border-none md:border">
        <Table className="w-full table-fixed">
          <TableHeader className="">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="relative -left-3">
                {/* Add an empty header for link cell */}
                <TableHead className="w-0"></TableHead>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="truncate">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          screenWidth > 860
                            ? header.column.columnDef.header
                            : header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="relative"
                >
                  <TableCell className="absolute w-[92%] h-full z-10">
                    <Link
                      href={`${getPath()}/${
                        (row.original as TypeLightProduct).id
                      }`}
                      className="absolute inset-0 h-full w-full"
                      aria-label={`Go to product ${row.id}`}
                    >
                      <span className="absolute h-full w-full"></span>
                    </Link>
                  </TableCell>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-left">
                      {cell.column.id === "description" ||
                      cell.column.id === "name" ? (
                        <div className="line-clamp-4 max-w-44">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </div>
                      ) : (
                        flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  className="h-24 text-left"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div
        className={`flex py-10 space-x-2 ${
          !table.getCanPreviousPage() ? "justify-end" : "justify-end"
        }`}
      >
        {table.getCanPreviousPage() === true && (
          <Button
            className="w-fit"
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
        )}
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
