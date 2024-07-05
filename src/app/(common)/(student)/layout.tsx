import { prisma } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs/server";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  // const { userId } = auth();
  // if (userId) {
  //   const current = await currentUser();
  //   if (!current?.emailAddresses[0]?.emailAddress) return <div>loading</div>;
  //   const user = await prisma.user.upsert({
  //     where: { email: current?.emailAddresses[0].emailAddress },
  //     update: { id: current.id },
  //     create: {
  //       id: current?.id,
  //       email: current?.emailAddresses[0].emailAddress,
  //       name: current?.fullName,
  //     },
  //   });
  //   console.log("new user---> ", user);
  // }
  return <div className="w-full h-full">{children}</div>;
};

export default layout;
