import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { render } from "@react-email/render";
import nodemailer from "nodemailer";
import { WelcomeToLMS } from "@/templates/WelcomeToLMS";

export async function POST(req: Request) {
  try {
    const values: string[] = await req.json();
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

    const user = await prisma.user.findUnique({
      where: {
        authId: userId,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (user?.role !== "TEACHER") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const users = await prisma.user.createManyAndReturn({
      data: values.map((email) => {
        return {
          role: "STUDENT",
          email,
          name: email.split("@")[0],
          authId: email,
        };
      }),
      skipDuplicates: true,
    });

    //node mailer
    const emails = users.map((user) => user.email);

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const sendAllEmails = emails.map((email) => {
      const user = users.find((user) => user.email === email);
      return transport.sendMail({
        from: process.env.MAIL_USER,
        to: email,
        subject: "Welcome To LMS",
        html: render(
          WelcomeToLMS({
            email,
            studentFirstName: user?.name || "student",
          })
        ),
      });
    });
    const data = await Promise.all(sendAllEmails);

    return NextResponse.json(
      { mesage: "users created and mails sent..." },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
