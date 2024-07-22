"use client";
import { cn } from "@/lib/utils";
import { Circle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FaLock } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { toast } from "sonner";

interface ChapterButtonProps {
  isCompleted: boolean;
  title: string;
  courseId: string;
  chapterId: string;
  isFree: boolean;
  isAccessable: boolean;
  visitedUser: boolean;
  isSidebar: boolean;
}

const ChapterButton = ({
  courseId,
  isCompleted,
  title,
  chapterId,
  isFree,
  isAccessable,
  visitedUser,
  isSidebar,
}: ChapterButtonProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const chapter = searchParams.get("chapter");

  const openChapter = () => {
    if (chapter === chapterId) return;
    toast.loading("loading chapter...", { id: "chapter" });
    router.push(`/course/${courseId}?chapter=${chapterId}`);
    toast.success("chapter loaded", { id: "chapter" });
  };

  return isSidebar ? (
    <SheetPrimitive.Close asChild>
      <div
        className={cn(
          "w-full px-2 py-5 flex gap-2 items-center cursor-pointer transition-colors duration-300",
          chapter === chapterId &&
            "bg-black text-white font-bold dark:bg-white dark:text-black dark:font-bold",
          chapter !== chapterId &&
            "hover:bg-gray-100 dark:hover:bg-gray-800/30 dark:hover:text-white dark:hover:bg-opacity-50"
        )}
        onClick={openChapter}
      >
        {isCompleted ? (
          <IoMdCheckmarkCircleOutline className="text-lg sm:text-xl md:text-2xl" />
        ) : isAccessable ? (
          <Circle className="text-lg sm:text-xl md:text-2xl" />
        ) : isFree ? (
          <FaLockOpen className="text-lg sm:text-xl md:text-2xl" />
        ) : (
          <FaLock className="text-lg sm:text-xl md:text-2xl" />
        )}
        <p className="text-sm sm:text-base md:text-lg font-semibold">{title}</p>
      </div>
    </SheetPrimitive.Close>
  ) : (
    <div
      className={cn(
        "w-full px-2 py-5 flex gap-2 items-center cursor-pointer transition-colors duration-300",
        chapter === chapterId &&
          "bg-black text-white font-bold dark:bg-white dark:text-black dark:font-bold",
        chapter !== chapterId &&
          "hover:bg-gray-100 dark:hover:bg-gray-800/30 dark:hover:text-white dark:hover:bg-opacity-50"
      )}
      onClick={openChapter}
    >
      {isCompleted ? (
        <IoMdCheckmarkCircleOutline className="text-lg sm:text-xl md:text-2xl" />
      ) : isAccessable ? (
        <Circle className="text-lg sm:text-xl md:text-2xl" />
      ) : isFree ? (
        <FaLockOpen className="text-lg sm:text-xl md:text-2xl" />
      ) : (
        <FaLock className="text-lg sm:text-xl md:text-2xl" />
      )}
      <p className="text-sm sm:text-base md:text-lg font-semibold">{title}</p>
    </div>
  );
};

export default ChapterButton;
