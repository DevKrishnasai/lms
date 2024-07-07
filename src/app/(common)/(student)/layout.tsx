import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  return <div className="w-full h-full">{children}</div>;
};

export default layout;
