import LeftPart from "../_components/LeftPart";
import RightPart from "../_components/RightPart";
import Navbar from "@/components/Navbar";
import { courseAccess } from "@/app/(common)/courses/actions";
import MobileLeftPart from "../_components/MobileLeftPart";

const Page = async ({ params }: { params: { courseId: string } }) => {
  const courseId = params.courseId;

  const { isCourseAccessableByTheUser, visitedUser, isauther } =
    await courseAccess(courseId);

  return (
    <div className="flex">
      <div className="hidden lg:flex">
        <LeftPart
          courseId={courseId}
          isAccessable={isCourseAccessableByTheUser}
          visitedUser={visitedUser}
        />
      </div>

      <div className="w-full h-full flex-col">
        <div className="flex justify-between items-center">
          <div className="flex lg:hidden">
            <MobileLeftPart
              courseId={courseId}
              isAccessable={isCourseAccessableByTheUser}
              visitedUser={visitedUser}
            />
          </div>
          <div className="w-full flex justify-between items-center border-b px-3 py-5">
            <Navbar />
          </div>
        </div>
        <RightPart
          courseId={courseId}
          isAccessable={isCourseAccessableByTheUser}
          visitedUser={visitedUser}
          isAuther={isauther}
        />
      </div>
    </div>
  );
};

export default Page;
