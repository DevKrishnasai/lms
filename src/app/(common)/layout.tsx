import MobileSideBar from "@/components/MobileSideBar";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full">
      <div className="hidden lg:flex">
        <Sidebar />
      </div>
      <div className="w-full h-full">
        <div className="w-full flex justify-between items-center border-b px-3 py-2">
          <MobileSideBar />
          <Navbar />
        </div>
        {children}
      </div>
    </div>
  );
};

export default layout;
