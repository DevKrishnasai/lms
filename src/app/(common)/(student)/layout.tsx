import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-full h-full">{children}</div>;
};

export default layout;
