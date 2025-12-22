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
      <Image
        src={image}
        alt="avatar image"
        className="absolute rounded-full"
        height={size}
        width={size}
      />
    </div>
  );
}
