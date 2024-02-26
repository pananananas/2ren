"use client";
import { ItemDeleteAlert, ItemDeleteAlertIcon } from "../item-manipulation/item-delete-alert";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { ItemEdit } from "../item-manipulation/item-edit";
import type { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { api } from "~/utils/api";
import { toast } from "sonner";
import { z } from "zod";

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "../ui/dropdown-menu";

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
  {
    accessorKey: "display",
    header: "Visibility",
    cell: ({ row }) => {

      const { mutate } = api.items.editDisplay.useMutation({
        onSuccess: () => {
          toast("Changed visibility!", {
            description: "Changed visibility of an item",
          });
        },
        onError: (error) => {
          toast("Item failed to be edited!", {
            description: `ERROR! ${error.message}`,
          });
        },
      });

      return (
        <Switch
          checked={row.original.display}
          onCheckedChange={(value) => {
            mutate({
              id: row.original.id,
              display: value,
            });
          }}
        />
      );
    },
  },
  // {
  //   accessorKey: "edit",
  //   header: "Edit",
  //   cell: ({ row }) => {
  //     return <ItemEditDataTable item={row.original} />;
  //   }
  // },
  {
    accessorKey: "delete",
    header: "Delete",
    cell: ({ row }) => {
      return <ItemDeleteAlertIcon itemId={row.original.id} />;
    }
  },
  
  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     const item = row.original;
  //     const itemImages = item;

  //     return (
  //       <DropdownMenu modal={true}>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <MoreHorizontal className="h-4 w-4" />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //           <DropdownMenuItem
  //             onClick={() => navigator.clipboard.writeText(item.name)}
  //           >
  //             Copy name
  //           </DropdownMenuItem>
  //           <DropdownMenuSeparator />
  //           <DropdownMenuItem>
  //             {/* <ItemEdit item={item}  isDesktop={true} /> */}
  //           </DropdownMenuItem>
  //           <DropdownMenuItem>
  //             {/* <ItemDeleteAlertNoButton itemId={item.id} /> */}

  //           </DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },
  // },
];
