import { NewsShowcase } from "@/components/news/news-showcase";

import { BackgroundFade } from "./background-fade";

export function NewsSection() {
  return (
    <div className="relative my-20 xl:mt-40">
      <BackgroundFade className="top-0" />
      <NewsShowcase />
      <BackgroundFade className="bottom-0 rotate-180" />
    </div>
  );
}
