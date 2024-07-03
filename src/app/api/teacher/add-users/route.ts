import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import generator from "generate-password-ts";
import { Resend } from "resend";

import { render } from "@react-email/render";
import nodemailer from "nodemailer";
import StudentPortalAccessEmailAndPassword from "@/templates/StudentPortalAccessEmailAndPassword";

const emailProvider = new Resend(process.env.RESEND_API_KEY);

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

    const users = await prisma.user.createManyAndReturn({
      data: values.map((email) => {
        const password = generator.generate({
          length: 8,
          numbers: true,
        });
        return {
          role: "STUDENT",
          email,
          password,
          name: email.split("@")[0],
        };
      }),
      skipDuplicates: true,
    });

    console.log(users);

    //Resend mail provider
    // const emails = users.map((user) => user.email);
    // const sendAllEmails = emails.map((email) => {
    //   const user = users.find((user) => user.email === email);
    //   return emailProvider.emails.send({
    //     from: "LMS-dev <onboarding@resend.dev>",
    //     to: [email],
    //     subject: "hello world",
    //     text: "it works!",
    //     react: OnbordingTemplate({ firstName: user?.name || "student" }),
    //   });
    // });
    // const data = await Promise.all(sendAllEmails);

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
        subject: "Credentials for student portal",
        html: render(
          StudentPortalAccessEmailAndPassword({
            email,
            password: user?.password,
            studentFirstName: user?.name || "student",
          })
        ),
      });
    });
    const data = await Promise.all(sendAllEmails);

    console.log(data);

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
