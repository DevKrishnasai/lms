import { LucideMessageSquareWarning, MessageSquareWarning } from "lucide-react";
import React from "react";
interface BannerProps {
  isCourse: boolean;
}

const Banner = ({ isCourse }: BannerProps) => {
  const content = isCourse
    ? "This Course is not published. So students can't see this course"
    : "This Chapter is not published. So students can't see this chapter";
  return (
    <div className="w-full">
      <div
        className="bg-yellow-300 border border-red-400 text-red-700 px-4 py-3 flex items-center"
        role="banner"
      >
        <MessageSquareWarning className="w-5 h-5 inline-block mr-1" />
        <span className="block sm:inline">{content}</span>
      </div>
    </div>
  );
};

export default Banner;
