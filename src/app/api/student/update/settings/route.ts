import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, res: Response) {
  const { name } = await req.json();
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const user = await prisma.user.update({
    where: {
      authId: userId,
    },
    data: {
      name,
    },
  });
  return NextResponse.json(user, { status: 200 });
}
