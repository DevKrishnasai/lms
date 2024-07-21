"use server";

import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export const courseAccess = async (courseId: string) => {
  const { userId } = auth();
  let visitedUser = false;
  if (!userId) visitedUser = true;
  let isCourseAccessableByTheUser = false;
  let isauther = false;
  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
    include: {
      user: true,
    },
  });

  if (!course) {
    return { visitedUser, isCourseAccessableByTheUser, isauther };
  }

  if (course.user.authId === userId) {
    isauther = true;
    visitedUser = false;
    return { visitedUser, isCourseAccessableByTheUser, isauther };
  }
  if (userId) {
    const user = await prisma.user.findUnique({
      where: {
        authId: userId,
      },
    });
    if (user) {
      const courseAccess = await prisma.access.findUnique({
        where: {
          courseId_userId: {
            courseId: courseId,
            userId: user.id,
          },
        },
      });
      if (courseAccess) isCourseAccessableByTheUser = true;
    }
  }

  return { visitedUser, isCourseAccessableByTheUser, isauther };
};

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
            title: {
              contains: word,
            },
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
      chapters: {
        select: {
          id: true,
        },
        where: {
          isPublished: true,
        },
        orderBy: {
          order: "asc",
        },
      },
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

export const getTotalCourseProgress = async (courseId: string) => {
  const { userId } = auth();
  if (!userId) {
    return 0;
  }

  const user = await prisma.user.findUnique({
    where: {
      authId: userId,
    },
  });

  if (!user) {
    return 0;
  }

  const chaptersCompleted = await prisma.course.findUnique({
    where: {
      id: courseId,
      isPublished: true,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        select: {
          id: true,
        },
      },
    },
  });

  const chapterIds =
    chaptersCompleted?.chapters.map((chapter) => chapter.id) || [];
  const chapterProgressIds = await prisma.progress.findMany({
    where: {
      status: "COMPLETED",
      userId: user.id,
      chapterId: {
        in: chapterIds,
      },
    },
  });

  //calculate the progress
  const totalChapters = chapterIds.length;
  const completedChapters = chapterProgressIds.length;
  const progress = (completedChapters / totalChapters) * 100;

  return progress;
};

export type ModifiedCourseType = Omit<
  Awaited<ReturnType<typeof getCourses>>[0],
  "_count"
>;
