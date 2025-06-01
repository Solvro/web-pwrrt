import { useEffect, useState } from "react";

function useMobile() {
  const query = "(max-width: 768px)";
  const getMatch = () =>
    typeof window !== "undefined" && window.matchMedia(query).matches;

  const [isMobile, setIsMobile] = useState(getMatch);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia(query);
    const handler = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handler);
    return () => {
      mediaQuery.removeEventListener("change", handler);
    };
  }, []);

  return isMobile;
}

export { useMobile };
