"use server";
import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Role } from "@prisma/client";
import { render } from "@react-email/render";
import { redirect } from "next/navigation";
import nodemailer from "nodemailer";
import WelcomeToLMS from "../../../emails/WelcomeToLMS";

export const updateOnboarding = async (data: {
  selectedCategories: string[];
  selectedGoals: string[];
  bio: string;
  role: Role;
}) => {
  const { userId } = auth();
  if (!userId) {
    redirect("/");
  }

  const user = await prisma.user.update({
    where: {
      authId: userId,
    },
    data: {
      onBoarded: true,
      bio: data.bio,
      role: data.role,
    },
  });

  const categories = await prisma.category.findMany({
    where: {
      title: {
        in: data.selectedCategories,
      },
    },
    select: { id: true, title: true },
  });

  await prisma.userCategory.createMany({
    data: categories.map((category) => ({
      userId: user.id,
      categoryId: category.id,
    })),
    skipDuplicates: true,
  });

  const goals = await prisma.goal.findMany({
    where: {
      title: {
        in: data.selectedGoals,
      },
    },
    select: { id: true, title: true },
  });

  await prisma.userGoal.createMany({
    data: goals.map((goal) => ({
      userId: user.id,
      goalId: goal.id,
    })),
    skipDuplicates: true,
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
    subject: "Welcome To YourLMS Portal",
    html: render(
      WelcomeToLMS({
        name: user?.name || user.email.split("@")[0],
        role: user.role,
      })
    ),
  };

  transport.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      throw new Error("Error sending email");
    }
  });
};
