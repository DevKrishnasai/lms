"use server";
import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export const getProgressWithIds = async (courseId: string) => {
  const { userId } = auth();
  if (!userId) {
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
      userId,
      chapterId: {
        in: allChapterIds,
      },
    },
    select: {
      id: true,
    },
  });

  const ids = chapterProgressIds.map((id) => id.id);

  return ids;
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
  const fullDetails = await prisma.chapter.findUnique({
    where: {
      id: chapterId,
    },
    include: {
      attachments: true,
    },
  });
  return fullDetails;
};

export type progressType = Awaited<ReturnType<typeof getProgressWithIds>>;
export type fullChapterType = Awaited<ReturnType<typeof getFullChapter>>;
