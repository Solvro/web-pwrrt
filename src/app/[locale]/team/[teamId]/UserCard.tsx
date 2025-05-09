"use client";

import Image from "next/image";
import React, { useState } from "react";

import TileHeading from "./TileHeading";

interface UserCardProps {
  opiekun?: boolean;
  member: {
    name: string;
    surname: string;
    currentRole: string;
    phoneNumber?: string | null;
    email?: string | null;
  };
  teamId: string;
  roleHistory: Record<
    string,
    {
      role: string;
      bolidName: string;
      department: string;
    }[]
  >;
}

const UserCard: React.FC<UserCardProps> = ({
  opiekun,
  member,
  teamId,
  roleHistory,
}) => {
  const placeholderImage = "/images/TeamPlaceholder.jpg";

  // Generowanie ścieżki do obrazka członka zespołu
  const generatedMemberImageSource = `https://storage.googleapis.com/pwr-rt/${
    teamId === "RT11b" ? "RT11" : teamId
  }/${encodeURIComponent(
    member.name[0].toUpperCase() + member.name.slice(1),
  )}%20${encodeURIComponent(
    member.surname[0].toUpperCase() + member.surname.slice(1),
  )}.jpg`;

  // Użycie stanu do dynamicznej zmiany obrazka w razie błędu
  const [memberImageSource, setMemberImageSource] = useState(
    generatedMemberImageSource,
  );

  const handleImgError = () => {
    // Po błędzie ustawiamy ścieżkę do obrazka zastępczego
    setMemberImageSource(placeholderImage);
  };

  return (
    <div className="group relative w-full">
      <div className="absolute inset-0 z-0 h-full w-full rounded-full bg-white opacity-10 blur-3xl"></div>
      <div className="relative overflow-hidden rounded-md bg-black pb-14">
        <div className="absolute h-[350px] w-full">
          {/* Możesz wykorzystać obrazek zastępczy jako tło */}
          <Image
            src="/images/TeamPlaceholder.jpg"
            alt={`Zdjęcie ${member.name} ${member.surname}`}
            fill
            style={{ objectFit: "cover" }}
            loading="lazy"
            placeholder="blur"
            blurDataURL={placeholderImage}
            onError={handleImgError}
          />
        </div>
        <div className="relative h-[350px]">
          <Image
            src={memberImageSource}
            alt={`Zdjęcie ${member.name} ${member.surname}`}
            fill
            style={{ objectFit: "cover" }}
            loading="lazy"
            placeholder="blur"
            blurDataURL={placeholderImage}
            onError={handleImgError}
          />
        </div>
        <TileHeading
          opiekun={opiekun}
          member={member}
          roleHistory={roleHistory}
          phoneNumber={member.phoneNumber}
          email={member.email}
        />
      </div>
    </div>
  );
};

export default UserCard;
