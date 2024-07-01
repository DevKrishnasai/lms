import { prisma } from "@/lib/db";
import LeftPart from "../_components/LeftPart";
import RightPart from "../_components/RightPart";
import Navbar from "@/components/Navbar";
import { redirect } from "next/navigation";

const page = async ({ params }: { params: { courseId: string } }) => {
  const courseId = params.courseId;
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        orderBy: {
          order: "asc",
        },
      },
    },
  });
  if (!course) redirect("/");
  return (
    <div className="flex">
      <LeftPart
        chapters={course?.chapters || []}
        title={course?.title || ""}
        courseId={courseId}
      />
      <div className="w-full h-full">
        <div className="w-full flex justify-between items-center border-b px-3 py-5">
          <Navbar />
        </div>
        <RightPart courseId={courseId} />
      </div>
    </div>
  );
};

export default page;
