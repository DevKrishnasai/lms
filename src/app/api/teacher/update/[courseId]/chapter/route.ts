import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    if (!params.courseId) {
      return NextResponse.json(
        { message: "CourseId is required" },
        { status: 400 }
      );
    }

    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: {
        authId: userId,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const course = await prisma.course.findUnique({
      where: {
        id: params.courseId,
        userId: user.id,
      },
      include: {
        chapters: true,
      },
    });

    if (!course) {
      return NextResponse.json(
        { message: "Course with this id not found" },
        { status: 400 }
      );
    }

    const value = await req.json();
    if (!value) {
      return NextResponse.json(
        { message: "title is required to create" },
        { status: 400 }
      );
    }

    const chapter = await prisma.chapter.create({
      data: {
        title: value.title,
        courseId: params.courseId,
        order: course.chapters.length ? course.chapters.length + 1 : 1,
      },
    });

    return NextResponse.json(
      { message: "Chapter created", ...chapter },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    if (!params.courseId) {
      return NextResponse.json(
        { message: "CourseId is required" },
        { status: 400 }
      );
    }
    const value = await req.json();
    if (!value) {
      return NextResponse.json(
        { message: "chapters are required to reorder" },
        { status: 400 }
      );
    }

    for (let i = 0; i < value.length; i++) {
      await prisma.chapter.update({
        where: {
          id: value[i].id,
          courseId: params.courseId,
        },
        data: {
          order: value[i].order,
        },
      });
    }

    return NextResponse.json({ message: "Chapter reorderd" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
