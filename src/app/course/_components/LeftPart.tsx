import { Progress } from "@/components/ui/progress";
import ChapterButton from "./ChapterButton";
import { getTotalCourseProgress } from "@/app/(common)/courses/actions";
import { getProgressWithIds } from "../action";
import { prisma } from "@/lib/db";
import Loading from "@/components/Loading";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface LeftPartProps {
  courseId: string;
  isAccessable: boolean;
  visitedUser: boolean;
  isSidebar?: boolean;
}

const LeftPart = async ({
  courseId,
  isAccessable,
  visitedUser,
  isSidebar = false,
}: LeftPartProps) => {
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      chapters: {
        where: { isPublished: true },
        orderBy: { order: "asc" },
      },
    },
  });
  const progress = await getTotalCourseProgress(courseId);
  const progressWithIds = await getProgressWithIds(courseId);

  if (!course) {
    return (
      <div className="hidden lg:flex w-80 min-h-screen border-r">
        <div className="w-full">
          <div className="p-3 border-b-2 flex gap-3 flex-col justify-center items-center">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-2 w-full" />
          </div>
          <div className="p-3">
            {[...Array(8)].map((_, index) => (
              <Skeleton key={index} className="h-10 w-full mb-2" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("min-h-screen ", !isSidebar && "border-r w-80")}>
      <div className="p-3 border-b-2 flex gap-3 flex-col justify-center items-center">
        <h2 className="font-bold">{course?.title}</h2>
        <Progress
          className={cn(
            "opacity-0",
            !visitedUser && isAccessable && "opacity-100"
          )}
          value={progress}
        />
      </div>
      <ul>
        {course?.chapters.map((chapter) => {
          const isCompleted = progressWithIds.includes(chapter.id);
          return (
            <ChapterButton
              key={chapter.id}
              courseId={courseId}
              chapterId={chapter.id}
              isCompleted={isCompleted}
              title={chapter.title}
              isFree={chapter.isFree}
              visitedUser={visitedUser}
              isAccessable={isAccessable}
              isSidebar={isSidebar}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default LeftPart;
