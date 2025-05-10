import { prisma } from "@/lib/prismadb";

export async function fetchNews() {
  const news = await prisma.news.findMany({
    orderBy: [
      {
        date: "desc", // Sortuje wyniki malejąco, więc najnowsze newsy będą na górze
      },
    ],
  });
  return news;
}

export async function getNewsById(newsId: string) {
  const news = await prisma.news.findUnique({
    where: {
      id: newsId,
    },
    select: {
      date: true,
      title: true,
      short_description: true,
      long_description: true,
      length_time: true,
      logo: true,
      main_image: true,
      content: true,
    },
  });

  return news;
}

export async function fetchFiveNews() {
  const news = await prisma.news.findMany({
    orderBy: [
      {
        date: "desc", // Sortuje wyniki malejąco, więc najnowsze newsy będą na górze
      },
    ],
    take: 3, // Pobiera tylko 5 najnowszych wiadomości
  });
  return news;
}
