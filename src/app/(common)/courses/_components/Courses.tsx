"use client";

import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { ModifiedCourseType, getCourses } from "../actions";
import CourseCard from "./CourseCard";
import { MyContext } from "@/providers/context-provider";
import { cn } from "@/lib/utils";

const Courses = () => {
  const router = useRouter();
  const { search } = useContext(MyContext);
  const [courses, setCourses] = useState<ModifiedCourseType[]>();
  const getResults = async () => {
    const courses = await getCourses(search);
    setCourses(courses);
  };
  useEffect(() => {
    if (!search) router.push("/courses");
    const timer = setTimeout(() => {
      if (search) router.push(`/courses?search=${search}`);
      getResults();
    }, 500);
    () => clearTimeout(timer);
  }, [search]);
  return (
    <div
      className={cn(
        "w-full h-full",
        courses?.length === 0 &&
          "flex w-full h-full  justify-center items-center"
      )}
    >
      {courses?.length === 0 ? (
        <p className="my-auto text-center text-lg font-semibold mt-[25%]">
          No courses found
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {courses?.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Courses;
