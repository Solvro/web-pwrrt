import type { RefObject } from "react";
import { useEffect, useMemo, useState } from "react";

function useOnScreen(ref: RefObject<HTMLElement | null>): boolean {
  const [intersecting, setIntersecting] = useState(false);

  const observer = useMemo(() => {
    // Sprawdź, czy `IntersectionObserver` jest dostępny
    if (typeof IntersectionObserver !== "undefined") {
      return new IntersectionObserver(([entry]) => {
        setIntersecting(entry.isIntersecting);
      });
    }
    return null;
  }, []);

  useEffect(() => {
    if (observer && ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (observer && ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, observer]);

  return intersecting;
}

export { useOnScreen };
