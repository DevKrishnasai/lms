import { NewCourseButton } from "@/components/NewCourseButton";
import React from "react";
import { DataTable } from "./_components/DataTable";
import { columns } from "./_components/Column";
import { getTeacherPublichedCourses } from "./actions";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import Loading from "@/components/Loading";
import { Skeleton } from "@/components/ui/skeleton";

const page = async () => {
  const { userId } = auth();
  if (!userId) {
    redirect("/");
  }
  const user = await prisma.user.findUnique({
    where: {
      authId: userId,
    },
  });
  if (!user) {
    redirect("/not-allowed");
  }

  if (user.role !== "TEACHER") {
    redirect("/not-authenticated");
  }

  const data = await getTeacherPublichedCourses();

  if (!data) {
    return (
      <div className="w-full min-h-[calc(100vh-100px)] p-4 space-y-3">
        <div className="flex justify-between items-center flex-wrap gap-3">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="mb-4 text-sm text-gray-600">
              (Manage your courses here)
            </p>
          </div>
          <div>
            <Skeleton className="h-10 w-32 rounded-md" />
          </div>
        </div>

        <Skeleton className="h-10 w-1/3 rounded-md" />
        <div className="flex flex-col gap-3">
          {[1, 2, 3, 4].map((access) => (
            <Skeleton key={access} className="h-10 w-full rounded-md" />
          ))}
        </div>
        <div className="flex items-center justify-end gap-3">
          <Skeleton className="h-10 w-28 rounded-md" />
          <Skeleton className="h-10 w-28 rounded-md" />
        </div>
      </div>
    );
  }
  return (
    <div className="w-full min-h-[calc(100vh-100px)] p-4 space-y-3">
      <div className="flex justify-between items-center flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="mb-4 text-sm text-gray-600">
            (Manage your courses here)
          </p>
        </div>
        <NewCourseButton />
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default page;
