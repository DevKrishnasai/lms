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
import Banner from "@/components/Banner";
import PublishField from "./_components/PublishField";
import DurationField from "./_components/DurationField";

const page = async ({ params }: { params: { courseId: string } }) => {
  const { userId } = auth();
  if (!userId) {
    redirect("/not-authorized");
  }
  const user = await prisma.user.findUnique({
    where: {
      authId: userId,
    },
  });

  if (!user) {
    redirect("/not-authorized");
  }

  if (user?.role !== "TEACHER") {
    redirect("/courses");
  }

  const courseDetails = await prisma.course.findUnique({
    where: {
      id: params.courseId,
      userId: user.id,
    },
    include: {
      user: true,
      chapters: {
        orderBy: {
          order: "asc",
        },
      },
      category: {
        select: {
          title: true,
        },
      },
    },
  });

  if (!courseDetails) {
    redirect("/no-course-found");
  }

  const allCategories = await prisma.category.findMany({});

  const requiredFileds = [
    courseDetails.title,
    courseDetails.description,
    courseDetails.thumbnail,
    courseDetails.category?.title,
    courseDetails.isFree || courseDetails?.price,
    courseDetails.chapters.some((chapter) => chapter.isPublished),
  ];

  const totalFields = requiredFileds.length;
  const filledFields = requiredFileds.filter((field) => field).length;

  const isAllFieldsFilled = totalFields === filledFields;
  return (
    <div className="w-full overflow-y-auto">
      {!courseDetails.isPublished && <Banner isCourse={true} />}
      {/* <BackField courseId={params.courseId} /> */}

      <div className="p-3 w-full h-full ">
        <div className="mb-4 flex justify-between items-center">
          <div className="space-y-2 ">
            <h1 className="text-3xl font-bold">Course setup</h1>
            <p className="font-sm text-sm ">
              complete all the fields ({`${filledFields}/${totalFields}`})
            </p>
          </div>
          <PublishField
            courseDeatils={courseDetails}
            isCompleted={isAllFieldsFilled}
            courseId={params.courseId}
            user={user}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-4">
            <TitleField
              title={courseDetails.title}
              courseId={params.courseId}
            />
            <DescriptionField
              description={courseDetails.description || ""}
              courseId={params.courseId}
            />
            <ThumbnailField
              thumbnail={courseDetails.thumbnail || ""}
              courseId={params.courseId}
            />
            <CategoryField
              category={courseDetails.category?.title || ""}
              courseId={params.courseId}
              availableCategories={allCategories}
            />
          </div>
          <div className="space-y-4">
            <ChaptersField
              chapters={courseDetails.chapters}
              courseId={params.courseId}
            />
            <DurationField
              duration={courseDetails.duration}
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
    </div>
  );
};

export default page;
