import { auth } from "@clerk/nextjs/server";
import Certificates from "./_components/Certificates";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";

const page = async () => {
  const { userId } = auth();

  if (!userId)
    return (
      <div className="h-[calc(100vh-100px)] w-full flex flex-col justify-center items-center gap-3">
        Sign in to view your certificates
        <Button>
          <SignInButton mode="redirect" forceRedirectUrl="/certificates" />
        </Button>
      </div>
    );

  const user = await prisma.user.findUnique({
    where: {
      authId: userId,
    },
    include: {
      certificates: {
        include: {
          course: {
            select: {
              title: true,
              thumbnail: true,
              duration: true,
              isFree: true,
              price: true,
              category: {
                select: {
                  title: true,
                },
              },
              description: true,
              user: {
                select: {
                  name: true,
                  profilePic: true,
                  id: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!user) {
    redirect("/auth/sign-in");
  }

  return (
    <div className="p-4 w-full min-h-[calc(100vh-100px)] overflow-y-auto">
      <h1 className="text-2xl font-semibold ">Certificates</h1>
      <p className="mb-4 text-sm text-gray-600">
        (Certificates you have earned from our courses will be displayed here)
      </p>
      {user.certificates.length === 0 && (
        <div className="flex flex-col items-center justify-center w-full h-[calc(100vh-200px)]">
          <h1 className="text-2xl font-semibold">No Certificates</h1>
          <p className="text-gray-600 text-center">
            You have not earned any certificates yet.
          </p>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {user.certificates.map((certificate) => {
          return (
            <Certificates
              key={certificate.id}
              certificateId={certificate.id}
              courseThumbnail={certificate.course.thumbnail || ""}
              courseCategory={certificate.course.category?.title || "Unknown"}
              courseName={certificate.course.title}
              issuedDate={certificate.createdAt.toLocaleString("es-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
              issuerName={certificate.course.user.name || "Unknown"}
              issuerProfile={`${process.env.BASE_URL}/profile/${certificate.course.user.id}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default page;
