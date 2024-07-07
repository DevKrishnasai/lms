"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ModifiedCourseType, getCourses } from "../actions";
import CourseCard from "./CourseCard";
import { cn } from "@/lib/utils";
import Loading from "@/components/Loading";

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
  return (
    <>
      {loading ? (
        <div className="w-full h-[calc(100vh-100px)] flex justify-center items-center">
          <Loading />
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
            <p className="my-auto text-center text-lg font-semibold mt-[25%]">
              No courses found
            </p>
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
