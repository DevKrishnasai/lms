import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import { DataTable } from "../../_components/DataTable";
import { StudentsColumn } from "../_components/StudentsColumn";
import { getStudentsForCourse } from "../actions";
import { DataTableForStudents } from "../../_components/DataTableForStudents";

const page = async ({ params }: { params: { courseId: string } }) => {
  if (!params.courseId)
    return <div className="text-2xl w-full mx-auto">Invalid Course Id</div>;
  const { userId } = auth();
  if (!userId) redirect("/");
  const user = await prisma.user.findUnique({
    where: {
      authId: userId,
    },
  });
  if (!user) redirect("/not-allowed");
  if (user.role !== "TEACHER") redirect("/not-authenticated");
  const courseId = params.courseId;
  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
      userId: user.id,
    },
  });
  if (!course)
    return <div className="text-2xl w-full mx-auto">Course not found</div>;
  const data = await getStudentsForCourse(courseId);
  return (
    <div className="w-full h-full p-4 space-y-3">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">
            Students in {`${course.title}`}
          </h1>
          <p className="mb-4 text-sm text-gray-600">
            (Students who are currently following this course)
          </p>
        </div>
      </div>
      <DataTableForStudents columns={StudentsColumn} data={data} />
    </div>
  );
};

export default page;
