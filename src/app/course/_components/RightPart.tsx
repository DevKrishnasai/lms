"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ChapterBanner from "./ChapterBanner";
import { fullChapterType, getChapterProgress, getFullChapter } from "../action";
import VideoPlayer from "./VideoPlayer";
import { Button } from "@/components/ui/button";
import Preview from "@/components/Preview";
interface RightPartProps {
  courseId: string;
  isAccessable: boolean;
  visitedUser: boolean;
}
const RightPart = ({ courseId, isAccessable, visitedUser }: RightPartProps) => {
  const chapterId = useSearchParams().get("chapter") || "";

  const [fullChapter, setFullChapter] = useState<fullChapterType>({
    id: "",
    title: "",
    content: "",
    attachments: [],
    courseId: "",
    createdAt: new Date(),
    isFree: false,
    isPublished: false,
    order: 0,
    updatedAt: new Date(),
    videoUrl: "",
  });

  useEffect(() => {
    const getFullChapterFun = async () => {
      const full = await getFullChapter(chapterId);
      setFullChapter(full);
    };
    getFullChapterFun();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapterId]);

  console.log("fullChapter", fullChapter);

  return (
    <div className="h-full w-full">
      {!chapterId ? (
        <div className="w-full h-full flex justify-center items-center">
          Select a chapter
        </div>
      ) : fullChapter?.courseId ? (
        fullChapter.isFree || isAccessable ? (
          <PreviewChapter
            courseId={courseId}
            isAccessable={isAccessable}
            visitedUser={visitedUser}
            chapterId={chapterId}
            fullChapter={fullChapter}
          />
        ) : (
          <div className="w-full h-full bg-red-800 flex justify-center items-center">
            <p>Not Accessable</p>
          </div>
        )
      ) : (
        <div className="w-full h-full bg-red-800 flex justify-center items-center">
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
};

export default RightPart;

const PreviewChapter = ({
  courseId,
  isAccessable,
  visitedUser,
  chapterId,
  fullChapter,
}: RightPartProps & { chapterId: string; fullChapter: fullChapterType }) => {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const getCompletionStatus = async () => {
      const status = await getChapterProgress(chapterId);
      setIsCompleted(status);
    };
    getCompletionStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapterId]);
  return (
    fullChapter && (
      <div className="h-full w-full">
        {isCompleted && <ChapterBanner isCompleted={isCompleted} />}
        <div className="max-w-5xl mx-auto space-y-5 mt-1">
          <VideoPlayer
            videoUrl={fullChapter.videoUrl || ""}
            courseId={courseId}
          />
          <div className="flex justify-between items-center ">
            <p className="font-bold text-xl">{fullChapter.title}</p>
            {!visitedUser && isAccessable ? (
              <button className="bg-blue-500 text-white px-3 py-1 rounded">
                Mark as {isCompleted ? "Incomplete" : "Complete"}
              </button>
            ) : visitedUser ? (
              <Button>Login</Button>
            ) : (
              <Button>Subscribe</Button>
            )}
            {/* <button className="bg-blue-500 text-white px-3 py-1 rounded">
                Mark as {isCompleted ? "Incomplete" : "Complete"}
              </button> */}
          </div>
          <div className="border border-black dark:border-white/35 rounded-sm">
            <Preview content={fullChapter.content || ""} />
          </div>
          <div>
            <p className="font-bold text-xl">Attachments</p>
            {fullChapter.attachments.map((attachment) => (
              <div
                key={attachment.id}
                className="flex items-center border-b p-2 gap-2"
              >
                <p>-</p>
                <a
                  href={attachment.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 underline hover:no-underline"
                >
                  {attachment.name}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};
