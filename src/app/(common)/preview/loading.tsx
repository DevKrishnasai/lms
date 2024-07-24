import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const loading = () => {
  return (
    <div className="w-full lg:w-3/4 h-full mx-auto p-6 bg-background text-foreground">
      <div className="flex flex-col md:flex-row gap-8 h-full">
        {/* Left Column */}
        <Skeleton className="md:w-2/3 h-[70%] border border-foreground/20 rounded-lg p-6" />

        {/* Right Column */}
        <div className="md:w-1/3 h-[40%]">
          <Skeleton className="border border-foreground/20 p-6 rounded-lg mb-6 h-40" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default loading;
