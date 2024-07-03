"use server";

import { prisma } from "@/lib/db";

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
      chapters:{
        select:{
          id:true
        },
        where:{
          isPublished:true,
        },
        orderBy:{
          order:"asc"
        }
      }
    },
  });
  const finalCourses = courses.map((course) => {
    return {
      ...course,
      chapters: course._count.chapters,
      chapterId: course.chapters[0].id,
    };
  });

  return finalCourses;
};

export type ModifiedCourseType = Omit<
  Awaited<ReturnType<typeof getCourses>>[0],
  "_count"
>;
