import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const loading = () => {
  return (
    <div className="w-full min-h-[calc(100vh-100px)] p-4 space-y-3">
      <div className="flex justify-between items-center flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="mb-4 text-sm text-gray-600">
            (Manage your courses here)
          </p>
        </div>
        <div>
          <Skeleton className="h-10 w-32 rounded-md" />
        </div>
      </div>

      <Skeleton className="h-10 w-1/3 rounded-md" />
      <div className="flex flex-col gap-3">
        {[1, 2, 3, 4].map((access) => (
          <Skeleton key={access} className="h-10 w-full rounded-md" />
        ))}
      </div>
      <div className="flex items-center justify-end gap-3">
        <Skeleton className="h-10 w-28 rounded-md" />
        <Skeleton className="h-10 w-28 rounded-md" />
      </div>
    </div>
  );
};

export default loading;
