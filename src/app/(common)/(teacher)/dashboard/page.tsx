import { NewCourseButton } from "@/components/NewCourseButton";
import React from "react";
import { DataTable } from "./_components/DataTable";
import { columns } from "./_components/Column";
import { getTeacherPublichedCourses } from "./actions";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const page = async () => {
  const { userId } = auth();
  if (!userId) {
    redirect("/");
  }

  const data = await getTeacherPublichedCourses();
  console.log(data);
  return (
    <div className="w-full h-full p-3 space-y-3">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <span>(Courses and there respective fields)</span>
        </div>
        <NewCourseButton />
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default page;
