"use client";
import React from "react";
import Image from "next/image";
import { Book, Users, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Chapter } from "@prisma/client";
import { Badge } from "@/components/ui/badge";

const CoursePreviewPage = ({
  course,
  isEnrolled,
  visitedUser,
  isAuthor,
}: any) => {
  const router = useRouter();

  const onEnroll = (type: "CHECKOUT" | "CONTINUE") => {
    if (type === "CHECKOUT") {
      toast.loading("Please wait redirecting to checkout page...", {
        id: "loading-1",
      });
      router.push(`/checkout?courseId=${course.id}`);
      toast.success("Redirected to checkout page", {
        id: "loading-1",
      });
    } else {
      toast.loading("Please wait redirecting to course page...", {
        id: "loading-2",
      });
      router.push(`/course/${course.id}`);
      toast.success("Redirected to course page", {
        id: "loading-2",
      });
    }
  };

  return (
    <div className="max-w-6xl h-full  mx-auto p-6 bg-background text-foreground">
      <div className="flex flex-col md:flex-row gap-8 mb-5">
        {/* Left Column */}
        <div className="md:w-2/3 border border-foreground/20 rounded-lg p-6">
          <Image
            src={course.thumbnail || "/api/placeholder/800/450"}
            alt={course.title}
            width={800}
            height={450}
            className="rounded-lg mb-4"
          />
          <h1 className="text-2xl font-bold mb-4 text-clip">{course.title}</h1>
          <div className="flex items-center mb-4 space-x-4 text-sm opacity-70">
            <div className="flex items-center gap-2">
              <Tag className="" size={16} />
              <Badge className="bg-black text-white dark:bg-white dark:text-black truncate">
                <span>{course.category.title}</span>
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Users className="" size={16} />
              <Badge className="bg-black text-white dark:bg-white dark:text-black truncate">
                <span>{course._count.accesses} enrolled</span>
              </Badge>
            </div>
          </div>
          <p className="opacity-80 mb-6">
            {course.description ||
              "Course description goes here. This course covers..."}
          </p>
          <h2 className="text-xl font-semibold mb-3">Course Content</h2>
          <ul className="space-y-2 mb-6">
            {course.chapters.map((chapter: Chapter) => (
              <li key={chapter.id} className="flex items-center">
                <Book className="mr-2" size={16} />
                <span>{chapter.title}</span>
                {chapter.isFree && (
                  <span className="ml-2 text-xs bg-foreground text-background px-2 py-1 rounded">
                    Free
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column */}
        <div className="md:w-1/3">
          <div className="border border-foreground/20 p-6 rounded-lg mb-6">
            <h2 className="text-xl font-semibold mb-4">About the Instructor</h2>
            <div className="flex items-center mb-4">
              <Image
                src={course.user.profilePic || "/user.png"}
                alt={course.user.name.split(" ")[0]}
                width={64}
                height={64}
                className="rounded-full mr-4"
              />
              <div>
                <h3 className="font-semibold truncate text-clip">
                  {course.user.name}
                </h3>
                <p className="text-sm opacity-70 truncate text-clip">
                  {course.user.email}
                </p>
              </div>
            </div>
            <p className="text-sm opacity-80">
              {course.user.bio || `Hi there! I'm ${course.user.name}`}
            </p>
          </div>
          {isEnrolled ? (
            <Button
              className="w-full mb-4 bg-foreground text-background hover:bg-foreground/90"
              onClick={() => {
                onEnroll("CONTINUE");
              }}
            >
              Continue Learning
            </Button>
          ) : visitedUser ? (
            <SignInButton forceRedirectUrl={`/preview?courseId=${course.id}`}>
              <Button className="w-full mb-4 bg-foreground text-background hover:bg-foreground/90">
                Login
              </Button>
            </SignInButton>
          ) : isAuthor ? (
            <Button
              className="w-full mb-4 bg-foreground text-background hover:bg-foreground/90"
              onClick={() => {
                router.push(`/course/${course.id}`);
              }}
            >
              View Course
            </Button>
          ) : (
            <Button
              className="w-full mb-4 bg-foreground text-background hover:bg-foreground/90"
              onClick={() => {
                onEnroll("CHECKOUT");
              }}
            >
              Enroll
              {course.isFree ? " for Free" : ` - ₹${course.price}`}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursePreviewPage;
