import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <div className="flex w-full">
        <Sidebar />
        {children}
      </div>
    </div>
  );
};

export default layout;
