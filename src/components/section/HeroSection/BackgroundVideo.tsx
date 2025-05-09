"use client";

function BackgroundVideo() {
  return (
    <div className="absolute inset-0 z-0">
      <video autoPlay muted loop className="h-full w-full object-cover">
        <source src="/video.mp4" type="video/mp4" />
        Twoja przeglądarka nie obsługuje tagu wideo.
      </video>
      <div className="absolute inset-0 bg-black/70"></div>
    </div>
  );
}

export default BackgroundVideo;
