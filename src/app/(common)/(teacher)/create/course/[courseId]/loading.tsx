import Loading from "@/components/Loading";
import React from "react";

const loading = () => {
  return (
    <div className="w-full h-[calc(100vh-90px)] flex justify-center items-center">
      <Loading />
    </div>
  );
};

export default loading;
