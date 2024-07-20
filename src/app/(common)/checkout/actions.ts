"use server";

import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const updatePaymentStatus = async (id: string, paymentId: string) => {
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
    return payment;
  } catch (error) {
    console.error(error);
    return null;
  }
};
