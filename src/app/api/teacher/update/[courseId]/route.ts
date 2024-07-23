import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
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

    const value = await req.json();
    if (!value) {
      return NextResponse.json(
        { message: "field is required to update" },
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

    if (value?.category) {
      const category = await prisma.category.findFirst({
        where: {
          title: value.category,
        },
      });

      if (!category) {
        return NextResponse.json(
          { message: "Category not found" },
          { status: 400 }
        );
      }

      await prisma.course.update({
        where: {
          id: params.courseId,
          userId: user.id,
        },
        data: {
          categoryid: category.id,
        },
      });
    } else {
      await prisma.course.update({
        where: {
          id: params.courseId,
          userId: user.id,
        },
        data: {
          ...value,
        },
      });
    }

    return NextResponse.json({ mesage: "course updated..." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

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

    const value = await req.json();
    if (!value) {
      return NextResponse.json(
        { message: "field is required to update" },
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

    const res = await prisma.course.update({
      where: {
        id: params.courseId,
        userId: user.id,
      },
      data: {
        ...value,
      },
    });

    return NextResponse.json({ mesage: "course updated..." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
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

    await prisma.course.delete({
      where: {
        id: params.courseId,
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
