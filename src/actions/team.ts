import { prisma } from "@/libs/prismadb";

export async function getTeamByFullName(name: string, surname: string) {
  const teamMembers = await prisma.teamMember.findMany({
    where: {
      name,
      surname,
    },
    select: {
      name: true,
      surname: true,
      email: true,
      phoneNumber: true,
      roles: {
        select: {
          department: true,
          role: true,
          bolidName: true,
        },
      },
    },
  });

  return teamMembers;
}

export async function getTeamByBolid(bolidName: string) {
  const teamMembers = await prisma.teamMember.findMany({
    where: {
      roles: {
        some: {
          bolidName,
        },
      },
    },
    select: {
      name: true,
      surname: true,
      email: true,
      phoneNumber: true,
      roles: {
        select: {
          department: true,
          role: true,
          bolidName: true,
        },
      },
    },
  });

  return teamMembers;
}
