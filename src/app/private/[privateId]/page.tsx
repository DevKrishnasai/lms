import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const page = async ({ params }: { params: { privateId: string } }) => {
  if (!params.privateId) {
    redirect("/private");
  }
  if (params.privateId !== process.env.PRIVATE_ID) {
    redirect("/private");
  }
  const { userId } = auth();
  if (!userId) {
    redirect("/private");
  }

  const user = await prisma.user.findUnique({
    where: {
      authId: userId,
    },
  });

  if (!user) {
    redirect("/private");
  }

  const updateUserAsTeacher = await prisma.user.update({
    where: {
      authId: userId,
    },
    data: {
      role: "TEACHER",
    },
  });

  return (
    <div className="mx-auto h-screen flex flex-col gap-5 justify-center items-center">
      <div className="text-4xl font-bold">Private page</div>
      <div>USER ID: {user.authId}</div>
      <div>USER NAME: {user.name}</div>
      <div>USER EMAIL: {user.email}</div>

      <div>Role: {updateUserAsTeacher.role}</div>
    </div>
  );
};

export default page;
