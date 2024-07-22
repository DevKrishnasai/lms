import { fullChapterType } from "../action";
import { usePathname, useRouter } from "next/navigation";
import ChapterBanner from "./ChapterBanner";
import VideoPlayer from "./VideoPlayer";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";
import Link from "next/link";
import Preview from "@/components/Preview";
import { cn, updateTheField } from "@/lib/utils";
interface RightPartProps {
  courseId: string;
  isAccessable: boolean;
  visitedUser: boolean;
  chapterId: string;
  fullChapter: fullChapterType;
  isCompleted: boolean;
  setIsCompleted: (value: boolean) => void;
  isAuther: boolean;
}
const PreviewChapter = ({
  courseId,
  isAccessable,
  visitedUser,
  chapterId,
  fullChapter,
  isCompleted,
  setIsCompleted,
  isAuther,
}: RightPartProps) => {
  const path = usePathname();
  const router = useRouter();
  const markAsComplete = async () => {
    try {
      await updateTheField(
        { completed: !isCompleted },
        `/api/student/update/chapter/${chapterId}`,
        "POST"
      );
      setIsCompleted(!isCompleted);
      router.refresh();
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };

  if (!fullChapter) return null;
  return (
    <div className="h-full w-full space-y-3 ">
      {isCompleted && <ChapterBanner isCompleted={isCompleted} />}
      <div className="max-w-5xl mx-auto space-y-5 mt-1 p-2">
        {fullChapter.videoUrl !== "" && fullChapter.videoUrl !== null && (
          <VideoPlayer
            videoUrl={fullChapter?.videoUrl || ""}
            courseId={courseId}
          />
        )}

        <div
          className={cn(
            "flex justify-between items-center",
            (fullChapter.videoUrl === null || fullChapter.videoUrl === "") &&
              "mt-4"
          )}
        >
          <p className="font-bold text-xl">{fullChapter?.title}</p>
          {isAuther ? (
            <Link href={`/create/course/${courseId}/chapter/${chapterId}`}>
              <Button>Edit</Button>
            </Link>
          ) : !visitedUser && isAccessable ? (
            <Button
              className="bg-blue-500 text-white px-3 py-1 rounded"
              onClick={markAsComplete}
            >
              Mark as {isCompleted ? "Incomplete" : "Complete"}
            </Button>
          ) : visitedUser ? (
            <Button>
              <SignInButton forceRedirectUrl={path} mode="modal" />
            </Button>
          ) : (
            <Link href={`/checkout?courseId=${courseId}`}>
              <Button>Buy Course</Button>
            </Link>
          )}
        </div>
        <div className="border border-black dark:border-white/35 rounded-sm">
          <Preview content={fullChapter?.content || ""} />
        </div>
        {fullChapter.attachments.length > 0 && (
          <div>
            <p className="font-bold text-xl">Attachments</p>
            {fullChapter?.attachments.map((attachment) => (
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
        )}
      </div>
    </div>
  );
};

export default PreviewChapter;
