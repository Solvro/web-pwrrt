import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export function BackgroundFade({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "to-background absolute right-0 left-0 z-10 h-20 w-full bg-gradient-to-t from-transparent xl:h-32",
        className,
      )}
      {...props}
    />
  );
}
