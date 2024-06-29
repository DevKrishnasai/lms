import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import TitleField from "./_components/TitleField";
import DescriptionField from "./_components/DescriptionField";
import ThumbnailField from "./_components/ThumbnailField";
import CategoryField from "./_components/CategoryField";
import CourseFreeField from "./_components/CourseFreeField";
import ChaptersField from "./_components/ChaptersField";

const page = async ({ params }: { params: { courseId: string } }) => {
  const { userId } = auth();
  if (!userId) {
    redirect("/");
  }
  const courseDetails = await prisma.course.findUnique({
    where: {
      id: params.courseId,
      userId,
    },
    include: {
      user: true,
      chapters: {
        orderBy: {
          order: "asc",
        },
      },
    },
  });

  if (!courseDetails || courseDetails.userId !== userId) {
    redirect("/");
  }

  const requiredFileds = [
    courseDetails.title,
    courseDetails.description,
    courseDetails.thumbnail,
    courseDetails.category,
    courseDetails.isFree || courseDetails?.price,
    courseDetails.chapters.some((chapter) => chapter.isPublished),
  ];

  const totalFields = requiredFileds.length;
  const filledFields = requiredFileds.filter((field) => field).length;

  // console.log(courseDetails);

  return (
    <div className="p-3 w-full h-full ">
      <div className="space-y-2 mb-4">
        <h1 className="text-3xl font-bold">Course setup</h1>
        <p className="font-medium">
          complete all the fields ({`${filledFields}/${totalFields}`})
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-4">
          <TitleField title={courseDetails.title} courseId={params.courseId} />
          <DescriptionField
            description={courseDetails.description || ""}
            courseId={params.courseId}
          />
          <ThumbnailField
            thumbnail={courseDetails.thumbnail || ""}
            courseId={params.courseId}
          />
          <CategoryField
            category={courseDetails.category || ""}
            courseId={params.courseId}
          />
        </div>
        <div className="space-y-4">
          <ChaptersField
            chapters={courseDetails.chapters}
            courseId={params.courseId}
          />
          <CourseFreeField
            isFree={courseDetails.isFree}
            price={courseDetails.price || 0}
            courseId={params.courseId}
          />
        </div>
      </div>
    </div>
  );
};

export default page;
