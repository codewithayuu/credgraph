"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedHexGridProps {
  className?: string;
  rows?: number;
  cols?: number;
}

export const AnimatedHexGrid: React.FC<AnimatedHexGridProps> = ({
  className,
  rows = 6,
  cols = 10,
}) => {
  const hexSize = 40;
  const hexHeight = hexSize * Math.sqrt(3);

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03]", className)}>
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {Array.from({ length: rows }, (_, row) =>
          Array.from({ length: cols }, (_, col) => {
            const x = col * hexSize * 1.5 + (row % 2 ? hexSize * 0.75 : 0);
            const y = row * hexHeight * 0.5;
            const delay = (row + col) * 0.1;

            return (
              <motion.polygon
                key={`${row}-${col}`}
                points={getHexPoints(x + hexSize, y + hexSize * 0.6, hexSize * 0.4)}
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-brand-400"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: [0.3, 0.7, 0.3],
                  scale: [0.95, 1.05, 0.95],
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  delay: delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            );
          })
        )}
      </svg>
    </div>
  );
};

function getHexPoints(cx: number, cy: number, size: number): string {
  const points = [];
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 6;
    points.push(`${cx + size * Math.cos(angle)},${cy + size * Math.sin(angle)}`);
  }
  return points.join(" ");
}
