"use client";

import { ColumnDef } from "@tanstack/react-table";
import { StudentsForCourseType } from "../actions";
import ActionsField from "./ActionsField";

export const StudentsColumn: ColumnDef<StudentsForCourseType>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "chapters",
    header: "Chapters",
  },
  {
    accessorKey: "progress",
    header: "Progress",
  },
  {
    accessorKey: "accessDate",
    header: "Access Date",
    cell: ({ row }) => {
      return new Date(row.original.accessDate).toLocaleDateString();
    },
  },
  {
    id: "actions",
    cell: ({ row: { original } }) => {
      return <ActionsField student={original} />;
    },
  },
];
