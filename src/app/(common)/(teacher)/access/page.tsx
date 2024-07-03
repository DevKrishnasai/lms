import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import AddUsersSection from "./_components/AddUsersSection";
import { prisma } from "@/lib/db";
import EnroleUsersToCourseSection from "./_components/EnroleUsersToCourseSection";

const page = async () => {
  const { userId } = auth();
  if (!userId) {
    redirect("/");
  }

  const courses = await prisma.course.findMany({
    where: {
      userId,
      isPublished: true,
    },
  });

  return (
    <div className="w-full h-full p-4 space-y-3">
      <div>
        <h2 className="text-2xl">Access Management</h2>
        <span>(create, update and remove students from specific courses)</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <AddUsersSection courses={courses} />
        <EnroleUsersToCourseSection courses={courses} />
      </div>
    </div>
  );
};

export default page;
