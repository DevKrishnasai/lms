"use server";

import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const getTeacherPublichedCourses = async () => {
  const { userId } = auth();
  if (!userId) {
    redirect("/");
  }
  const user = await prisma.user.findUnique({
    where: {
      authId: userId,
    },
  });

  if (!user) {
    redirect("/");
  }

  const courses = await prisma.course.findMany({
    where: {
      userId: user.id,
    },
    select: {
      _count: {
        select: {
          accesses: true,
          chapters: true,
        },
      },
      id: true,
      title: true,
      price: true,
      isPublished: true,
      category: true,
      isFree: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const filteredData = courses.map((course) => {
    return {
      ...course,
      users: course._count.accesses,
      chapters: course._count.chapters,
    };
  });
  return filteredData;
};

export type TeachersPublishedCoursesType = Omit<
  Awaited<ReturnType<typeof getTeacherPublichedCourses>>[0],
  "_count"
>;
