"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TeachersPublishedCoursesType } from "../actions";
import ActionsField from "./ActionsField";

export const columns: ColumnDef<TeachersPublishedCoursesType>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "price",
    header: "Price",
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
    header: "Users",
  },
  {
    accessorKey: "chapters",
    header: "Chapters",
  },
  {
    id: "actions",
    cell: ({ row: { original } }) => {
      return <ActionsField chapter={original} />;
    },
  },
];
