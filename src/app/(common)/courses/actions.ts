"use server";

import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const getCourses = async (word: string) => {
  const courses = await prisma.course.findMany({
    where: {
      isPublished: true,
      OR: [
        {
          title: {
            contains: word,
          },
        },
        {
          description: {
            contains: word,
          },
        },
        {
          category: {
            contains: word,
          },
        },
      ],
    },
    include: {
      _count: {
        select: {
          chapters: {
            where: {
              isPublished: true,
            },
          },
        },
      },
    },
  });
  const finalCourses = courses.map((course) => {
    return {
      ...course,
      chapters: course._count.chapters,
    };
  });

  return finalCourses;
};

export type ModifiedCourseType = Omit<
  Awaited<ReturnType<typeof getCourses>>[0],
  "_count"
>;
