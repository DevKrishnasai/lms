import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import React from "react";

const loading = () => {
  const settings = [1, 2, 3, 4, 5];
  return (
    <div className="w-full min-h-[calc(100vh-100px)] p-4 space-y-3">
      <div className="flex justify-between items-center flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="mb-4 text-sm text-gray-600">
            (Manage your account settings)
          </p>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="space-y-5 w-full lg:w-1/2">
          {settings.map((_, index) => (
            <Skeleton key={index} className="h-10 w-full" />
          ))}
        </div>
        <div className="space-y-5 w-full lg:w-1/2">
          {settings.map((_, index) => (
            <Skeleton
              key={index}
              className={cn("h-10 w-full", index % 2 && "h-40")}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default loading;
