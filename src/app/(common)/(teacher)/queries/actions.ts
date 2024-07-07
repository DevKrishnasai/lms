"use server";

import { prisma } from "@/lib/db";
import { Status } from "@prisma/client";

export const getQueries = async (type: Status) => {
  const queries = await prisma.requests.findMany({
    where: {
      status: type,
    },
    include: {
      user: true,
    },
  });

  return queries;
};

export type QueryType = Awaited<ReturnType<typeof getQueries>>[0];
