"use client";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

// This type is used to define the shape of our data.
import { z } from "zod";
import { api } from "~/utils/api";

const itemTableSchema = z.object({
  id: z.number(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  color: z.string(),
  price: z.string(),
  currency: z.string(),
  amount: z.string(),
  category: z.string(),
  material: z.string(),
  description: z.string(),
  authorID: z.string(),
  display: z.boolean(),
});

export type ItemTable = z.infer<typeof itemTableSchema>;

export const columns: ColumnDef<ItemTable>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "material",
    header: "Material",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "currency",
    header: "Currency",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "color",
    header: "Color",
  },
  // {
  //   accessorKey: "authorID",
  //   header: "Author ID",
  // },
  {
    accessorKey: "display",
    header: "Display",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const item = row.original;
      const ctx = api.useUtils();
      const { mutate: deleteItem, isLoading: isDeleting } =
        api.items.delete.useMutation({
          onSuccess: () => {
            // Invalidate and refetch the items list
            void ctx.items.getAll.invalidate();
          },
        });
      const handleDelete = () => {
        // Call the delete mutation
        deleteItem(item.id);
      };

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
              onClick={() => navigator.clipboard.writeText(item.material)}
            >
              Copy material
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit item</DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete}>
              <span className="text-red-600">Delete item</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
