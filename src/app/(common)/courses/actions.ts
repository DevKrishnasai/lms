"use server";

import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { render } from "@react-email/render";
import nodemailer from "nodemailer";
import CourseCompletionEmail from "../../../../emails/CourseCompletionEmail";

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

export const getCourses = async (word: string, page = 1, pageSize = 20) => {
  const skip = (page - 1) * pageSize;
  const courses = await prisma.course.findMany({
    where: {
      isPublished: true,
      OR: [
        { title: { contains: word } },
        { description: { contains: word } },
        { category: { title: { contains: word } } },
        { user: { name: { contains: word } } },
      ],
    },
    include: {
      _count: {
        select: {
          chapters: { where: { isPublished: true } },
        },
      },
      chapters: {
        select: { id: true },
        where: { isPublished: true },
        orderBy: { order: "asc" },
      },
      user: true,
    },
    skip,
    take: pageSize,
  });

  const finalCourses = courses.map((course) => ({
    ...course,
    chapters: course._count.chapters,
    chapterId: course.chapters[0]?.id,
  }));

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
      user: true,
    },
  });

  if (!chaptersCompleted) {
    return 0;
  }

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

  if (progress === 100) {
    const isAlreadyNotified = await prisma.certificate.findUnique({
      where: {
        courseId_userId: {
          courseId: courseId,
          userId: user.id,
        },
      },
    });

    if (isAlreadyNotified) {
      return progress;
    }

    const certificate = await prisma.certificate.create({
      data: {
        title: chaptersCompleted.title,
        userId: user.id,
        courseId: courseId,
      },
    });
    const transport = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.MAIL_USER,
      to: user.email,
      subject: "Course Completion Certificate",
      html: render(
        CourseCompletionEmail({
          studentName: user?.name || user.email.split("@")[0],
          certificateUrl: `certificate/${certificate.id}`,
          courseName: chaptersCompleted.title,
          instructorName:
            chaptersCompleted.user.name ||
            chaptersCompleted.user.email.split("@")[0],
          instructorPic: chaptersCompleted.user.profilePic || "",
        })
      ),
    };

    transport.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        throw new Error("Error sending email");
      }
    });
  }

  return progress;
};

export type ModifiedCourseType = Omit<
  Awaited<ReturnType<typeof getCourses>>[0],
  "_count"
>;
