import Image from "next/image";
import type { StaticImageData } from "next/image";

export function UserAvatar({
  image,
  size = 50,
}: {
  image: StaticImageData;
  size?: number;
}) {
  return (
    <div style={{ width: size / 2, height: size }}>
      <div
        className="absolute overflow-hidden rounded-full"
        style={{ height: size, width: size }}
      >
        <Image
          src={image}
          alt="avatar image"
          className="h-18 w-18 object-cover"
          height={size}
          width={size}
        />
      </div>
    </div>
  );
}
