import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import generator from "generate-password-ts";

import { render } from "@react-email/render";
import nodemailer from "nodemailer";
import StudentPortalAccessEmailAndPassword, {
  WelcomeToLMS,
} from "@/templates/WelcomeToLMS";
import CourseEnrollmentEmail from "@/templates/CourseEnrollmentEmail";

export async function POST(req: Request) {
  try {
    const { values, courseId }: { values: string[]; courseId: string } =
      await req.json();
    console.log(values, courseId);

    if (!values) {
      return NextResponse.json(
        { message: "field is required to create" },
        { status: 400 }
      );
    }

    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const course = await prisma.course.findFirst({
      where: {
        id: courseId,
      },
    });

    if (!course) {
      return NextResponse.json(
        { message: "Course not found" },
        { status: 404 }
      );
    }

    const newUsers = await prisma.user.createManyAndReturn({
      data: values.map((email) => {
        return {
          role: "STUDENT",
          email,
          name: email.split("@")[0],
        };
      }),
      skipDuplicates: true,
    });

    console.log("---new users --", newUsers);

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const welcomeEmails = newUsers.map((user) => {
      return transport.sendMail({
        from: process.env.MAIL_USER,
        to: user.email,
        subject: "Welcome To LMS",
        html: render(
          WelcomeToLMS({
            email: user.email,
            studentFirstName: user?.name || "student",
          })
        ),
      });
    });

    await Promise.all(welcomeEmails);

    //update course with new users

    const allUsers = await prisma.user.findMany({
      where: {
        email: {
          in: values,
        },
      },
    });

    const connectedUsersToCourse = await prisma.access.createManyAndReturn({
      data: allUsers.map((user) => {
        return {
          courseId,
          userId: user.id,
        };
      }),
      skipDuplicates: true,
    });

    console.log("@@@access users", connectedUsersToCourse);

    const emails = allUsers.map((user) => user.email);

    const enrollementMails = emails.map((email) => {
      const user = allUsers.find((user) => user.email === email);
      return transport.sendMail({
        from: process.env.MAIL_USER,
        to: email,
        subject: "Course Enrolled",
        html: render(
          CourseEnrollmentEmail({
            email,
            courseName: course.title,
            dashboardLink: `${process.env.BASE_URL}/home`,
            studentName: user?.name || "student",
          })
        ),
      });
    });
    const data = await Promise.all(enrollementMails);

    console.log(data);

    return NextResponse.json(
      {
        mesage:
          newUsers.length > 0
            ? `Few new users created and enrollement mails are sent`
            : `Enrollement mails sent to users`,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
