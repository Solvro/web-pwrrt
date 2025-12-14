import { cn } from "@/lib/utils";

interface NavPartnerProps {
  isActive: boolean;
  content: string;
  onClick?: () => void;
}

export function NavPartner({ isActive, content, onClick }: NavPartnerProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex cursor-pointer items-center gap-2 text-2xl",
        isActive && "text-foreground",
      )}
    >
      <p
        className={cn(
          "font-light",
          "text-[var(--color-partners-text)]",
          isActive && "font-normal text-white",
        )}
      >
        {content}
      </p>
      <span
        className={cn(
          "inline-block text-white transition-all duration-500 ease-out",
          !isActive && "pointer-events-none -translate-x-2 opacity-0",
          isActive && "translate-x-0 opacity-100",
        )}
      >
        ←
      </span>
    </button>
  );
}
