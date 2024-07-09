import {
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
    <div className="w-full">
      <div
        className="bg-yellow-300 border flex gap-3 border-red-400 text-red-700 px-4 py-3"
        role="banner"
      >
        <BookMarked className="w-5 h-5 inline-block mr-1" />
        <span className="block sm:inline">{content}</span>
      </div>
    </div>
  );
};

export default ChapterBanner;
