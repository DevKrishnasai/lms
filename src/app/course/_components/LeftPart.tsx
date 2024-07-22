import { Progress } from "@/components/ui/progress";
import ChapterButton from "./ChapterButton";
import { getTotalCourseProgress } from "@/app/(common)/courses/actions";
import { getProgressWithIds } from "../action";
import { prisma } from "@/lib/db";
import Loading from "@/components/Loading";
import { cn } from "@/lib/utils";

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
      <div className="w-full h-screen flex justify-center items-center">
        <Loading />
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
