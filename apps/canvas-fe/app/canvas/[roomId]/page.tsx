"use client";

import { useEffect, useRef, useState } from "react";

export default function Room() {
  const cRef = useRef<HTMLCanvasElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  useEffect(() => {
    setSize({
      w: window.innerWidth,
      h: window.innerHeight,
    });
  }, []);
  useEffect(() => {

    const canvas = cRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.strokeRect(200, 200, 100, 100);
  }, [size.h,size.w]);

  return (
    <canvas
      ref={cRef}
      width={size.w}
      height={size.h}
      style={{ background: "white"}}
    />
  );
}
