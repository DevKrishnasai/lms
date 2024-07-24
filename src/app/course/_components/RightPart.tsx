"use client";

import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { fullChapterType, getChapterProgress, getFullChapter } from "../action";
import { GiSpinningBlades } from "react-icons/gi";
import PreviewForChapter from "./PreviewForChapter";
import Loading from "@/components/Loading";
import { SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

interface RightPartProps {
  courseId: string;
  isAccessable: boolean;
  visitedUser: boolean;
  isAuther: boolean;
}

const RightPart = ({
  courseId,
  isAccessable,
  visitedUser,
  isAuther,
}: RightPartProps) => {
  const path = usePathname();
  const chapterId = useSearchParams().get("chapter") || "";
  const [isCompleted, setIsCompleted] = useState(false);
  const [fullChapter, setFullChapter] = useState<fullChapterType | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getFullChapterFun = async () => {
      const full = await getFullChapter(chapterId);
      setFullChapter(full);
      setLoading(false);
    };
    getFullChapterFun();
  }, [chapterId, courseId]);

  useEffect(() => {
    setLoading(true);
    const getCompletionStatus = async () => {
      const status = await getChapterProgress(chapterId);
      setIsCompleted(status);
      setLoading(false);
    };
    getCompletionStatus();
  }, [chapterId, courseId]);

  return (
    <>
      {loading ? (
        <div className="w-full h-full flex-col">
          <div className="flex justify-between items-center border-b px-3 py-5">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-8 w-32" />
          </div>
          <div className="p-4">
            <Skeleton className="h-[400px] w-full mb-4" />
            <div className="flex justify-between mb-4">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-32" />
            </div>
            <Skeleton className="h-[200px] w-full mb-4" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>
      ) : (
        <div className="h-full w-full mb-10">
          {!chapterId ? (
            <div className="w-full h-[calc(100vh-100px)] flex justify-center items-center font-bold text-xl">
              Select a chapter
            </div>
          ) : !fullChapter ? (
            <div className="w-full h-[calc(100vh-100px)] flex justify-center items-center animate-spin">
              <Loading />
            </div>
          ) : fullChapter ? (
            fullChapter.isFree ? (
              <PreviewForChapter
                courseId={courseId}
                isAccessable={isAccessable}
                visitedUser={visitedUser}
                chapterId={chapterId}
                fullChapter={fullChapter}
                isCompleted={isCompleted}
                setIsCompleted={setIsCompleted}
                isAuther={isAuther}
              />
            ) : isAccessable || isAuther ? (
              <PreviewForChapter
                courseId={courseId}
                isAccessable={isAccessable}
                visitedUser={visitedUser}
                chapterId={chapterId}
                fullChapter={fullChapter}
                isCompleted={isCompleted}
                setIsCompleted={setIsCompleted}
                isAuther={isAuther}
              />
            ) : !visitedUser ? (
              <div className="w-full h-[calc(100vh-90px)] flex flex-col gap-3 justify-center items-center font-bold text-xl">
                You need to buy this course to access this chapter
                <Link href={`/checkout?courseId=${courseId}`}>
                  <Button>Buy Course</Button>
                </Link>
              </div>
            ) : (
              <div className="w-full h-[calc(100vh-90px)] flex flex-col gap-3 justify-center items-center font-bold text-xl">
                You need to sign in to access this chapter
                <Button>
                  <SignInButton mode="modal" forceRedirectUrl={path}>
                    Sign In
                  </SignInButton>
                </Button>
              </div>
            )
          ) : null}
        </div>
      )}
    </>
  );
};

export default RightPart;
