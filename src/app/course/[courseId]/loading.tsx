import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const loading = () => {
  return (
    <div className="flex">
      {/* Left Part Skeleton */}
      <div className="hidden lg:flex w-80 min-h-screen border-r">
        <div className="w-full">
          <div className="p-3 border-b-2 flex gap-3 flex-col justify-center items-center">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-2 w-full" />
          </div>
          <div className="p-3">
            {[...Array(8)].map((_, index) => (
              <Skeleton key={index} className="h-10 w-full mb-2" />
            ))}
          </div>
        </div>
      </div>

      {/* Right Part Skeleton */}
      <div className="w-full h-full flex-col">
        <div className="flex justify-between items-center border-b px-3 py-5">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-8 w-32" />
        </div>
        <div className="p-4">
          <Skeleton className="h-[400px] w-full mb-4" />
          <div className="flex justify-between mb-4">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>
          <Skeleton className="h-[200px] w-full mb-4" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default loading;
