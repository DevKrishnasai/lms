import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const loading = () => {
  return (
    <div className=" rounded-lg shadow-xl p-8 max-w-4xl w-full min-h-screen mx-auto">
      <Skeleton className="text-4xl font-bold mb-6 text-center h-20 " />
      <Skeleton className="text-lg mb-8 text-center text-gray-600 h-10" />
      <div>
        <Skeleton className="text-2xl font-semibold mb-4 h-10" />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 7, 8, 9].map((goal) => (
            <div key={goal}>
              <Skeleton className="h-10 rounded-full" />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <Skeleton className="text-2xl font-semibold mb-4 h-10" />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 7, 8, 9].map((goal) => (
            <div key={goal}>
              <Skeleton className="h-10 rounded-full" />
            </div>
          ))}
        </div>
      </div>

      <Skeleton className="text-red-500 text-sm mt-6 h-[6%]" />
    </div>
  );
};

export default loading;
