import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const newsArray = [
    {
      title: "Studenckie Koła Tworzą Innowacje",
      short_description:
        "W ramach programu “Studenckie koła naukowe tworzą innowacje” ...",
      length_time: 10,
      logo: "/images/logo-czarne.svg",
      main_image: "/images/news/2024-04-SKNInnowacje.jpg",
      long_description:
        "W ramach programu “Studenckie koła naukowe tworzą innowacje” prowadzonego przez Ministerstwo Nauki i Szkolnictwa Wyższego, w tym roku dofinansowane zostały aż trzy Nasze projekty:",
      content: [
        {
          text: "• Innowacyjne kompozytowe struktury bezpieczeństwa na system wysokiego napięcia w bolidzie klasy Formula Student, rozpoczęty 24.05.2024 r. 🔨",
        },
        {
          text: "• Wysokoefektywny system zasilania wysokim napięciem bolidu elektrycznego klasy Formula Student, rozpoczęty 27.05.2024 r. ⚡️",
        },
        {
          text: "• Prace badawczo-rozwojowe nad opracowaniem elektrycznego układu trakcyjnego w bolidzie klasy Formula Student, rozpoczęty 28.05.2024 r. ⚙️",
        },
        {
          text: "Otrzymane środki w wysokości 210 000zł przeznaczymy na rozwój czwartego bolidu elektrycznego klasy Formula Student oraz dołożymy wszelkich starań by tak jak jego poprzednicy osiągał sukcesy. ",
        },
        {
          text: `🏆 Gratulujemy również innym zwycięzcom:
Koło Naukowe Pojazdów i Robotów Mobilnych
PWr in Space
Koło Naukowe Pojazdów Niekonwencjonalnych OFF-ROAD
Koło Naukowe NanoSens
Koło Naukowe Grupa Młodych Geodetów`,
        },
      ],
    },
  ];

  for (let newsData of newsArray) {
    await prisma.news.create({
      data: newsData,
    });
    console.log(`News added: ${newsData.title}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
