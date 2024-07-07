"use client";

import { cn } from "@/lib/utils";
import AnimatedGridPattern from "@/components/magicui/animated-grid-pattern";
import { ReactNode } from "react";

const GridPattern = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative flex h-full w-full justify-center items-center">
      {children}
      <AnimatedGridPattern
        numSquares={90}
        maxOpacity={0.8}
        duration={6}
        repeatDelay={0.5}
        className={cn(
          "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[150%] skew-y-12"
        )}
      />
    </div>
  );
};

export default GridPattern;
