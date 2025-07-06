"use client";

import type { StaticImageData } from "next/image";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import type { Media } from "@/payload-types";

import { TileHeading } from "./tile-heading";

interface UserCardProps {
  guardian?: boolean;
  member: {
    name: string;
    surname: string;
    currentRole: string;
    phoneNumber?: string | null;
    email?: string | null;
    profile?: Media | null;
    profilePlaceholder?: StaticImageData;
  };
  roleHistory: Record<
    string,
    {
      role: string;
      bolidName: string;
      department: string;
    }[]
  >;
}

export function UserCard({ guardian, member, roleHistory }: UserCardProps) {
  const placeholderImage = "/images/TeamPlaceholder.jpg";
  const [imageSource, setImageSource] = useState(placeholderImage);

  useEffect(() => {
    const profileUrl = member.profile?.url;
    if (profileUrl) {
      setImageSource(profileUrl);
    } else {
      setImageSource(placeholderImage);
    }
  }, [member.profile]);

  const handleError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src = placeholderImage;
    setImageSource(placeholderImage);
  };

  return (
    <div className="group relative w-full">
      <div className="absolute inset-0 z-0 h-full w-full rounded-full bg-white opacity-10 blur-3xl"></div>
      <div className="relative overflow-hidden rounded-md bg-black pb-14">
        <div className="relative h-[350px]">
          {member.profilePlaceholder ? (
            <Image
              src={member.profilePlaceholder}
              alt={`Zdjęcie ${member.name} ${member.surname}`}
              loading="lazy"
              placeholder="blur"
              fill
              sizes="100%"
              style={{
                objectFit: "cover",
              }}
            />
          ) : (
            <Image
              src={imageSource}
              alt={`Zdjęcie ${member.name} ${member.surname}`}
              loading="lazy"
              placeholder="blur"
              fill
              sizes="100%"
              blurDataURL={placeholderImage}
              onError={handleError}
              style={{
                objectFit: "cover",
              }}
            />
          )}
        </div>
        <TileHeading
          opiekun={guardian}
          member={member}
          roleHistory={roleHistory}
          phoneNumber={member.phoneNumber}
          email={member.email}
        />
      </div>
    </div>
  );
}
