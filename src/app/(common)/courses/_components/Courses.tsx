"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ModifiedCourseType, getCourses } from "../actions";
import CourseCard from "./CourseCard";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

const Courses = () => {
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState<ModifiedCourseType[]>();
  const search = useSearchParams().get("search");

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const getResults = async () => {
        const results = await getCourses(search || "");
        setCourses(results);
        setLoading((_) => !_);
      };
      getResults();
    }, 1000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useSearchParams().get("search")]);

  const user = [1, 2, 3, 4, 5];

  return (
    <>
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {user.map((access) => (
            <div
              key={access}
              className="shadow-md rounded-md border  gap-3 cursor-pointer  h-[280px]"
            >
              <Skeleton className="h-[60%] w-full rounded-md" />
              <div className="p-2 h-full w-full space-y-4 mt-5">
                <Skeleton className="h-[10%] w-3/4 rounded-md" />
                <Skeleton className="h-[10%] w-full rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          className={cn(
            "w-full h-full",
            courses?.length === 0 &&
              "flex w-full h-full  justify-center items-center"
          )}
        >
          {courses?.length === 0 ? (
            <div className="h-[calc(100vh-300px)] w-full  flex justify-center items-center  ">
              <p className=" text-lg font-semibold ">No courses found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {courses?.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  chapterId={course.chapterId}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Courses;
