"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TeachersPublishedCoursesType } from "../actions";
import ActionsField from "./ActionsField";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
export const columns: ColumnDef<TeachersPublishedCoursesType>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row: { original } }) => {
      return original.category?.title || "No Category";
    },
  },
  {
    accessorKey: "isPublished",
    header: "Published",
    cell: ({ row: { original } }) => {
      return original.isPublished ? "Published" : "UnPublished";
    },
  },
  {
    accessorKey: "isFree",
    header: "Free",
    cell: ({ row: { original } }) => {
      return original.isFree ? "Free" : "Paid";
    },
  },
  {
    accessorKey: "users",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Users
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
  },
  {
    accessorKey: "chapters",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Chapters
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row: { original } }) => {
      return <ActionsField chapter={original} />;
    },
  },
];
