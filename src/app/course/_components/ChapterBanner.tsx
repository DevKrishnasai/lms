import {
  AlertTriangle,
  BookMarked,
  LucideMessageSquareWarning,
  MessageSquareWarning,
} from "lucide-react";
import React from "react";
interface ChapterBannerProps {
  isCompleted: boolean;
}

const ChapterBanner = ({ isCompleted }: ChapterBannerProps) => {
  const content =
    isCompleted &&
    "You have completed this chapter. You can move to the next chapter";

  return (
    <div className="w-full p-4">
      <div
        className="bg-gray-100  border-yellow-400   dark:bg-transparent dark:border-y-[1px] dark:border-y-white dark:border-r-white dark:border-r-[1px] border-l-4 px-6 py-4 rounded-r flex items-center shadow-sm"
        role="alert"
      >
        <AlertTriangle className="w-7 h-7 mr-3 text-yellow-400 flex-shrink-0" />
        <span className="flex-1 text-sm sm:text-base">{content}</span>
      </div>
    </div>
  );
};

export default ChapterBanner;
