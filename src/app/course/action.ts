"use server";
import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export const getProgress = async (courseId: string) => {
  const { userId } = auth();
  if (!userId) {
    return [[], false];
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
      userId,
      chapterId: {
        in: chapterIds,
      },
    },
  });

  return chapterProgressIds;
};

export const getChapterProgress = async (chapterId: string) => {
  const { userId } = auth();
  if (!userId) {
    return false;
  }
  const chapterProgress = await prisma.progress.findFirst({
    where: {
      userId,
      chapterId,
    },
  });
  return chapterProgress ? true : false;
};

export const getFullChapter = async (chapterId: string) => {
  const { userId } = auth();
  if (!userId) {
    return null;
  }
  const fullDetails = await prisma.chapter.findUnique({
    where: {
      id: chapterId,
    },
    include: {
      muxVideo: true,
      attachments: true,
    },
  });
  return fullDetails;
};
export type progressType = Awaited<ReturnType<typeof getProgress>>;
export type fullChapterType = Awaited<ReturnType<typeof getFullChapter>>;
