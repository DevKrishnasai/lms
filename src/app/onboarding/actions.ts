"use server";
import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";

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

  console.log("User onboarding data updated", user);
  redirect("/dashboard");
};
