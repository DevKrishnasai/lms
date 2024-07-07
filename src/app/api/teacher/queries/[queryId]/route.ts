import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { queryId: string } }
) {
  try {
    if (!params.queryId) {
      return NextResponse.json(
        { message: "QueryId is required" },
        { status: 400 }
      );
    }

    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const value = await req.json();

    if (!value) {
      return NextResponse.json(
        { message: "Invalid request body" },
        { status: 400 }
      );
    }

    await prisma.requests.update({
      where: {
        id: params.queryId,
      },
      data: {
        status: value.status === "COMPLETED" ? "IN_PROGRESS" : "COMPLETED",
      },
    });

    return NextResponse.json(
      { message: "Query resolved successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
