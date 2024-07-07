import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import CourseCard from "./_components/CourseCard";
import { SignIn, SignInButton, useSignUp } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const page = async () => {
  const { userId } = auth();
  if (!userId)
    return (
      <div className="h-[calc(100vh-100px)] w-full flex flex-col justify-center items-center gap-3">
        Sign in to view your courses
        <Button>
          <SignInButton mode="modal" />
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
            },
          },
        },
      },
    },
  });
  if (!user) redirect("/not-authorized");
  return (
    <div className="w-full h-full p-4 space-y-4">
      <h2>Courses Registered</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
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
