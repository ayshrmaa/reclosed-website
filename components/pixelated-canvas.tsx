"use client";

import { useEffect, useRef, type JSX } from "react";
import { cn } from "@/lib/utils";

export function PixelatedCanvas({ src, className, cellSize = 4, duration = 0 }: { src: string; className?: string; cellSize?: number; duration?: number }): JSX.Element {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    const offscreen = document.createElement("canvas");
    const smallContext = offscreen.getContext("2d");
    if (!context || !smallContext) return;
    const image = new Image();
    const size = Number.isFinite(cellSize) && cellSize > 0 ? cellSize : 4;
    let disposed = false;
    let frame = 0;

    function draw() {
      if (disposed || !canvas || !context || !smallContext) return;
      cancelAnimationFrame(frame);
      const width = Math.round(canvas.clientWidth);
      const height = Math.round(canvas.clientHeight);
      if (!width || !height) return;
      canvas.width = width;
      canvas.height = height;
      if (!image.complete || !image.naturalWidth) return;
      offscreen.width = Math.max(1, Math.floor(width / size));
      offscreen.height = Math.max(1, Math.floor(height / size));
      smallContext.drawImage(image, 0, 0, offscreen.width, offscreen.height);
      context.imageSmoothingEnabled = false;
      if (!Number.isFinite(duration) || duration <= 0) {
        context.drawImage(offscreen, 0, 0, width, height);
        return;
      }

      // Reveal randomly ordered image cells over the same interval as Notus's canvas.
      const columns = offscreen.width;
      const rows = offscreen.height;
      const cells = Array.from({ length: columns * rows }, (_, index) => index);
      for (let index = cells.length - 1; index > 0; index--) {
        const other = Math.floor(Math.random() * (index + 1));
        [cells[index], cells[other]] = [cells[other], cells[index]];
      }
      const started = performance.now();
      let revealed = 0;
      function reveal(now: number) {
        if (disposed || !context) return;
        const progress = Math.min((now - started) / duration, 1);
        const count = Math.floor(progress * cells.length);
        for (; revealed < count; revealed++) {
          const column = cells[revealed] % columns;
          const row = Math.floor(cells[revealed] / columns);
          const left = Math.floor(column * width / columns);
          const top = Math.floor(row * height / rows);
          const right = Math.floor((column + 1) * width / columns);
          const bottom = Math.floor((row + 1) * height / rows);
          context.drawImage(offscreen, column, row, 1, 1, left, top, right - left, bottom - top);
        }
        if (progress < 1) frame = requestAnimationFrame(reveal);
      }
      frame = requestAnimationFrame(reveal);
    }

    image.onload = draw;
    image.src = src;
    const observer = new ResizeObserver(draw);
    observer.observe(canvas);
    draw();
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      image.onload = null;
      observer.disconnect();
    };
  }, [src, cellSize, duration]);

  return <canvas ref={ref} className={cn("w-full h-full", className)} style={{ imageRendering: "pixelated" }} />;
}
