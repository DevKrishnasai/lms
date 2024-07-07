import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { title } = await req.json();
    if (!title) {
      return NextResponse.json(
        { message: "Title is required" },
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

    if (user.role !== "TEACHER") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const course = await prisma.course.findFirst({
      where: {
        title,
        userId: user.id,
      },
    });
    if (course) {
      return NextResponse.json(
        { message: "Course with this title already present" },
        { status: 400 }
      );
    }

    const res = await prisma.course.create({
      data: {
        title,
        userId: user.id,
      },
    });

    const data = {
      id: res.id,
      title: res.title,
    };

    return NextResponse.json(
      { ...data, mesage: "course created..." },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
