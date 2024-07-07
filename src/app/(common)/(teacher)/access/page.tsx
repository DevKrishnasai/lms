import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import AddUsersSection from "./_components/AddUsersSection";
import { prisma } from "@/lib/db";
import EnroleUsersToCourseSection from "./_components/EnroleUsersToCourseSection";
import Loading from "@/components/Loading";

const page = async () => {
  const { userId } = auth();
  if (!userId) {
    redirect("/not-authorized");
  }

  const user = await prisma.user.findUnique({
    where: {
      authId: userId,
    },
  });

  if (user?.role !== "TEACHER") {
    redirect("/courses");
  }

  const courses = await prisma.course.findMany({
    where: {
      userId: user.id,
      isPublished: true,
    },
  });

  //add a loading here
  if (!courses) {
    return (
      <div className="w-full h-[calc(100vh-90px)] flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="w-full h-full p-4 space-y-3">
      <div>
        <h2 className="text-2xl">Access Management</h2>
        <p className="mb-4 text-sm text-gray-600">
          (create, update and remove students from specific courses)
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <AddUsersSection courses={courses} />
        <EnroleUsersToCourseSection courses={courses} />
      </div>
    </div>
  );
};

export default page;
