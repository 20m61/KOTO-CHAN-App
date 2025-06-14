'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils/cn';

export interface SparklesProps {
  count?: number;
  colors?: string[];
  size?: 'small' | 'medium' | 'large';
  speed?: 'slow' | 'normal' | 'fast';
  className?: string;
}

interface Sparkle {
  id: string;
  top: number;
  left: number;
  color: string;
  size: number;
  delay: number;
}

const DEFAULT_COLORS = [
  '#FFE4B5', // kotochan-yellow
  '#FFB6C1', // kotochan-pink
  '#98FB98', // kotochan-mint
  '#87CEEB', // kotochan-blue
  '#FFA500', // kotochan-orange
];

export function Sparkles({
  count = 20,
  colors = DEFAULT_COLORS,
  size = 'medium',
  speed = 'normal',
  className,
}: SparklesProps) {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    // サイズ設定
    const sizeRanges = {
      small: { min: 4, max: 8 },
      medium: { min: 6, max: 12 },
      large: { min: 8, max: 16 },
    };

    // スピード設定
    const speedMultipliers = {
      slow: 3,
      normal: 2,
      fast: 1,
    };

    const generateSparkles = (): Sparkle[] => {
      return Array.from({ length: count }, (_, i) => ({
        id: `sparkle-${i}`,
        top: Math.random() * 100,
        left: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * (sizeRanges[size].max - sizeRanges[size].min) + sizeRanges[size].min,
        delay: Math.random() * speedMultipliers[speed],
      }));
    };

    setSparkles(generateSparkles());
  }, [count, colors, size, speed]);

  return (
    <div className={cn('absolute inset-0 pointer-events-none overflow-hidden', className)}>
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute animate-star-twinkle"
          style={{
            top: `${sparkle.top}%`,
            left: `${sparkle.left}%`,
            color: sparkle.color,
            animationDelay: `${sparkle.delay}s`,
          }}
        >
          <SparkleIcon size={sparkle.size} />
        </div>
      ))}
    </div>
  );
}

function SparkleIcon({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className="drop-shadow-sm"
    >
      <path d="M12 0l3 9h9l-7.5 5.5L19 24l-7-5-7 5 2.5-9.5L0 9h9l3-9z" />
    </svg>
  );
}