"use client";

import Image from "next/image";

function Avatar() {
  return (
    <Image
      className="rounded-full"
      height="30"
      width="30"
      alt="Avatar"
      src="/images/placeholder.jpg"
      style={{
        maxWidth: "100%",
        height: "auto"
      }} />
  );
}

export default Avatar;
