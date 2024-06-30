import { currencyFormater } from "@/lib/utils";
import { Chapter, Course } from "@prisma/client";
import { BookAIcon, BookOpenCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
interface CourseCardProps {
  course: Course & { chapters: number };
}
const CourseCard = ({ course }: CourseCardProps) => {
  return (
    <Link
      href={`/course/${course.id}`}
      className="shadow-md rounded-md border flex flex-col cursor-pointer"
    >
      <Image
        src={course.thumbnail!}
        alt={course.title}
        width={500}
        height={300}
        className="rounded-t-md flex-1 object-cover"
      />
      <div className="p-4 space-y-3">
        <h2 className="text-xl font-semibold">{course.title}</h2>
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <BookOpenCheck />
            <span>{course.chapters}</span>
          </div>
          <p>₹{currencyFormater(Number(course.price))}</p>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
