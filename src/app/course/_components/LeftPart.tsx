import { Progress } from "@/components/ui/progress";
import { Chapter } from "@prisma/client";
import { getProgress, progressType } from "../action";
import ChapterButton from "./ChapterButton";
import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
interface LeftPartProps {
  courseId: string;
  title: string;
  chapters: Chapter[];
}
const LeftPart = async ({ chapters, title, courseId }: LeftPartProps) => {
  // const ids = await getProgress(courseId);
  const { userId } = auth();

  if (!userId) {
    return [[], false];
  }

  const chapterIds = chapters.map((chapter) => chapter.id) || [];
  const chapterProgressIds = await prisma.progress.findMany({
    where: {
      userId,
      chapterId: {
        in: chapterIds,
      },
    },
  });

  return (
    <div className="w-72 min-h-screen border-r">
      <div className="p-3 border-b-2 flex gap-3 flex-col justify-center items-center">
        <h2 className="font-bold">{title}</h2>
        <Progress value={chapterProgressIds.length} />
      </div>
      <ul>
        {chapters.map((chapter) => {
          const isCompleted = chapterProgressIds.find(
            (id) => id.chapterId === chapter.id
          )
            ? true
            : false;
          return (
            <ChapterButton
              key={chapter.id}
              courseId={courseId}
              chapterId={chapter.id}
              isCompleted={false}
              title={chapter.title}
              isFree={chapter.isFree}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default LeftPart;
