import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  console.log(params);
  try {
    if (!params.courseId || !params.chapterId) {
      return NextResponse.json(
        { message: "CourseId and ChapterId are required" },
        { status: 400 }
      );
    }

    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const res = await prisma.chapter.delete({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
    });

    return NextResponse.json(
      { message: "Chapter deleted", ...res },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
