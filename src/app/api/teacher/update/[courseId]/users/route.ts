import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
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

    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { message: "student id is required to remove" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        authId: userId,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const course = await prisma.course.findFirst({
      where: {
        id: params.courseId,
        userId: user.id,
      },
    });
    if (!course) {
      return NextResponse.json(
        { message: "Course with this id not found" },
        { status: 400 }
      );
    }

    const access = await prisma.access.findFirst({
      where: {
        courseId: params.courseId,
        userId: id,
      },
    });
    if (!access) {
      return NextResponse.json(
        { message: "Student with this id not found" },
        { status: 400 }
      );
    }

    await prisma.access.delete({
      where: {
        id: access.id,
      },
    });

    return NextResponse.json({ mesage: "course deleted..." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
