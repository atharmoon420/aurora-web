"use client";
import { useEffect, useState } from "react";

export default function ReadingProgress() {
  const [w, setW] = useState(0);
  useEffect(() => {
    const on = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setW(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    on();
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);
  return <div className="progress" style={{ width: `${w}%` }} />;
}
