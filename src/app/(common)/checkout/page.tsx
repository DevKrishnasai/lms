import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import { FaBook, FaGraduationCap, FaClock, FaLock } from "react-icons/fa";
import RightPart from "./_components/RightPart";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

const CheckoutPage = async ({
  searchParams,
}: {
  searchParams: { courseId: string };
}) => {
  const { userId } = auth();
  if (!userId) {
    redirect("/");
  }

  let isAuthor = false;

  const course = await prisma.course.findUnique({
    where: {
      id: searchParams.courseId,
    },
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
      category: {
        select: {
          title: true,
        },
      },
      user: {
        select: {
          name: true,
          authId: true,
        },
      },
    },
  });

  if (!course) {
    return (
      <div className="h-full w-full flex flex-col justify-center items-center gap-2 ">
        <p className="font-bold text-2xl">Course not found</p>
        <Link href="/dashboard">
          <Button className="">Go to Dashboard</Button>
        </Link>
      </div>
    );
  }
  if (course.user.authId === userId) {
    isAuthor = true;
  }

  return (
    <div className="w-full min-h-screen   flex flex-col lg:items-center lg:justify-center p-4 overflow-y-scroll">
      <div className="max-w-6xl w-full bg-white dark:bg-gray-900 rounded-lg shadow-xl  flex flex-col md:flex-row">
        {/* Left side - Course Information */}
        <div className="md:w-1/2 bg-indigo-600 text-white">
          <div className="relative w-full h-60">
            <Image
              src={course.thumbnail || "/placeholder-image.jpg"}
              alt={course.title}
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg"
            />
          </div>
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">Complete Your Purchase</h1>
            <h2 className="text-2xl font-semibold mb-6">{course.title}</h2>
            <div className="mb-4 flex items-center">
              <FaGraduationCap className="mr-2" />
              <span>Instructor: {course.user?.name}</span>
            </div>
            <div className="mb-4 flex items-center">
              <FaBook className="mr-2" />
              <span>Category: {course.category?.title}</span>
            </div>
            <div className="mb-6 flex items-center">
              <FaClock className="mr-2" />
              <span>{course._count.chapters} Published Chapters</span>
            </div>
            <div className="bg-indigo-700 p-4 rounded-lg mb-6">
              <h3 className="text-lg font-semibold mb-2">Course Summary</h3>
              <p className="text-indigo-200 truncate">{course.description}</p>
            </div>
          </div>
        </div>

        {/* Right side - Payment Information */}
        <RightPart
          price={course.price || 0}
          courseId={course.id}
          isAuthor={isAuthor}
        />
      </div>
    </div>
  );
};

export default CheckoutPage;
