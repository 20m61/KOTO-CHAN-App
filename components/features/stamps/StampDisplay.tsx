'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { StampData } from '@/types/stamps';
import { useSoundManager } from '@/lib/hooks/useSound';
import { cn } from '@/lib/utils/cn';

interface StampDisplayProps {
  stamp: StampData;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  autoAnimate?: boolean;
  showLabel?: boolean;
}

const sizeClasses = {
  sm: 'w-16 h-16',
  md: 'w-24 h-24',
  lg: 'w-32 h-32',
};

const animations = {
  bounce: {
    animate: { y: [0, -10, 0] },
    transition: { duration: 0.6, repeat: Infinity, repeatDelay: 2 },
  },
  scale: {
    animate: { scale: [1, 1.1, 1] },
    transition: { duration: 0.8, repeat: Infinity, repeatDelay: 3 },
  },
  shake: {
    animate: { x: [0, -5, 5, -5, 5, 0] },
    transition: { duration: 0.5, repeat: Infinity, repeatDelay: 4 },
  },
  rotate: {
    animate: { rotate: [0, 10, -10, 0] },
    transition: { duration: 1, repeat: Infinity, repeatDelay: 5 },
  },
};

export function StampDisplay({
  stamp,
  size = 'md',
  onClick,
  autoAnimate = false,
  showLabel = false,
}: StampDisplayProps) {
  const { playSound } = useSoundManager();

  const handleClick = () => {
    if (stamp.sound) {
      playSound(stamp.sound);
    }
    onClick?.();
  };

  const animationProps =
    autoAnimate && stamp.animation ? animations[stamp.animation] : {};

  return (
    <div className="flex flex-col items-center">
      <motion.div
        className={cn(
          sizeClasses[size],
          'cursor-pointer select-none relative'
        )}
        onClick={handleClick}
        whileTap={{ scale: 0.95 }}
        {...animationProps}
      >
        <Image
          src={stamp.src}
          alt={stamp.name}
          fill
          className="object-contain no-drag"
          sizes={`(max-width: 768px) ${size === 'sm' ? '64px' : size === 'md' ? '96px' : '128px'}`}
          priority={false}
        />
      </motion.div>

      {showLabel && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-2 text-center"
        >
          <span className="text-xs text-kotochan-brown font-rounded">
            {stamp.name}
          </span>
        </motion.div>
      )}
    </div>
  );
}