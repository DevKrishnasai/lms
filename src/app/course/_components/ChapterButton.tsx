"use client";
import { cn } from "@/lib/utils";
import { Circle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import {
  IoMdCheckmarkCircleOutline,
  IoIosAddCircleOutline,
} from "react-icons/io";
import { FaLock } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa";

interface ChapterButtonProps {
  isCompleted: boolean;
  title: string;
  courseId: string;
  chapterId: string;
  isFree: boolean;
  isAccessable: boolean;
  visitedUser: boolean;
}
const ChapterButton = ({
  courseId,
  isCompleted,
  title,
  chapterId,
  isFree,
  isAccessable,
  visitedUser,
}: ChapterButtonProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const chapter = searchParams.get("chapter");

  const openChapter = () => {
    router.push(`/course/${courseId}?chapter=${chapterId}`);
  };

  const isLocked = visitedUser || !isAccessable;

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
      {isCompleted ? (
        <IoMdCheckmarkCircleOutline size={25} />
      ) : isFree ? (
        <FaLockOpen />
      ) : isLocked ? (
        <FaLock />
      ) : (
        <Circle size={20} />
      )}
      <p className="text-lg font-semibold">{title}</p>
    </div>
  );
};

export default ChapterButton;
