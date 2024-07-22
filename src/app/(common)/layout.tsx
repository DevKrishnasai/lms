import MobileSideBar from "@/components/MobileSideBar";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth();
  if (userId) {
    const user = await prisma.user.findUnique({
      where: {
        authId: userId,
      },
    });

    if (!user) redirect("/onboarding");

    if (!user.onBoarded) redirect("/onboarding");
  }
  return (
    <div className="flex h-full w-full">
      <Sidebar />
      <div className="w-full h-full ml-16">
        <div className=" flex justify-between items-center border-b px-3 py-2">
          <Navbar />
        </div>
        {children}
      </div>
    </div>
  );
};

export default layout;
