import { useEffect, useRef } from "react";

// Calls onOutside when the user presses anywhere outside ref's element,
// or hits Escape. Listens on pointerdown so a drag that starts inside and
// ends outside (e.g. selecting text) doesn't count as an outside click.
export default function useClickOutside(ref, onOutside) {
  // Keep the latest callback without re-adding listeners every render
  const handler = useRef(onOutside);
  useEffect(() => {
    handler.current = onOutside;
  });

  useEffect(() => {
    const onPointerDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) handler.current(e);
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") handler.current(e);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [ref]);
}
