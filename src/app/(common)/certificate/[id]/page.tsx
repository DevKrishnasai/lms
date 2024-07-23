import { prisma } from "@/lib/db";
import Certificate from "../_components/CertificateGenerator";

const page = async ({ params }: { params: { id: string } }) => {
  if (!params.id) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <h1>Invalid Certificate ID</h1>
        <p>
          The certificate with the ID <strong>{params.id}</strong> was not
          found.
        </p>
      </div>
    );
  }
  const certificateDetails = await prisma.certificate.findUnique({
    where: {
      id: params.id,
    },
    include: {
      course: {
        include: {
          user: true,
        },
      },
      user: true,
    },
  });

  if (!certificateDetails) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <h1>Certificate Not Found</h1>
        <p>
          The certificate with the ID <strong>{params.id}</strong> was not
          found.
        </p>
      </div>
    );
  }

  return (
    <Certificate
      studentName={certificateDetails.user.name!}
      courseName={certificateDetails.course.title}
      completionDate={certificateDetails.createdAt.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}
      courseDuration={`${certificateDetails.course.duration} hours`}
      instructorName={certificateDetails.course.user.name!}
      // TODO : ADMIN
      directorName={"Krishna Sai"}
      verificationURL={`${process.env.BASE_URL}/certificate/${certificateDetails.id}`}
      instructorSignature={certificateDetails.course.user.signature!}
      // TODO : ADMIN
      directorSignature="/signature.jpg"
    />
  );
};

export default page;
