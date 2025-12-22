import { useEffect, useRef, useState } from "react";

interface TextTickerProps {
  items: string[];
  speed?: number; // px/s
}

export function TextTicker({ items, speed = 40 }: TextTickerProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      const width = contentRef.current.scrollWidth / 2;
      setDuration(width / speed);
    }
  }, [items, speed]);

  const content = items.map((item, index) => (
    <div
      key={`${item}-${index.toString()}`}
      className="flex items-center gap-10"
    >
      <span className="mx-4">{item}</span>
      <span className="mr-9">--</span>
    </div>
  ));

  return (
    <div className="fixed top-0 z-[60] flex h-[39px] items-center overflow-hidden bg-black">
      <div
        ref={contentRef}
        className="animate-text-ticker font-monument-extended flex items-center text-sm font-normal whitespace-nowrap text-white"
        style={{
          animationDuration: `${duration.toString()}s`,
        }}
      >
        {content}
        {content}
      </div>
    </div>
  );
}
