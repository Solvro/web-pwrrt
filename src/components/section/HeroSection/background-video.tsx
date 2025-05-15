"use client";

export function BackgroundVideo() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <video
        autoPlay
        muted
        loop
        className="h-full w-full object-cover blur-[5px]"
      >
        <source src="/video.mp4" type="video/mp4" className="" />
        Twoja przeglądarka nie obsługuje tagu wideo.
      </video>
      <div className="absolute inset-0 bg-black/70"></div>
    </div>
  );
}
