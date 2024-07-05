import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import CourseCard from "./_components/CourseCard";
import Courses from "./_components/Courses";

const page = async () => {
  return (
    <div className="p-4 w-full h-full">
      <h1 className="text-2xl font-semibold ">Courses</h1>
      <p className="mb-4 text-sm text-gray-600">
        Choose your course and dive into career
      </p>
      <Courses />
    </div>
  );
};

export default page;
