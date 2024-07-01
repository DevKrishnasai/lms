"use client";
import { cn } from "@/lib/utils";
import { Minus, PlusCircle, TicketX } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
interface ChapterButtonProps {
  isCompleted: boolean;
  title: string;
  courseId: string;
  chapterId: string;
  isFree: boolean;
}
const ChapterButton = ({
  courseId,
  isCompleted,
  title,
  chapterId,
  isFree,
}: ChapterButtonProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const chapter = searchParams.get("chapter");

  const openChapter = () => {
    router.push(`/course/${courseId}?chapter=${chapterId}`);
  };

  return (
    <div
      className={cn(
        "w-full px-2 py-5 flex gap-2 items-center ",
        chapter === chapterId &&
          "bg-black text-white font-bold dark:bg-white dark:text-black dark:font-bold",
        chapter !== chapterId &&
          "hover:bg-gray-100 dark:hover:bg-gray-800/30 dark:hover:text-white dark:hover:bg-opacity-50"
      )}
      onClick={openChapter}
    >
      {isCompleted ? <Minus /> : <PlusCircle />}
      <p className="text-lg font-semibold">{title}</p>
    </div>
  );
};

export default ChapterButton;
