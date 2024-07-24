import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const loading = () => {
  const user = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className="w-full min-h-[calc(100vh-100px)] overflow-y-auto p-4 space-y-3">
      <div className="flex justify-between items-center flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-bold">Courses </h1>
          <p className="mb-4 text-sm text-gray-600">
            (Choose your course and dive into career)
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {user.map((_, index) => (
          <div
            key={index}
            className="shadow-md rounded-md border gap-3 cursor-pointer h-[280px]"
          >
            <Skeleton className="h-[60%] w-full rounded-md" />
            <div className="p-2 h-full w-full space-y-4 mt-5">
              <Skeleton className="h-[10%] w-3/4 rounded-md" />
              <Skeleton className="h-[10%] w-full rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default loading;
