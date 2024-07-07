import { prisma } from "@/lib/db";
import React from "react";
import QuriesSection from "./_components/QuriesSection";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const page = async () => {
  const { userId } = auth();
  if (!userId) redirect("/courses");

  const user = await prisma.user.findUnique({
    where: {
      authId: userId,
    },
  });

  if (!user) {
    redirect("/courses");
  }

  if (user.role !== "TEACHER") {
    redirect("/courses");
  }

  return (
    <div className="w-full h-full p-4 space-y-3">
      <QuriesSection />
    </div>
  );
};

export default page;
