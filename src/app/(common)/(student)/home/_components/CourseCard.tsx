"use client";
import { currencyFormater } from "@/lib/utils";
import { Course } from "@prisma/client";
import { BookOpenCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import { Progress } from "@/components/ui/progress";
import {
  courseAccess,
  getTotalCourseProgress,
} from "@/app/(common)/courses/actions";
interface CourseCardProps {
  course: Course;
  chapters: number;
}
const CourseCard = ({ course, chapters }: CourseCardProps) => {
  const [visitedUser, setVisitedUser] = React.useState(false);
  const [isCourseAccessableByTheUser, setIsCourseAccessableByTheUser] =
    React.useState(false);
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    courseAccess(course.id).then((data) => {
      setVisitedUser(data.visitedUser);
      setIsCourseAccessableByTheUser(data.isCourseAccessableByTheUser);
    });
    getTotalCourseProgress(course.id).then((data) => {
      setValue(data);
    });
  }, []);

  return (
    <Link
      href={`/course/${course.id}`}
      className="shadow-md rounded-md border flex flex-col cursor-pointer"
    >
      <Image
        src={course.thumbnail!}
        alt={course.title}
        width={600}
        height={400}
        className="rounded-t-md flex-1 "
      />
      <div className="p-4 space-y-3">
        <h2 className="text-xl font-semibold">{course.title}</h2>
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <BookOpenCheck />
            <span>{chapters}</span>
          </div>

          {!visitedUser &&
            (isCourseAccessableByTheUser ? (
              <GiReceiveMoney size={30} />
            ) : (
              <GiPayMoney size={30} />
            ))}
        </div>
        {isCourseAccessableByTheUser && <Progress value={value} />}
      </div>
    </Link>
  );
};

export default CourseCard;
