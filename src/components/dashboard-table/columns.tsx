"use client";

import type { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
import { z } from "zod";

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
    accessorKey: "id",
    header: "ID",
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
    accessorKey: "authorID",
    header: "Author ID",
  },
  {
    accessorKey: "display",
    header: "Display",
  },
];