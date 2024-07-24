import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const loading = () => {
  return (
    <div className="w-full h-full  flex flex-col overscroll-y-auto lg:items-center lg:justify-center p-4">
      <div className="max-w-6xl w-full bg-white dark:bg-gray-900 rounded-lg shadow-xl flex flex-col md:flex-row">
        <div className="md:w-1/2  text-white">
          <Skeleton className="relative w-full h-60" />

          <div className="p-8">
            <Skeleton className="text-3xl font-bold mb-4 h-10" />
            <Skeleton className="text-3xl font-bold mb-6 h-10" />
            <Skeleton className="text-3xl font-bold mb-4 h-10" />
            <Skeleton className="text-3xl font-bold mb-4 h-10" />
            <Skeleton className="text-3xl font-bold mb-6 h-10" />
            <Skeleton className="text-3xl font-bold mb-6 h-20" />
          </div>
        </div>

        <div className="md:w-1/2 p-8 my-auto">
          <Skeleton className="text-3xl font-bold mb-6 h-10" />
          <Skeleton className="text-3xl font-bold mb-6 h-10" />
          <Skeleton className="text-3xl font-bold mb-6 h-10" />
          <div className="flex justify-between gap-4">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default loading;
