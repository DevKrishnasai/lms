import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const loading = () => {
  return (
    <div className="flex">
      <div className="hidden lg:flex">
        <div className="w-80 min-h-screen">
          <Skeleton className="h-8 mt-3 mx-2" />
          <Skeleton className="h-5 mt-3 w-3/4 rounded-full mx-auto mb-8" />
          <ul>
            {[1, 2, 3, 4, 5, 6].map((chapter) => {
              return <Skeleton className="h-16 mb-5" key={chapter} />;
            })}
          </ul>
        </div>
      </div>

      <div className="w-full h-full flex-col">
        <div className="flex justify-between items-center">
          <div className="flex lg:hidden">
            <div className="w-1/2 min-h-screen">
              <Skeleton className="h-8 mt-3 mx-2" />
              <Skeleton className="h-5 mt-3 w-3/4 rounded-full mx-auto mb-8" />
              <ul>
                {[1, 2, 3, 4, 5, 6].map((chapter) => {
                  return <Skeleton className="h-16 mb-5" key={chapter} />;
                })}
              </ul>
            </div>
          </div>
          <div className="w-full flex justify-between items-center ">
            <Skeleton className="h-16 w-full" />
          </div>
        </div>
        <div className="w-2/3 mx-auto h-full mt-6">
          <Skeleton className="h-[400px] w-full" />
          <div className="w-full flex justify-between items-center mt-4">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>
          <Skeleton className="h-[600px] w-full mt-4" />

          <div className="w-full flex flex-col gap-2 mt-4">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default loading;
