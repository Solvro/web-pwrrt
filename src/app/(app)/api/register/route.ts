import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prismadb";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    email: string;
    name: string;
    password: string;
  };
  const { email, name, password } = body;

  const hashedPassword = await bcrypt.hash(password, 12);

  const admin = await prisma.admin.create({
    data: {
      email,
      name,
      hashedPassword,
    },
  });

  return NextResponse.json(admin);
}
