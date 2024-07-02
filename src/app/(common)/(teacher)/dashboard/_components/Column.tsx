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
  },
  {
    accessorKey: "isPublished",
    header: "Published",
  },
  {
    accessorKey: "isFree",
    header: "Free",
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
