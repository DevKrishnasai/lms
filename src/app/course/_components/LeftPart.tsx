import { Progress } from "@/components/ui/progress";
import ChapterButton from "./ChapterButton";
import { getTotalCourseProgress } from "@/app/(common)/courses/actions";
import { getProgressWithIds } from "../action";
import { prisma } from "@/lib/db";
import Loading from "@/components/Loading";

interface LeftPartProps {
  courseId: string;
  isAccessable: boolean;
  visitedUser: boolean;
}

const LeftPart = async ({
  courseId,
  isAccessable,
  visitedUser,
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

  if (!course) return;
  <div className="w-full h-screen flex justify-center items-center">
    <Loading />
  </div>;

  return (
    <div className="w-72 min-h-screen border-r">
      <div className="p-3 border-b-2 flex gap-3 flex-col justify-center items-center">
        <h2 className="font-bold">{course?.title}</h2>
        {!visitedUser && isAccessable && <Progress value={progress} />}
      </div>
      <ul>
        {course?.chapters.map((chapter) => {
          console.log(progressWithIds.findIndex((p) => p === chapter.id));
          const isCompleted =
            progressWithIds.findIndex((p) => p === chapter.id) >= 0
              ? true
              : false;
          console.log("isCompleted", isCompleted);
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
            />
          );
        })}
      </ul>
    </div>
  );
};

export default LeftPart;
