import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { chapterId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    if (!params.chapterId) {
      return NextResponse.json(
        { message: "chapterID is required" },
        { status: 400 }
      );
    }
    const value = await req.json();

    const user = await prisma.user.findUnique({
      where: {
        authId: userId,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const chapter = await prisma.progress.upsert({
      where: {
        userId_chapterId: {
          chapterId: params.chapterId,
          userId: user.id,
        },
      },
      update: {
        status: value.completed ? "COMPLETED" : "IN_PROGRESS",
      },
      create: {
        chapterId: params.chapterId,
        userId: user.id,
        status: value.completed ? "COMPLETED" : "IN_PROGRESS",
      },
    });

    return NextResponse.json({ message: "progress updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
