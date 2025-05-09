import { prisma } from "@/libs/prismadb";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ name: string }> },
  response: Response,
) {
  const { name } = await params;

  try {
    const bolid = await prisma.bolid.findFirst({
      where: {
        name,
      },
    });

    if (bolid) {
      res.status(200).json(bolid);
    } else {
      res.status(404).json({ message: "Bolid not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}
