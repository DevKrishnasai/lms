import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import SidebarWraper from "@/components/SidebarWraper";
import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  let isTeacher = false;
  let visitedUser = false;
  const { userId } = auth();
  if (userId) {
    const user = await prisma.user.findUnique({
      where: {
        authId: userId,
      },
    });

    if (!user) redirect("/onboarding");

    if (!user.onBoarded) redirect("/onboarding");
    if (user.role === "TEACHER") {
      isTeacher = true;
    }
  } else {
    visitedUser = true;
  }
  return (
    <SidebarWraper visitedUser={visitedUser} isTeacher={isTeacher}>
      {children}
    </SidebarWraper>
  );
};

export default layout;

// <div className="flex h-full w-full">
//   <Sidebar />
//   <div className="w-full h-full ml-16">
//     <div className=" flex justify-between items-center border-b px-3 py-2">
//       <Navbar />
//     </div>
//     {children}
//   </div>
// </div>
