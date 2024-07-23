import { Badge } from "@/components/ui/badge";
import { Category } from "@prisma/client";
import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Props {
  categories: Category[];
  search: string;
}

const Categories = ({ categories, search }: Props) => {
  return (
    <div className="flex space-x-2 overflow-x-auto pb-2 whitespace-nowrap">
      {categories.map((cat) => (
        <Link href={`/courses?search=${cat.title}`} key={cat.id}>
          <Badge
            className={cn(
              "px-3 py-1 cursor-pointer hover:bg-primary-600 transition-colors",
              search === cat.title && "bg-green-600"
            )}
          >
            {cat.title}
          </Badge>
        </Link>
      ))}
    </div>
  );
};

export default Categories;
