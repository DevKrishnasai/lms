import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { purchases } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import CourseEnrollmentEmail from "../../../../emails/CourseEnrollmentEmail";

export async function POST(req: NextRequest) {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY!,
      key_secret: process.env.RAZORPAY_SECRET!,
    });

    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const details = await req.json();

    if (!details.courseId || !details.name || !details.address) {
      return NextResponse.json(
        { message: "Invalid request body" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        authId: userId,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const course = await prisma.course.findUnique({
      where: {
        id: details.courseId,
      },
      include: {
        chapters: true,
        user: true,
      },
    });

    if (!course) {
      return NextResponse.json(
        { message: "Course not found" },
        { status: 404 }
      );
    }

    const isPurchased = await prisma.purchases.findFirst({
      where: {
        courseId: details.courseId,
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (isPurchased && isPurchased.status === "COMPLETED") {
      return NextResponse.json(
        { message: "You have already purchased this course" },
        { status: 400 }
      );
    }

    const access = await prisma.access.findFirst({
      where: {
        userId: user.id,
        courseId: details.courseId,
      },
    });

    if (access) {
      return NextResponse.json(
        { message: "You already have access to this course" },
        { status: 400 }
      );
    }

    const amount = course.price || 1;
    const currency = "INR";
    const receipt = `recp_${new Date().getTime()}`;

    const options = {
      amount: (amount * 100).toString(),
      currency,
      receipt,
    };

    let emailDetails = {
      authorName: course.user.name || course.user.email.split("@")[0],
      chapterCount: course.chapters.length,
      courseName: course.title,
      courseUrl: `course/${course.id}?chapterId=${course.chapters[0].id}`,
      name: user?.name || user.email.split("@")[0],
    };

    const response = await razorpay.orders.create(options);
    let orderDetails: purchases;
    if (course.price === 0) {
      orderDetails = await prisma.purchases.create({
        data: {
          price: 0,
          courseId: details.courseId,
          userId: user.id,
          isFree: true,
          status: "COMPLETED",
          orderId: response.id,
          receiptId: receipt,
          name: details.name,
          address: details.address,
        },
      });

      await prisma.access.create({
        data: {
          userId: user.id,
          courseId: course.id,
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
    } else {
      orderDetails = await prisma.purchases.create({
        data: {
          price: amount,
          courseId: details.courseId,
          userId: user.id,
          isFree: false,
          status: "IN_PROGRESS",
          orderId: response.id,
          receiptId: receipt,
          name: details.name,
          address: details.address,
        },
      });
    }

    return NextResponse.json(
      {
        ...orderDetails,
        emailDetails,
        message: "transaction going on...",
        courseName: course.title,
        email: user.email,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
