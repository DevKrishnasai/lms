import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import CourseCard from "./_components/CourseCard";
import { SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const page = async ({ params }: { params: string }) => {
  const { userId } = auth();
  if (!userId)
    return (
      <div className="h-[calc(100vh-100px)] w-full flex flex-col justify-center items-center gap-3">
        Sign in to view your courses
        <Button>
          <SignInButton mode="redirect" forceRedirectUrl="/dashboard" />
        </Button>
      </div>
    );

  const user = await prisma.user.findUnique({
    where: {
      authId: userId,
    },
    include: {
      accesses: {
        include: {
          course: {
            include: {
              _count: {
                select: {
                  chapters: {
                    where: {
                      isPublished: true,
                    },
                  },
                },
              },
              user: true,
            },
          },
        },
      },
    },
  });
  if (!user) redirect("/not-authorized");
  return (
    <div className="w-full min-h-[calc(100vh-100px)] p-4 space-y-3 overflow-y-auto">
      <div className="flex justify-between items-center flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-bold">Courses </h1>
          <p className="mb-4 text-xs text-gray-600">
            (Here are your registered courses)
          </p>
        </div>
      </div>
      {
        // If user has no courses
        user.accesses.length === 0 && (
          <div className="w-full min-h-[calc(100vh-230px)] flex flex-col justify-center items-center gap-3">
            <p className="font-bold text-sm md:text-lg  text-center">
              You have not registered for any courses yet.
            </p>
            <Link href="/courses">
              <Button>Browse Courses</Button>
            </Link>
          </div>
        )
      }
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {user.accesses.map((access) => (
          <CourseCard
            key={access.course.id}
            course={access.course}
            chapters={access.course._count.chapters}
          />
        ))}
      </div>
    </div>
  );
};

export default page;
