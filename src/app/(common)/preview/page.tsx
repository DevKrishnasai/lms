import { prisma } from "@/lib/db";
import React from "react";
import CoursePreviewPage from "./_components/CoursePreviewPage";
import { auth } from "@clerk/nextjs/server";

const Page = async ({
  searchParams,
}: {
  searchParams: { courseId: string };
}) => {
  const courseId = searchParams.courseId;
  if (!courseId) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <p className="text-2xl font-bold">Course not found</p>
      </div>
    );
  }

  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
    include: {
      _count: {
        select: {
          accesses: {
            where: { courseId },
          },
        },
      },
      category: true,
      user: true,
      chapters: {
        select: {
          title: true,
          isFree: true,
          id: true,
        },
      },
    },
  });

  if (!course) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <p className="text-2xl font-bold">Course not found</p>
      </div>
    );
  }

  let isEnrolled = false;
  let visitedUser = true;
  let isAuthor = false;

  const { userId } = auth();
  if (userId) {
    const user = await prisma.user.findUnique({
      where: {
        authId: userId,
      },
    });

    if (user) {
      const access = await prisma.access.findFirst({
        where: {
          userId: user.id,
          courseId,
        },
      });

      isEnrolled = !!access;
    }
    visitedUser = false;
    isAuthor = course.user.authId === userId;
  }

  return (
    <div className="overflow-y-auto w-full mx-auto">
      <CoursePreviewPage
        course={course}
        isEnrolled={isEnrolled}
        visitedUser={visitedUser}
        isAuthor={isAuthor}
      />
    </div>
  );
};

export default Page;
