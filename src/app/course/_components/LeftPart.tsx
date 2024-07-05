import { Progress } from "@/components/ui/progress";
import { Chapter } from "@prisma/client";
import ChapterButton from "./ChapterButton";
import { getTotalCourseProgress } from "@/app/(common)/courses/actions";
import { getProgressWithIds } from "../action";
interface LeftPartProps {
  courseId: string;
  title: string;
  chapters: Chapter[];
  isAccessable: boolean;
  visitedUser: boolean;
}
const LeftPart = async ({
  chapters,
  title,
  courseId,
  isAccessable,
  visitedUser,
}: LeftPartProps) => {
  const progress = await getTotalCourseProgress(courseId);

  const progressWithIds = await getProgressWithIds(courseId);

  return (
    <div className="w-72 min-h-screen border-r">
      <div className="p-3 border-b-2 flex gap-3 flex-col justify-center items-center">
        <h2 className="font-bold">{title}</h2>
        {!visitedUser && isAccessable && <Progress value={progress} />}
      </div>
      <ul>
        {chapters.map((chapter) => {
          const isCompleted = progressWithIds.find((id) => id === chapter.id)
            ? true
            : false;
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
