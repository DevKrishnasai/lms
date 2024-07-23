import React from "react";
import { prisma } from "@/lib/db";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Target, Folder } from "lucide-react";
import { FaCertificate } from "react-icons/fa";
import Link from "next/link";

const ProfilePage = async ({ params }: { params: { profileId: string } }) => {
  if (!params.profileId) {
    return (
      <div className="w-full h-[calc(100vh-100px)] flex justify-center items-center">
        <h1 className="text-2xl font-bold ">Profile Not Found</h1>
      </div>
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      id: params.profileId,
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
      <div className="w-full h-[calc(100vh-100px)] flex justify-center items-center">
        <h1 className="text-2xl font-bold ">Profile Not Found</h1>
      </div>
    );
  }

  return (
    <div className="p-8 w-full min-h-[calc(100vh-100px)]">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-8">
          <CardContent className="flex items-center p-6">
            <Image
              src={user.profilePic || "/icon-author.png"}
              alt={user.name || "User"}
              width={100}
              height={100}
              className="rounded-full mr-6"
            />
            <div>
              <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="courses">
          <TabsList className="mb-4">
            {user.role === "TEACHER" && (
              <TabsTrigger value="courses">Courses</TabsTrigger>
            )}
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>
          {user.role === "TEACHER" && (
            <TabsContent value="courses">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="mr-2" /> Courses
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
                      <div className="mb-4 p-4 border rounded-lg flex justify-between items-center">
                        <h3 className="font-semibold">{course.title}</h3>
                        <div className="flex justify-center items-center gap-5">
                          <Badge variant="default">
                            {course.accesses.length === 1
                              ? "1 student"
                              : course.accesses.length + " students"}
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
                  <FaCertificate className="mr-2" /> Certificates
                </CardTitle>
              </CardHeader>
              {user.certificates.length === 0 && (
                <div className="mb-4 p-4 border rounded-lg text-center">
                  No certificates were issued to this user
                </div>
              )}
              <CardContent>
                {user.certificates.map((cert) => (
                  <Link href={`/certificate/${cert.id}`} key={cert.id}>
                    <div
                      key={cert.id}
                      className="mb-4 p-4 border rounded-lg flex justify-between items-center"
                    >
                      <h3 className="font-semibold">{cert.title}</h3>
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
                  <Target className="mr-2" /> Goals
                </CardTitle>
              </CardHeader>
              <CardContent>
                {user.goals.map((goal) => (
                  <div
                    key={goal.goal.id}
                    className="mb-4 p-4 border rounded-lg"
                  >
                    <h3 className="font-semibold">{goal.goal.title}</h3>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Folder className="mr-2" /> Categories
                </CardTitle>
              </CardHeader>
              <CardContent>
                {user.categories.map((category) => (
                  <Link
                    key={category.category.id}
                    href={`/courses?search=${category.category.title}`}
                  >
                    <div className="mb-4 p-4 border rounded-lg">
                      <h3 className="font-semibold">
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
