import LeftPart from "../_components/LeftPart";
import RightPart from "../_components/RightPart";
import Navbar from "@/components/Navbar";
import { courseAccess } from "@/app/(common)/courses/actions";

const Page = async ({ params }: { params: { courseId: string } }) => {
  const courseId = params.courseId;

  const { isCourseAccessableByTheUser, visitedUser } = await courseAccess(
    courseId
  );

  return (
    <div className="flex">
      <LeftPart
        courseId={courseId}
        isAccessable={isCourseAccessableByTheUser}
        visitedUser={visitedUser}
      />
      <div className="w-full h-full">
        <div className="w-full flex justify-between items-center border-b px-3 py-5">
          <Navbar />
        </div>
        <RightPart
          courseId={courseId}
          isAccessable={isCourseAccessableByTheUser}
          visitedUser={visitedUser}
        />
      </div>
    </div>
  );
};

export default Page;
