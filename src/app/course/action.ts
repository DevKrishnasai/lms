"use server";
import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export const getProgressWithIds = async (courseId: string) => {
  const { userId } = auth();
  if (!userId) {
    return [];
  }
  const user = await prisma.user.findUnique({
    where: {
      authId: userId,
    },
  });

  if (!user) {
    return [];
  }

  const allChapters = await prisma.course.findUnique({
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

  const allChapterIds =
    allChapters?.chapters.map((chapter) => chapter.id) || [];
  const chapterProgressIds = await prisma.progress.findMany({
    where: {
      status: "COMPLETED",
      userId: user.id,
      chapterId: {
        in: allChapterIds,
      },
    },
    select: {
      chapterId: true,
    },
  });

  const ids = chapterProgressIds.map((id) => id.chapterId);

  return ids;
};

export const getChapterProgress = async (chapterId: string) => {
  const { userId } = auth();
  if (!userId) {
    return false;
  }
  const user = await prisma.user.findUnique({
    where: {
      authId: userId,
    },
  });
  if (!user) {
    return false;
  }
  const chapterProgress = await prisma.progress.findUnique({
    where: {
      userId_chapterId: {
        chapterId: chapterId,
        userId: user.id,
      },
    },
  });
  return chapterProgress?.status === "COMPLETED" ? true : false;
};

export const getFullChapter = async (chapterId: string) => {
  const fullDetails = await prisma.chapter.findUnique({
    where: {
      id: chapterId,
    },
    include: {
      attachments: true,
    },
  });
  const course = await prisma.course.findUnique({
    where: {
      id: fullDetails?.courseId || "",
    },
  });
  return fullDetails;
};

export const getCourse = async (courseId: string) => {
  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
  });
  return course;
};

export type progressType = Awaited<ReturnType<typeof getProgressWithIds>>;
export type fullChapterType = Awaited<ReturnType<typeof getFullChapter>>;
