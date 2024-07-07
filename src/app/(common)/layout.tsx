import MobileSideBar from "@/components/MobileSideBar";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full">
      <Sidebar />
      <div className="w-full h-full ml-16">
        <div className=" flex justify-between items-center border-b px-3 py-2">
          <Navbar />
        </div>
        {children}
      </div>
    </div>
  );
};

export default layout;
