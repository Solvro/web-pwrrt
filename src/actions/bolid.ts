"use server";

import { prisma } from "@/lib/prismadb";

export async function getBolidByBolidId(bolidId: string) {
  const bolid = await prisma.bolid.findUnique({
    where: {
      name: bolidId,
    },
    include: {
      achievements: true,
    },
  });

  return bolid;
}

export async function getBolidByName(name: string) {
  const bolid = await prisma.bolid.findFirst({
    where: {
      name,
    },
  });

  return bolid;
}

export const getBolids = async () => {
  const bolids = await prisma.bolid.findMany({
    select: {
      name: true,
    },
  });

  return bolids.map((bolid) => bolid.name);
};
