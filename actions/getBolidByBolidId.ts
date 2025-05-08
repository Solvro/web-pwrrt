// actions/getBolidByBolidId.ts
import prisma from '@/libs/prismadb';

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
