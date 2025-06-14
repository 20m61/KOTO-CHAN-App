'use client';

import { cn } from '@/lib/utils/cn';

export interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: 'brown' | 'pink' | 'mint' | 'yellow' | 'blue' | 'white';
  speed?: 'slow' | 'normal' | 'fast';
  className?: string;
}

export function LoadingSpinner({
  size = 'medium',
  color = 'brown',
  speed = 'normal',
  className,
}: LoadingSpinnerProps) {
  // サイズクラス
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-6 h-6',
    large: 'w-8 h-8',
  };

  // カラークラス
  const colorClasses = {
    brown: 'text-kotochan-brown',
    pink: 'text-kotochan-pink',
    mint: 'text-kotochan-mint',
    yellow: 'text-kotochan-yellow',
    blue: 'text-kotochan-blue',
    white: 'text-white',
  };

  // スピードクラス
  const speedClasses = {
    slow: 'animate-spin duration-2000',
    normal: 'animate-spin',
    fast: 'animate-spin duration-500',
  };

  return (
    <div className={cn(
      'inline-block border-2 border-current border-t-transparent rounded-full',
      sizeClasses[size],
      colorClasses[color],
      speedClasses[speed],
      className
    )} />
  );
}

export interface LoadingScreenProps {
  message?: string;
  showSpinner?: boolean;
  className?: string;
}

export function LoadingScreen({
  message = 'よみこみちゅう...',
  showSpinner = true,
  className,
}: LoadingScreenProps) {
  return (
    <div className={cn(
      'flex flex-col items-center justify-center min-h-screen',
      'bg-kotochan-cream text-kotochan-brown',
      className
    )}>
      {showSpinner && (
        <LoadingSpinner size="large" color="brown" className="mb-6" />
      )}
      
      <p className="text-child-lg font-rounded font-bold text-center">
        {message}
      </p>
      
      {/* 装飾的なドット */}
      <div className="flex space-x-2 mt-4">
        <div className="w-2 h-2 bg-kotochan-pink rounded-full animate-bounce" />
        <div className="w-2 h-2 bg-kotochan-yellow rounded-full animate-bounce delay-100" />
        <div className="w-2 h-2 bg-kotochan-mint rounded-full animate-bounce delay-200" />
      </div>
    </div>
  );
}