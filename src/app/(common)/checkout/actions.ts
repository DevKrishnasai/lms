"use server";

import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { render } from "@react-email/render";
import { redirect } from "next/navigation";
import nodemailer from "nodemailer";
import CourseEnrollmentEmail from "../../../../emails/CourseEnrollmentEmail";

export const updatePaymentStatus = async (
  id: string,
  paymentId: string,
  emailDetails: any
) => {
  try {
    const { userId } = auth();
    if (!userId) {
      redirect("/");
    }
    const user = await prisma.user.findUnique({
      where: {
        authId: userId,
      },
    });
    if (!user) {
      redirect("/");
    }

    const payment = await prisma.purchases.update({
      where: {
        id,
        userId: user.id,
      },
      data: {
        paymentId,
        status: "COMPLETED",
      },
    });

    await prisma.access.create({
      data: {
        courseId: payment.courseId,
        userId: user.id,
      },
    });

    const transport = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.MAIL_USER,
      to: user.email,
      subject: "Course Enrollment in YourLMS",
      html: render(CourseEnrollmentEmail({ ...emailDetails })),
    };

    transport.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      }
    });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
