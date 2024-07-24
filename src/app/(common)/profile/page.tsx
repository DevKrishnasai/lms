import React from "react";
import { prisma } from "@/lib/db";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Target, Folder } from "lucide-react";
import { FaCertificate } from "react-icons/fa";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";

const ProfilePage = async () => {
  const { userId } = auth();

  if (!userId)
    return (
      <div className="h-[calc(100vh-100px)] w-full flex flex-col justify-center items-center gap-3 p-4 text-center">
        <p className="text-lg">Sign in to view your profile</p>
        <Button>
          <SignInButton mode="redirect" forceRedirectUrl="/profile" />
        </Button>
      </div>
    );

  const user = await prisma.user.findUnique({
    where: {
      authId: userId,
    },
    include: {
      courses: {
        include: {
          accesses: true,
        },
      },
      certificates: true,
      goals: {
        select: {
          goal: {
            select: {
              title: true,
              id: true,
            },
          },
        },
      },
      categories: {
        select: {
          category: {
            select: {
              id: true,
              title: true,
            },
          },
        },
      },
    },
  });

  if (!user) {
    return (
      <div className="w-full h-[calc(100vh-100px)] flex justify-center items-center p-4 text-center">
        <h1 className="text-2xl font-bold">Profile Not Found</h1>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 w-full min-h-[calc(100vh-100px)]">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-8">
          <CardContent className="flex flex-col sm:flex-row items-center p-4 sm:p-6">
            <Image
              src={user.profilePic || "/icon-author.png"}
              alt={user.name || "User"}
              width={100}
              height={100}
              className="rounded-full mb-4 sm:mb-0 sm:mr-6"
            />
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold mb-2 break-words">
                {user.name}
              </h1>
              <p className="text-muted-foreground break-words">{user.email}</p>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="courses">
          <TabsList className="mb-4 flex flex-wrap justify-start w-fit">
            {user.role === "TEACHER" && (
              <TabsTrigger value="courses" className="mb-2 ">
                Courses
              </TabsTrigger>
            )}
            <TabsTrigger value="certificates" className="mb-2 ">
              Certificates
            </TabsTrigger>
            <TabsTrigger value="goals" className="mb-2 ">
              Goals
            </TabsTrigger>
            <TabsTrigger value="categories" className="mb-2">
              Categories
            </TabsTrigger>
          </TabsList>
          {user.role === "TEACHER" && (
            <TabsContent value="courses">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="mr-2 flex-shrink-0" /> Courses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {user.courses.length === 0 && (
                    <div className="mb-4 p-4 border rounded-lg text-center">
                      No courses were published by this user
                    </div>
                  )}
                  {user.courses.map((course) => (
                    <Link
                      href={`/preview?courseId=${course.id}`}
                      key={course.id}
                    >
                      <div className="mb-4 p-4 border rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center">
                        <h3 className="font-semibold mb-2 sm:mb-0 break-words">
                          {course.title}
                        </h3>
                        <div className="flex flex-wrap justify-start sm:justify-end items-center gap-2">
                          <Badge variant="default">
                            {course.accesses.length === 1
                              ? "1 student"
                              : `${course.accesses.length} students`}
                          </Badge>
                          <Badge variant="default">
                            {course.isFree ? "Free" : "Paid"}
                          </Badge>
                        </div>
                      </div>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          )}

          <TabsContent value="certificates">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FaCertificate className="mr-2 flex-shrink-0" /> Certificates
                </CardTitle>
              </CardHeader>
              <CardContent>
                {user.certificates.length === 0 && (
                  <div className="mb-4 p-4 border rounded-lg text-center">
                    No certificates were issued to this user
                  </div>
                )}
                {user.certificates.map((cert) => (
                  <Link href={`/certificate/${cert.id}`} key={cert.id}>
                    <div className="mb-4 p-4 border rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center">
                      <h3 className="font-semibold mb-2 sm:mb-0 break-words">
                        {cert.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Issued on:{" "}
                        {new Date(cert.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="goals">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="mr-2 flex-shrink-0" /> Goals
                </CardTitle>
              </CardHeader>
              <CardContent>
                {user.goals.map((goal) => (
                  <div
                    key={goal.goal.id}
                    className="mb-4 p-4 border rounded-lg"
                  >
                    <h3 className="font-semibold break-words">
                      {goal.goal.title}
                    </h3>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Folder className="mr-2 flex-shrink-0" /> Categories
                </CardTitle>
              </CardHeader>
              <CardContent>
                {user.categories.map((category) => (
                  <Link
                    key={category.category.id}
                    href={`/courses?search=${encodeURIComponent(
                      category.category.title
                    )}`}
                  >
                    <div className="mb-4 p-4 border rounded-lg">
                      <h3 className="font-semibold break-words">
                        {category.category.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilePage;
