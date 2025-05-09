"use client";

import Image from "next/image";

function BottomBar() {
  return (
    <div className="w-full">
      <Image
        src="/images/pasek.png"
        alt="bolid"
        width={1920}
        height={10}
        style={{
          maxWidth: "100%",
          height: "auto"
        }} />
    </div>
  );
}

export default BottomBar;
