"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ChapterBanner from "./ChapterBanner";
import { fullChapterType, getChapterProgress, getFullChapter } from "../action";
import VideoPlayer from "./VideoPlayer";
import Preview from "@/components/Preview";
interface RightPartProps {
  courseId: string;
}
const RightPart = ({ courseId }: RightPartProps) => {
  const chapterId = useSearchParams().get("chapter") || "";

  const [isCompleted, setIsCompleted] = useState(false);
  const [fullChapter, setFullChapter] = useState<fullChapterType>({
    id: "",
    title: "",
    content: "",
    muxVideo: null,
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
    const getCompletionStatus = async () => {
      const status = await getChapterProgress(chapterId);
      setIsCompleted(status);
    };
    getCompletionStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapterId]);

  useEffect(() => {
    const getFullChapterFun = async () => {
      const full = await getFullChapter(chapterId);
      setFullChapter(full);
    };
    getFullChapterFun();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapterId]);

  console.log(chapterId, isCompleted, fullChapter);
  return (
    <div className="h-full w-full">
      {!chapterId ? (
        <div className="w-full h-full flex justify-center items-center">
          Select a chapter
        </div>
      ) : fullChapter?.courseId ? (
        <div className="h-full w-full">
          {isCompleted && <ChapterBanner isCompleted={isCompleted} />}
          <div className="max-w-5xl mx-auto space-y-5 mt-1">
            <VideoPlayer muxData={fullChapter.muxVideo!} courseId={courseId} />
            <div className="flex justify-between items-center ">
              <p className="font-bold text-xl">{fullChapter.title}</p>
              <button className="bg-blue-500 text-white px-3 py-1 rounded">
                Mark as {isCompleted ? "Incomplete" : "Complete"}
              </button>
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
      ) : (
        <div className="w-full h-full bg-red-800 flex justify-center items-center">
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
};

export default RightPart;
