"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { formatDateTime, getPath } from "@/lib/functions";
import { deleteProduct } from "../../_actions/products";
import Link from "next/link";

export const productHead = [
  "id",
  "name",
  "description",
  "categoryId",
  "basePrice",
  "image",
  "createdAt",
  "updatedAt",
];

export type Product = {
  id: number;
  name: string;
  description: string;
  categoryId: number;
  basePrice: number;
  image: string;
  createdAt: Date;
  updatedAt: Date;
};

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center text-sm" // Center text vertically and align left
      >
        ID
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center text-left text-sm" // Center text vertically and align left
      >
        Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center text-left text-sm" // Center text vertically and align left
      >
        Description
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "categoryId",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center text-left text-sm" // Center text vertically and align left
      >
        Category
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "basePrice",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center text-left text-sm" // Center text vertically and align left
      >
        Price
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const price = row.getValue<number>("basePrice");
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);
    },
  },
  {
    accessorKey: "image",
    header: () => (
      <div className="flex items-center px-4 text-left text-sm">Image</div>
    ),
    cell: ({ row }) => (
      <img
        src={row.getValue<string>("image")}
        alt="Product"
        className="w-16 h-16 object-cover"
      />
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center text-left text-sm"
      >
        Created
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue<Date>("createdAt"));
      const { formattedDate, formattedTime } = formatDateTime(date);

      return (
        <div>
          <div>{formattedDate}</div>
          <div className="text-gray-500 text-xs">{formattedTime}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center text-left text-sm"
      >
        Updated
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue<Date>("updatedAt"));
      const { formattedDate, formattedTime } = formatDateTime(date);

      return (
        <div>
          <div>{formattedDate}</div>
          <div className="text-gray-500 text-xs">{formattedTime}</div>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

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
            <DropdownMenuItem>
              <Link href={`../product/${row.original.id}`}>View in store</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={`${getPath()}/${row.original.id}`}>Edit product</Link>
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => {}}>Deactivate</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => deleteProduct(row.original.id)}>
              Delete Item
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
