import Image from "next/image";

interface NewsCardProps {
  title: string;
  shortDescription: string;
  longDescription?: string;
  mainImage: string;
  whiteMode?: boolean;
}
export function NewsCard({
  title,
  shortDescription,
  mainImage,
}: NewsCardProps) {
  return (
    <div className="group flex h-80 w-full cursor-pointer flex-col overflow-hidden rounded-md md:h-110">
      <div className="relative h-full overflow-hidden">
        <Image
          src={mainImage}
          alt="test"
          className="duration-500 ease-in-out group-hover:scale-105"
          fill
          sizes="100%"
          style={{
            objectFit: "cover",
            maxWidth: "100%",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60" />
        <div className="relative z-20 grid w-full grid-rows-2 px-5 py-50 md:py-80">
          <h1 className="font-monument-extended text-l h-10 text-left text-white md:text-2xl">
            {title}
          </h1>
          <div className="flex justify-start">
            <p className="font-monument-extended-light sm:text-s text-m mt-3 line-clamp-2 text-left leading-tight font-normal text-white">
              {shortDescription}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
