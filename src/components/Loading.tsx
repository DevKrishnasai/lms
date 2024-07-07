import { Loader } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <Loader className="animate-spin" size={40} />
    </div>
  );
};

export default Loading;
